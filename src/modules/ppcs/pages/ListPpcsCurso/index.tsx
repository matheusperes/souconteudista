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

import { useTitle } from '#shared/hooks/title';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { CreateFilteredPpcModal } from '#modules/ppcs/components/CreatePPC';
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
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
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
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdatePPC, setOpenUpdatePPC] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [ppcs, setPpcs] = useState<Ppc[]>([]);
  const [curso, setCurso] = useState<Curso>();
  const params = useParams();

  const filteredPPCS = useMemo(() => {
    return ppcs.filter((ppc) => {
      return ppc.curso.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [ppcs, search]);

  const getPpcs = useCallback(async () => {
    const response = await api.get('/ppcs', {
      params: { curso_id: params?.curso_id },
    });

    setPpcs(response.data);
  }, [params?.curso_id]);

  useEffect(() => {
    getPpcs();
  }, [getPpcs]);

  const getCurso = useCallback(async () => {
    const response = await api.get(`/curso/${params?.curso_id}`);

    setCurso(response.data);
  }, [params?.curso_id]);

  useEffect(() => {
    getCurso();
  }, [getCurso]);

  useEffect(() => {
    setTitle(curso?.name || '');
  }, [curso?.name, setTitle]);

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
                        borderRadius: '10px',
                        boxShadow: '0px 5px rgba(67, 200, 104, 0.25)',
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
                            onClick={async () => {
                              try {
                                await api.delete(`/ppcs/${ppc.id}`);

                                setPpcs(ppcs.filter((ppcs2) => ppc.id !== ppcs2.id));
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
