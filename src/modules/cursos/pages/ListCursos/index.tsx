import { ArrowForward } from '@mui/icons-material';
import { Box, Grid, Typography, Button, TextField, Breadcrumbs } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { CreateCursoModal } from '#modules/cursos/components/CreateCurso';
import { CursoCard } from '#modules/cursos/components/CursoCard';
import { DeleteCurso } from '#modules/cursos/components/DeleteCurso';
import { UpdateCursoModal } from '#modules/cursos/components/UpdateCurso';

export type ICurso = {
  id: string;
  name: string;
  active: string;
};

const listCores = ['#020560', '#2E86AB', '#A23B72', '#F18F01', '#C73E1D'];

export function ListCursos() {
  const { startLoading, stopLoading } = useLoading();
  const { setTitle } = useTitle();
  const { message } = useToast();

  const [openCreate, setOpenCreate] = useState(false);
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [search, setSearch] = useState('');
  const [openUpdate, setOpenUpdate] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState<string | null>(null);

  useEffect(() => {
    setTitle('Cursos');
  }, [setTitle]);

  const getCursos = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get('/cursos');

      setCursos(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, startLoading, stopLoading]);

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
      {!!openDelete && (
        <DeleteCurso
          open={!!openDelete}
          onClose={() => setOpenDelete(null)}
          curso_id={openDelete}
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
            {filteredCursos.map((curso, index) => (
              <Grid item xs={12} sm={6} md={4} xl={3} key={curso.id}>
                <CursoCard
                  curso={{
                    name: curso.name,
                    cor: listCores[index % listCores.length],
                    id: curso.id,
                    active: curso.active ? 'Curso Ativo' : 'Curso Inativo',
                  }}
                  updateCursoModal={(curso_id) => {
                    setOpenUpdate(curso_id);
                  }}
                  DeleteCurso={(curso_id) => {
                    setOpenDelete(curso_id);
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
