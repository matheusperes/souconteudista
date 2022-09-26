import { ArrowForward } from '@mui/icons-material';
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
import { useTitle } from '#shared/hooks/title';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { CreateAutoresModal } from '#modules/autores/components/CreateAutoresModal';
import { DeleteAutor } from '#modules/autores/components/DeleteAutor';
import { UpdateAutorModal } from '#modules/autores/components/UpdateAutoresModal';

export type IAutores = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  quote: string;
  nationality: string;
};

export function ListAutores() {
  const { setTitle } = useTitle();
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState<any>(null);

  const [autores, setAutores] = useState<IAutores[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTitle('Autores');
  }, [setTitle]);

  const getAutores = useCallback(async () => {
    const response = await api.get('/autores');

    setAutores(response.data);
  }, []);

  useEffect(() => {
    getAutores();
  }, [getAutores]);

  const filteredAutores = useMemo(() => {
    return autores.filter((autor) => {
      return autor.quote.toLowerCase().includes(search.toLowerCase());
    });
  }, [autores, search]);

  const colunas = useMemo<Col<IAutores>[]>(() => {
    return [
      { name: 'Primeiro Nome', propriedadeName: 'first_name' },
      { name: 'Nome do Meio', propriedadeName: 'middle_name' },
      { name: 'Último Nome', propriedadeName: 'last_name' },
      { name: 'Citação', propriedadeName: 'quote' },
      { name: 'Nacionalidade', propriedadeName: 'nationality' },
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
  }, []);

  return (
    <>
      <CreateAutoresModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        updateListAutores={(autor) => setAutores([...autores, autor])}
      />
      {!!openUpdate && (
        <UpdateAutorModal
          open={!!openUpdate}
          onClose={() => setOpenUpdate(null)}
          autor_id={openUpdate}
          reloadList={() => getAutores()}
        />
      )}
      {!!openDelete && (
        <DeleteAutor
          open={!!openDelete}
          onClose={() => setOpenDelete(null)}
          autor_id={openDelete}
          reloadList={() => getAutores()}
        />
      )}
      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Typography>Autores</Typography>
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
                sx={{ color: '#000', fontWeight: 'bold' }}
                onClick={() => navigate('/versoes')}
              >
                Versões de Disciplinas
              </Button>
              <Button onClick={() => navigate('/obras')} sx={{ color: '#000', fontWeight: 'bold' }}>
                Obras
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
                onClick={() => navigate('/autores')}
              >
                Autores
              </Button>
            </Stack>
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
                Adicionar Autor
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
              conteudo={filteredAutores}
              // navegationLine={(id) => navigate(`/disciplinas/${id}`)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
