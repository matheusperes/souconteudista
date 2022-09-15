import { Add, ArrowForward } from '@mui/icons-material';
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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Col, StyledTable } from '#shared/components/StyledTable';
import { useTitle } from '#shared/hooks/title';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { CreateVersaoModal } from '#modules/versoes/components/CreateVersaoModal';
import { UpdateVersaoModal } from '#modules/versoes/components/UpdateVersaoModal';

import { Versoes } from '../FilteredVersao';

export function ListVersoes() {
  const { setTitle } = useTitle();
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdateVersao, setOpenUpdateVersao] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [versoes, setVersoes] = useState<Versoes[]>([]);

  useEffect(() => {
    setTitle('Versões');
  }, [setTitle]);

  const getVersoes = useCallback(async () => {
    const response = await api.get('/versoes');

    setVersoes(response.data);
  }, []);

  useEffect(() => {
    getVersoes();
  }, [getVersoes]);

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
                onClick={async () => {
                  try {
                    await api.delete(`/versoes/${item.id}`);

                    setVersoes(versoes.filter((versao2) => item.id !== versao2.id));
                  } catch {
                    alert('Você está sendo teimoso... Se persistir, será demitido!');
                  }
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
  }, [versoes]);

  return (
    <>
      <CreateVersaoModal
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
      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Typography>Versões</Typography>
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
                sx={{
                  color: '#020560',
                  fontWeight: 'bold',
                  textDecoration: 'underline 2px',
                  textUnderlineOffset: '10px',
                  borderRadius: '50px',
                  '&:hover': { textDecoration: 'underline 2px', background: '#E5E5E5' },
                }}
                onClick={() => navigate('/versoes')}
              >
                Versões de Disciplinas
              </Button>
              <Button onClick={() => navigate('/obras')} sx={{ color: '#000', fontWeight: 'bold' }}>
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
                Adicionar Versão da Disciplina
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
