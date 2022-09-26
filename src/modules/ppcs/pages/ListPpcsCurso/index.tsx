import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { CreateFilteredPpcModal } from '#modules/ppcs/components/CreatePPC';
import { DeletePPC } from '#modules/ppcs/components/DeletePPC';
import { UpdatePpcModal } from '#modules/ppcs/components/UpdatePPC';

export type Curso = {
  id: string;
  name: string;
};

export type Ppc = {
  id: string;
  curso_id: string;
  anoVoto: number;
  dataInicio: string;
  dataFim: string;
  horaCredito: number;
  quantSemestres: number;
  curso: Curso;
  active: boolean;
  ppc_ativo: boolean;
};

const StyledTableContainer = styled(TableContainer)`
  table {
    width: 100%;
    border-spacing: 0 1rem;
    background: #e5e5e5;
    border-collapse: separate;
    min-width: 650px;

    tr {
    }

    th {
      color: #000;
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: center;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      text-align: center;
      background: #fff;
      color: #000;
      cursor: pointer;

      &:first-child {
        border-radius: 10px 0 0 10px;
      }

      &:last-child {
        border-radius: 0 10px 10px 0;
      }
    }
  }
`;

export function PPC() {
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const params = useParams();
  const { message } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdatePPC, setOpenUpdatePPC] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState<any>(null);

  const [search, setSearch] = useState('');
  const [ppcs, setPpcs] = useState<Ppc[]>([]);
  const [curso, setCurso] = useState<Curso>();

  useEffect(() => {
    setTitle(curso?.name || '');
  }, [curso?.name, setTitle]);

  const getPpcs = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get('/ppcs', {
        params: { curso_id: params?.curso_id },
      });
      setPpcs(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params?.curso_id, startLoading, stopLoading]);

  useEffect(() => {
    getPpcs();
  }, [getPpcs]);

  const getCurso = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get(`/curso/${params?.curso_id}`);

      setCurso(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params?.curso_id, startLoading, stopLoading]);

  useEffect(() => {
    getCurso();
  }, [getCurso]);

  const filteredPPCS = useMemo(() => {
    return ppcs.filter((ppc) => {
      return ppc.curso.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [ppcs, search]);

  return (
    <>
      <CreateFilteredPpcModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        updateListPpcs={(ppc) => setPpcs([...ppcs, ppc])}
      />
      {!!openUpdatePPC && (
        <UpdatePpcModal
          open={!!openUpdatePPC}
          onClose={() => setOpenUpdatePPC(null)}
          ppc_id={openUpdatePPC}
          reloadList={() => getPpcs()}
        />
      )}
      {!!openDelete && (
        <DeletePPC
          open={!!openDelete}
          onClose={() => setOpenDelete(null)}
          ppc_id={openDelete}
          reloadList={() => getPpcs()}
        />
      )}
      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Link to="/cursos">Cursos</Link>
              <Typography>{curso?.name}</Typography>
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

          <Box sx={{ marginTop: '1rem' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Lista de PPCs</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ mt: '1rem' }}>
              <Box>
                <Button
                  variant="contained"
                  sx={{ background: '#020560', '&:hover': { background: '#020560' } }}
                  // endIcon={<AddIcon />}
                  onClick={() => {
                    setOpenCreate(true);
                  }}
                >
                  Criar PPC
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    borderRadius: '50%',
                    background: '#8CC59A',
                    width: '15px',
                    height: '15px',
                    marginRight: '3px',
                  }}
                />
                <Typography>Atual</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '1.25rem' }}>
                <Box
                  sx={{
                    borderRadius: '50%',
                    background: '#FFF174',
                    width: '15px',
                    height: '15px',
                    marginRight: '3px',
                  }}
                />
                <Typography>Ativo</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '1.25rem' }}>
                <Box
                  sx={{
                    borderRadius: '50%',
                    background: '#E05959',
                    width: '15px',
                    height: '15px',
                    marginRight: '3px',
                  }}
                />
                <Typography>Inativo</Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <StyledTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Curso</TableCell>
                    <TableCell align="center">Ano Voto</TableCell>
                    <TableCell align="center">data Inicio</TableCell>
                    <TableCell align="center">Data Fim</TableCell>
                    <TableCell align="center">Horas/Creditos</TableCell>
                    <TableCell align="center">Quantidade de Semestres</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredPPCS.map((ppc) => (
                    <TableRow
                      key={ppc.id}
                      sx={{
                        ...(ppc.ppc_ativo && {
                          borderRadius: '10px',
                          boxShadow: '0px 5px rgba(237, 229, 41, 0.25)',
                        }),
                        ...(ppc.ppc_ativo === false && {
                          borderRadius: '10px',
                          boxShadow: '0px 5px rgba(216, 68, 68, 0.25)',
                        }),
                        ...(ppc.active &&
                          ppc.ppc_ativo && {
                            borderRadius: '10px',
                            boxShadow: '0px 5px rgba(67, 200, 104, 0.25)',
                          }),
                      }}
                      onClick={() => navigate(`/cursos/${ppc.curso.id}/ppcs/${ppc.id}`)}
                    >
                      <TableCell>{ppc.curso.name}</TableCell>
                      <TableCell align="center">{ppc.anoVoto}</TableCell>
                      <TableCell align="center">{ppc.dataInicio}</TableCell>
                      <TableCell align="center">{ppc.dataFim}</TableCell>
                      <TableCell align="center">{ppc.horaCredito}</TableCell>
                      <TableCell align="center">{ppc.quantSemestres}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                          <IconButton
                            color="primary"
                            onClick={async (e) => {
                              e.stopPropagation();

                              setOpenDelete(ppc.id);
                            }}
                          >
                            <img src={Delete} alt="Delete" />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={async (e) => {
                              e.stopPropagation();

                              setOpenUpdatePPC(ppc.id);
                            }}
                          >
                            <img src={Edit} alt="Edit" />
                          </IconButton>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}
