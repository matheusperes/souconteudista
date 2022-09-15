import { ArrowForward, ArrowDropDown, ArrowRight } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Typography,
  Divider,
  ButtonGroup,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useTitle } from '#shared/hooks/title';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { Area } from '#modules/areas/pages/FilteredDisciplinas';
import { UpdateVersaoModal } from '#modules/versoes/components/UpdateVersaoModal';

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

const StyledTableContainer = styled(TableContainer)`
  table {
    width: 100%;
    border-spacing: 0 0.1rem;
    background: #e5e5e5;
    border-collapse: separate;
    min-width: 650px;

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

      &:first-child {
        border-radius: 10px 0 0 0px;
      }

      &:last-child {
        border-radius: 0 10px 0px 0;
      }
    }
  }
`;

export function FilteredVersao() {
  const { setTitle } = useTitle();
  const params = useParams();

  const [versaoCollapse, setVersaoCollapse] = useState(true);
  const [ementaCollapse, setEmentaCollapse] = useState(false);
  const [bibliografiaCollapse, setBibliografiaCollapse] = useState(false);
  const [ppcsCollapse, setPpcsCollapse] = useState(false);

  const [openUpdateVersao, setOpenUpdateVersao] = useState(false);
  const [versao, setVersao] = useState<Versoes>();
  const [disciplina, setDisciplina] = useState<Disciplinas>();

  useEffect(() => {
    setTitle(`Versão`);
  }, [setTitle]);

  const getVersao = useCallback(async () => {
    const response = await api.get(`versao/${params?.id}`);

    setVersao(response.data);
  }, [params?.id]);

  useEffect(() => {
    getVersao();
  }, [getVersao]);

  const getDisciplina = useCallback(async () => {
    const response = await api.get(`/disciplina/${params.disciplina_id}`);

    setDisciplina(response.data);
  }, [params.disciplina_id]);

  useEffect(() => {
    getDisciplina();
  }, [getDisciplina]);

  return (
    <>
      {openUpdateVersao && (
        <UpdateVersaoModal
          open={openUpdateVersao}
          onClose={() => setOpenUpdateVersao(false)}
          versao_id={params.id || ''}
          reloadList={() => getVersao()}
        />
      )}
      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Link to="/disciplinas">Disciplinas</Link>
              <Link to={`/disciplinas/${disciplina?.id}`}>{disciplina?.name}</Link>
              <Typography>{versao?.disciplina_versao_nome}</Typography>
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
          <Box sx={{ marginTop: '1rem' }}>
            <StyledTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sigla</TableCell>
                    <TableCell align="center">Disciplina</TableCell>
                    <TableCell align="center">Código</TableCell>
                    <TableCell align="center">Creditos</TableCell>
                    <TableCell align="center">Oferta</TableCell>
                    <TableCell align="center">Produzido</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    <TableRow
                      key={versao?.id}
                      onClick={() => {
                        setVersaoCollapse(versaoCollapse);
                      }}
                    >
                      <TableCell>{versao?.disciplina_versao_nome}</TableCell>
                      <TableCell align="center">{versao?.disciplina.name}</TableCell>
                      <TableCell align="center">{versao?.codigo}</TableCell>
                      <TableCell align="center">{versao?.credito_quantidade}</TableCell>
                      <TableCell align="center">{versao?.em_oferta ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">{versao?.produzido ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                          <IconButton
                            color="primary"
                            onClick={async () => {
                              try {
                                await api.delete(`/versoes/${versao?.id}`);
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

                              setOpenUpdateVersao(true);
                            }}
                          >
                            <img src={Edit} alt="Edit" />
                          </IconButton>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{ paddingBottom: 0, paddingTop: 0, borderRadius: '0px !important' }}
                      >
                        <Collapse in={versaoCollapse}>
                          <Box sx={{ margin: '1rem' }}>
                            {/* Ementa Collapse */}
                            <Box
                              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                              onClick={() => {
                                setEmentaCollapse(!ementaCollapse);
                              }}
                            >
                              {ementaCollapse ? (
                                <ArrowDropDown sx={{ color: '#7678D7' }} />
                              ) : (
                                <ArrowRight sx={{ color: '#7678D7' }} />
                              )}
                              <Typography sx={{ fontWeight: 'bold' }}>Ementa</Typography>
                            </Box>
                            <Collapse in={ementaCollapse}>
                              <Box sx={{ padding: '1rem' }}>
                                <Box>
                                  <Typography whiteSpace="pre-wrap">{versao?.ementa}</Typography>
                                </Box>
                              </Box>
                            </Collapse>
                            {/* Bibliografias Collapse */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                marginTop: '1rem',
                              }}
                              onClick={() => {
                                setBibliografiaCollapse(!bibliografiaCollapse);
                              }}
                            >
                              {bibliografiaCollapse ? (
                                <ArrowDropDown sx={{ color: '#7678D7' }} />
                              ) : (
                                <ArrowRight sx={{ color: '#7678D7' }} />
                              )}
                              <Typography sx={{ fontWeight: 'bold' }}>Bibliografias</Typography>
                            </Box>
                            <Collapse in={bibliografiaCollapse}>
                              <Box sx={{ padding: '1rem' }}>
                                <Box>
                                  <Typography whiteSpace="pre-wrap">
                                    Alguma coisa deve aparecer aqui
                                  </Typography>
                                </Box>
                              </Box>
                            </Collapse>
                            {/* PPCs Collapse */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                marginTop: '1rem',
                              }}
                              onClick={() => {
                                setPpcsCollapse(!ppcsCollapse);
                              }}
                            >
                              {ppcsCollapse ? (
                                <ArrowDropDown sx={{ color: '#7678D7' }} />
                              ) : (
                                <ArrowRight sx={{ color: '#7678D7' }} />
                              )}
                              <Typography sx={{ fontWeight: 'bold' }}>PPCs</Typography>
                            </Box>
                            <Collapse in={ppcsCollapse}>
                              <Box sx={{ padding: '1rem' }}>
                                <Box>
                                  <Typography whiteSpace="pre-wrap">
                                    Alguma coisa deve aparecer aqui tambem
                                  </Typography>
                                </Box>
                              </Box>
                            </Collapse>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}
