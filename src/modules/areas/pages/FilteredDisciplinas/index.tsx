import { ArrowForward } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
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
import { Link, useParams } from 'react-router-dom';

import { Col, StyledTable } from '#shared/components/StyledTable';
import { useTitle } from '#shared/hooks/title';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { CreateFilteredDisciplinaModal } from '#modules/disciplinas/components/CreateDisciplinaFiltered';
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
  const params = useParams();

  const [disciplinas, setDisciplinas] = useState<IDisciplinas[]>([]);
  const [area, setArea] = useState<Area>();
  const [search, setSearch] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdateDisciplina, setOpenUpdateDisciplina] = useState<string | null>(null);

  const getDisciplinas = useCallback(async () => {
    const response = await api.get('/disciplinas', {
      params: { area_id: params?.id },
    });

    setDisciplinas(response.data);
  }, [params?.id]);

  useEffect(() => {
    getDisciplinas();
  }, [getDisciplinas]);

  const getArea = useCallback(async () => {
    const response = await api.get(`/area/${params?.id}`);

    setArea(response.data);
  }, [params?.id]);

  useEffect(() => {
    getArea();
  }, [getArea]);

  useEffect(() => {
    setTitle(`Área`);
  }, [setTitle]);

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
                  try {
                    await api.delete(`/disciplinas/${item.id}`);

                    setDisciplinas(
                      disciplinas.filter((disciplinas2) => item.id !== disciplinas2.id),
                    );
                  } catch {
                    alert('Você não pode excluir uma disciplina com versões cadastradas');
                  }
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
  }, [disciplinas]);

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
                variant="text"
                endIcon={<AddIcon />}
                sx={{ color: '#000' }}
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
            <StyledTable colunas={colunas} conteudo={filtereDisciplinas} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
