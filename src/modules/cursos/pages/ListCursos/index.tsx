import { ArrowForward } from '@mui/icons-material';
import { Box, Grid, Typography, Button, TextField, Breadcrumbs } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useTitle } from '#shared/hooks/title';
import { api } from '#shared/services/axios';

import { CreateCursoModal } from '#modules/cursos/components/CreateCurso';
import { CursoCard } from '#modules/cursos/components/CursoCard';
import { UpdateCursoModal } from '#modules/cursos/components/UpdateCurso';

export type ICurso = {
  id: string;
  name: string;
  active: string;
};

export function ListCursos() {
  const { setTitle } = useTitle();
  const [openCreate, setOpenCreate] = useState(false);
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [search, setSearch] = useState('');
  const [openUpdate, setOpenUpdate] = useState<string | null>(null);

  useEffect(() => {
    setTitle('Cursos');
  }, [setTitle]);

  const getCursos = useCallback(async () => {
    const response = await api.get('/cursos');

    setCursos(response.data);
  }, []);

  useEffect(() => {
    getCursos();
  }, [getCursos]);

  const filteredCursos = useMemo(() => {
    return cursos.filter((curso) => {
      return curso.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [cursos, search]);

  return (
    <>
      <CreateCursoModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        updateListCursos={(curso) => setCursos([...cursos, curso])}
      />

      {!!openUpdate && (
        <UpdateCursoModal
          open={!!openUpdate}
          onClose={() => setOpenUpdate(null)}
          curso_id={openUpdate}
          reloadList={() => getCursos()}
        />
      )}

      <Box className="Pagina">
        <Box className="Pesquisa-card" sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Typography>Cursos</Typography>
            </Breadcrumbs>
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

          <Box sx={{ mb: '1rem' }}>
            <Button
              variant="contained"
              sx={{ background: '#020560', '&:hover': { background: '#020560' } }}
              // endIcon={<AddIcon />}
              onClick={() => {
                setOpenCreate(true);
              }}
            >
              Adicionar
            </Button>
          </Box>
          <Grid container spacing={4}>
            {filteredCursos.map((curso) => (
              <Grid item xs={12} sm={6} md={4} xl={3} key={curso.id}>
                <CursoCard
                  curso={{
                    name: curso.name,
                    cor: '#020560',
                    id: curso.id,
                    active: curso.active ? 'Curso Ativo' : 'Curso Inativo',
                  }}
                  reloadList={() => {
                    setCursos(cursos.filter((curso2) => curso.id !== curso2.id));
                  }}
                  updateCursoModal={(curso_id) => {
                    setOpenUpdate(curso_id);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
