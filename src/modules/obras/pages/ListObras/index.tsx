import { ArrowForward, Add } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Typography,
  Stack,
  Button,
  TextField,
  ButtonGroup,
  IconButton,
} from '@mui/material';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Col, StyledTable } from '#shared/components/StyledTable';
import { useInstitution } from '#shared/hooks/institution';
import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { CreateObraAutorModal } from '#modules/obras/components/CreateObraAutorModal';
import { CreateObrasModal } from '#modules/obras/components/CreateObrasModal';
import { UpdateObraModal } from '#modules/obras/components/UpdateObraModal';

export type IObras = {
  id: string;
  item_tipo: string;
  obra_nome: string;
  serie_nome: string;
  colecao_nome: string;
  cidade: string;
  editora: string;
  dia: string;
  mes: string;
  ano: number;
  volume: string;
  edicao: string;
  resumo: string;
  periodico_nome: string;
  periodico_abreviacao: string;
  numero: string;
  paginas: string;
  idioma: string;
  doi: string;
  isbn: string;
  issn: string | null;
  url: string;
  acesso_em: string;
};

export type IObrasAutor = {
  autor_id: string;
  obra_id: string;
  funcao: string;
};

export function ListObras() {
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const { instituicao } = useInstitution();
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();

  const [openCreate, setOpenCreate] = useState(false);
  const [openCreateObraAutor, setOpenCreateObraAutor] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<string | null>(null);

  const [obras, setObras] = useState<IObras[]>([]);
  const [obrasAutor, setObrasAutor] = useState<IObrasAutor[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTitle('Obras');
  }, [setTitle]);

  const getObras = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get('/obras', {
        params: { instituicao_id: instituicao?.id },
      });
      setObras(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [instituicao?.id, message, startLoading, stopLoading]);

  useEffect(() => {
    getObras();
  }, [getObras]);

  const getObrasAutores = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get('/obra_autor');
      setObrasAutor(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, startLoading, stopLoading]);

  useEffect(() => {
    getObrasAutores();
  }, [getObrasAutores]);

  const filteredObras = useMemo(() => {
    return obras.filter((obra) => {
      return obra.obra_nome.toLowerCase().includes(search.toLowerCase());
    });
  }, [obras, search]);

  const colunas = useMemo<Col<IObras>[]>(() => {
    return [
      { name: 'Obra', propriedadeName: 'obra_nome' },
      { name: 'Tipo', propriedadeName: 'item_tipo' },
      { name: 'Ano', propriedadeName: 'ano' },
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
                    await api.delete(`/obras/${item.id}`);

                    setObras(obras.filter((obra2) => item.id !== obra2.id));
                  } catch {
                    alert('Você não pode excluir essa obra');
                  }
                }}
              >
                <img src={Delete} alt="Delete" />
              </IconButton>
              <IconButton
                color="primary"
                onClick={async (e) => {
                  e.stopPropagation();

                  setOpenUpdate(item.id);
                }}
              >
                <img src={Edit} alt="Edit" />
              </IconButton>
            </ButtonGroup>
          );
        },
      },
    ];
  }, [obras]);

  return (
    <>
      <CreateObrasModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        updateListObras={(obra) => setObras([...obras, obra])}
      />

      <CreateObraAutorModal
        open={openCreateObraAutor}
        onClose={() => setOpenCreateObraAutor(false)}
        updateListObrasAutor={(obraAutor) => setObrasAutor([...obrasAutor, obraAutor])}
      />

      {!!openUpdate && (
        <UpdateObraModal
          open={!!openUpdate}
          onClose={() => setOpenUpdate(null)}
          obra_id={openUpdate}
          reloadList={() => getObras()}
        />
      )}
      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Typography>Obras</Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              marginTop: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Stack direction="row" spacing={8}>
              <Button
                sx={{ color: '#000', fontWeight: 'bold' }}
                onClick={() => navigate('/instituicoes')}
              >
                Instituições
              </Button>
              <Button sx={{ color: '#000', fontWeight: 'bold' }} onClick={() => navigate('/areas')}>
                Áreas do Conhecimento
              </Button>
              <Button
                sx={{ color: '#000', fontWeight: 'bold' }}
                onClick={() => navigate('/disciplinas')}
              >
                Disciplinas
              </Button>
              <Button
                sx={{ color: '#000', fontWeight: 'bold' }}
                onClick={() => navigate('/versoes')}
              >
                Versões de Disciplinas
              </Button>
              <Button
                onClick={() => navigate('/obras')}
                sx={{
                  color: '#020560',
                  fontWeight: 'bold',
                  textDecoration: 'underline 2px',
                  textUnderlineOffset: '10px',
                  borderRadius: '50px',
                  '&:hover': { textDecoration: 'underline 2px', background: '#E5E5E5' },
                }}
              >
                Obras
              </Button>
              <Button
                sx={{ color: '#000', fontWeight: 'bold' }}
                onClick={() => navigate('/autores')}
              >
                Autores
              </Button>
            </Stack>
          </Box>
          <Box sx={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button
                variant="text"
                endIcon={<Add />}
                sx={{ color: '#000' }}
                onClick={() => {
                  setOpenCreate(true);
                }}
              >
                Adicionar Obra
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
              conteudo={filteredObras}
              // navegationLine={(id) => navigate(`/disciplinas/${id}`)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
