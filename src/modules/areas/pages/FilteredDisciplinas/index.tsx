import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Col, StyledTable } from '#shared/components/StyledTable';
import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { CreateFilteredDisciplinaModal } from '#modules/disciplinas/components/CreateDisciplinaFiltered';
import { DeleteDisciplina } from '#modules/disciplinas/components/DeleteDisciplina';
import { UpdateDisciplinaModal } from '#modules/disciplinas/components/UpdateDisciplina';

export type Area = {
  id: string;
  name: string;
  description: string;
};

export type IDisciplinas = {
  id: string;
  name: string;
  area: Area;
  sigla: string;
  area_id: string;
};

export function FilteredDisciplinas() {
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const params = useParams();
  const { message } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const [disciplinas, setDisciplinas] = useState<IDisciplinas[]>([]);
  const [area, setArea] = useState<Area>();
  const [search, setSearch] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdateDisciplina, setOpenUpdateDisciplina] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState<any>(null);

  useEffect(() => {
    setTitle(`Área`);
  }, [setTitle]);

  const getDisciplinas = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get('/disciplinas', {
        params: { area_id: params?.id },
      });
      setDisciplinas(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params?.id, startLoading, stopLoading]);

  useEffect(() => {
    getDisciplinas();
  }, [getDisciplinas]);

  const getArea = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get(`/area/${params?.id}`);
      setArea(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params?.id, startLoading, stopLoading]);

  useEffect(() => {
    getArea();
  }, [getArea]);

  const colunas = useMemo<Col<IDisciplinas>[]>(() => {
    return [
      { name: 'Disciplina', propriedadeName: 'name' },
      { name: 'Sigla', propriedadeName: 'sigla' },
      { name: 'Área', personalizarCol: (item) => item.area.name },
      {
        name: 'Ações',
        personalizarCol: (item) => {
          return (
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              <IconButton
                color="primary"
                onClick={async (e) => {
                  e.stopPropagation();

                  setOpenDelete(item.id);
                }}
              >
                <img src={Delete} alt="Delete" />
              </IconButton>
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();

                  setOpenUpdateDisciplina(item.id);
                }}
              >
                <img src={Edit} alt="Edit" />
              </IconButton>
            </ButtonGroup>
          );
        },
      },
    ];
  }, []);

  const filtereDisciplinas = useMemo(() => {
    return disciplinas.filter((disciplina) => {
      return disciplina.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [disciplinas, search]);

  return (
    <>
      <CreateFilteredDisciplinaModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        updateListDisciplinas={(disciplina2) => setDisciplinas([...disciplinas, disciplina2])}
      />
      {!!openUpdateDisciplina && (
        <UpdateDisciplinaModal
          open={!!openUpdateDisciplina}
          onClose={() => setOpenUpdateDisciplina(null)}
          disciplina_id={openUpdateDisciplina}
          reloadList={() => getDisciplinas()}
        />
      )}

      {!!openDelete && (
        <DeleteDisciplina
          open={!!openDelete}
          onClose={() => setOpenDelete(null)}
          disciplina_id={openDelete}
          reloadList={() => getDisciplinas()}
        />
      )}
      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Link to="/areas">Áreas</Link>
              <Typography>{area?.name}</Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{area?.name}</Typography>
          </Box>
          <Box sx={{ marginTop: '0.35rem' }}>
            <Typography>Descrição: {area?.description}</Typography>
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <Divider />
          </Box>
          <Box sx={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button
                variant="contained"
                sx={{ background: '#020560', '&:hover': { background: '#020560' } }}
                onClick={() => {
                  setOpenCreate(true);
                }}
              >
                Criar Disciplina
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <TextField
                sx={{ width: '166px' }}
                id="outlined-search"
                placeholder="Pesquisar"
                type="search"
                variant="outlined"
                size="small"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <StyledTable
              colunas={colunas}
              conteudo={filtereDisciplinas}
              navegationLine={(item) => navigate(`/disciplinas/${item.id}`)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
