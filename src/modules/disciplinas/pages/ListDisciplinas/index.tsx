import { ArrowForward } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
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

import { IDisciplinas } from '#modules/areas/pages/FilteredDisciplinas';
import { CreateDisciplinaModal } from '#modules/disciplinas/components/CreateDisciplina';
import { UpdateDisciplinaModal } from '#modules/disciplinas/components/UpdateDisciplina';

export type AreaOption = {
  id: string;
  label: string;
};

export function ListDisciplinas() {
  const { setTitle } = useTitle();
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<string | null>(null);
  const [disciplinas, setDisciplinas] = useState<IDisciplinas[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTitle('Disciplinas');
  }, [setTitle]);

  const getDisciplinas = useCallback(async () => {
    const response = await api.get('/disciplinas');

    setDisciplinas(response.data);
  }, []);

  useEffect(() => {
    getDisciplinas();
  }, [getDisciplinas]);

  const filteredDisciplinas = useMemo(() => {
    return disciplinas.filter((disciplina) => {
      return disciplina.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [disciplinas, search]);

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
  }, [disciplinas]);

  return (
    <>
      <CreateDisciplinaModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        updateListDisciplinas={(disciplina) => setDisciplinas([...disciplinas, disciplina])}
      />

      {!!openUpdate && (
        <UpdateDisciplinaModal
          open={!!openUpdate}
          onClose={() => setOpenUpdate(null)}
          disciplina_id={openUpdate}
          reloadList={() => getDisciplinas()}
        />
      )}
      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Typography>Disciplinas</Typography>
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
                sx={{
                  color: '#020560',
                  fontWeight: 'bold',
                  textDecoration: 'underline 2px',
                  textUnderlineOffset: '10px',
                  borderRadius: '50px',
                  '&:hover': { textDecoration: 'underline 2px', background: '#E5E5E5' },
                }}
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
                endIcon={<AddIcon />}
                sx={{ color: '#000' }}
                onClick={() => {
                  setOpenCreate(true);
                }}
              >
                Adicionar Disciplina
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
              conteudo={filteredDisciplinas}
              navegationLine={(item) => navigate(`/disciplinas/${item.id}`)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
