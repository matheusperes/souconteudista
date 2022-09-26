import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Typography,
  Divider,
  Button,
  TextField,
  ButtonGroup,
  IconButton,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { Col, StyledTable } from '#shared/components/StyledTable';
import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { CreateFilteredVersaoModal } from '#modules/versoes/components/CraeteFilteredVersaoModal';
import { DeleteVersão } from '#modules/versoes/components/DeleteVersao';
import { UpdateVersaoModal } from '#modules/versoes/components/UpdateVersaoModal';

type Area = {
  id: string;
  name: string;
  description: string;
};

type Disciplinas = {
  id: string;
  name: string;
  area_id: string;
  sigla: string;
  area: Area;
};

export type Versoes = {
  id: string;
  disciplina_id: string;
  disciplina_versao_nome: string;
  codigo: string;
  credito_quantidade: number;
  ementa: string;
  observacao: string;
  em_oferta: number;
  produzido: number;
  disciplina: Disciplinas;
};

export function FilteredVersoes() {
  const { setTitle } = useTitle();
  const params = useParams();
  const navigate = useNavigate();
  const { message } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const [openUpdateVersao, setOpenUpdateVersao] = useState<string | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState<any>(null);

  const [versoes, setVersoes] = useState<Versoes[]>([]);
  const [search, setSearch] = useState('');
  const [disciplina, setDisciplina] = useState<Disciplinas>();

  useEffect(() => {
    setTitle(`Versões`);
  }, [setTitle]);

  const getVersoes = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get('/versoes', {
        params: { disciplina_id: params?.id },
      });
      setVersoes(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params?.id, startLoading, stopLoading]);

  useEffect(() => {
    getVersoes();
  }, [getVersoes]);

  const getDisciplina = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get(`/disciplina/${params?.id}`);
      setDisciplina(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params?.id, startLoading, stopLoading]);

  useEffect(() => {
    getDisciplina();
  }, [getDisciplina]);

  const filteredVersoes = useMemo(() => {
    return versoes.filter((versao) => {
      return versao.disciplina_versao_nome.toLowerCase().includes(search.toLowerCase());
    });
  }, [versoes, search]);

  const colunas = useMemo<Col<Versoes>[]>(() => {
    return [
      { name: 'Sigla', propriedadeName: 'disciplina_versao_nome' },
      { name: 'Disciplina', personalizarCol: (item) => item.disciplina.name },
      { name: 'Código', propriedadeName: 'codigo' },
      { name: 'Creditos', propriedadeName: 'credito_quantidade' },
      { name: 'Oferta', personalizarCol: (item) => (item.em_oferta ? 'Sim' : 'Não') },
      { name: 'Produzido', personalizarCol: (item) => (item.produzido ? 'Sim' : 'Não') },
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
                onClick={async (e) => {
                  e.stopPropagation();

                  setOpenUpdateVersao(item.id);
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

  return (
    <>
      <CreateFilteredVersaoModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        updateListVersoes={(versao2) => setVersoes([...versoes, versao2])}
      />
      {!!openUpdateVersao && (
        <UpdateVersaoModal
          open={!!openUpdateVersao}
          onClose={() => setOpenUpdateVersao(null)}
          versao_id={openUpdateVersao}
          reloadList={() => getVersoes()}
        />
      )}
      {!!openDelete && (
        <DeleteVersão
          open={!!openDelete}
          onClose={() => setOpenDelete(null)}
          versao_id={openDelete}
          reloadList={() => getVersoes()}
        />
      )}

      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Link to="/disciplinas">Disciplinas</Link>
              <Typography>{disciplina?.name}</Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              {disciplina?.name}
            </Typography>
          </Box>
          <Box sx={{ marginTop: '0.35rem', color: 'rgba(60, 62, 131, 0.56)' }}>
            <Typography>Sigla: {disciplina?.sigla}</Typography>
          </Box>
          <Box sx={{ marginTop: '0.35rem', color: 'rgba(60, 62, 131, 0.56)' }}>
            <Typography>Área: {disciplina?.area.name}</Typography>
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
                Adicionar Versão
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
              conteudo={filteredVersoes}
              navegationLine={(item) =>
                navigate(`/disciplinas/${item.disciplina_id}/versao/${item.id}`)
              }
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
