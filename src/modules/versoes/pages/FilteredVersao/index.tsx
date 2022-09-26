import { ArrowForward, ArrowDropDown, ArrowRight, Close } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Typography,
  Divider,
  // ButtonGroup,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Icon,
  Grid,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
// import Delete from '#shared/images/Delete.svg';
// import Edit from '#shared/images/Edit.svg';
import image10 from '#shared/images/image10.svg';
import { api } from '#shared/services/axios';

import { Area } from '#modules/areas/pages/FilteredDisciplinas';
// import { DeleteEspecificVersão } from '#modules/versoes/components/DeleteEspecificVersao';
// import { UpdateVersaoModal } from '#modules/versoes/components/UpdateVersaoModal';

// import { DeleteVersão } from '../../components/DeleteVersao';

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
  em_oferta: boolean;
  produzido: boolean;
  ementa: string;
  observacao: string;
  disciplina: Disciplinas;
};

type DisciplinaOption = {
  id: string;
  label: string;
};

type VersaoOption = {
  id: string;
  label: number;
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
      text-align: center;
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
  const { message } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const [versaoCollapse, setVersaoCollapse] = useState(true);

  const [ementaCollapse, setEmentaCollapse] = useState(false);
  const [ementaCollapse2, setEmentaCollapse2] = useState(false);

  const [bibliografiaCollapse, setBibliografiaCollapse] = useState(false);
  const [bibliografiaCollapse2, setBibliografiaCollapse2] = useState(false);

  const [ppcsCollapse, setPpcsCollapse] = useState(false);
  const [ppcsCollapse2, setPpcsCollapse2] = useState(false);

  // const [openUpdateVersao, setOpenUpdateVersao] = useState(false);
  // const [openUpdateVersao2, setOpenUpdateVersao2] = useState(false);

  // const [openDelete, setOpenDelete] = useState<any>(null);
  // const [openDelete2, setOpenDelete2] = useState<any>(null);

  const [versao, setVersao] = useState<Versoes>();

  const [disciplina, setDisciplina] = useState<Disciplinas>();

  const [comparadorCollapse, setComparadorCollapse] = useState(false);

  const [disciplinas, setDisciplinas] = useState<Disciplinas[]>([]);
  const [DisciplinasId, setDisciplinasId] = useState<DisciplinaOption | null>(null);
  const [versoes, setVersoes] = useState<Versoes[]>([]);
  const [versoesId, setVersoesId] = useState<VersaoOption | null>(null);
  const [versaoRender, setVersaoRender] = useState<Versoes | null>(null);
  const [versaoRenderDisciplina, setVersaoRenderDisciplina] = useState<Disciplinas | null>(null);

  useEffect(() => {
    setTitle(`Versão`);
  }, [setTitle]);

  const getVersao = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get(`versao/${params?.id}`);
      setVersao(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params?.id, startLoading, stopLoading]);

  useEffect(() => {
    getVersao();
  }, [getVersao]);

  const getVersoes = useCallback(async () => {
    if (DisciplinasId !== null) {
      startLoading();
      try {
        const response = await api.get('/versoes', {
          params: { disciplina_id: DisciplinasId.id },
        });
        setVersoes(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }
  }, [DisciplinasId, message, startLoading, stopLoading]);

  useEffect(() => {
    getVersoes();
  }, [getVersoes]);

  const getDisciplina = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get(`/disciplina/${params.disciplina_id}`);
      setDisciplina(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params.disciplina_id, startLoading, stopLoading]);

  useEffect(() => {
    getDisciplina();
  }, [getDisciplina]);

  const getDisciplinas = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get('/disciplinas');
      setDisciplinas(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, startLoading, stopLoading]);

  useEffect(() => {
    getDisciplinas();
  }, [getDisciplinas]);

  const DisciplinaOption1 = useMemo(() => {
    return disciplinas.map((disciplina1) => {
      return {
        id: disciplina1.id,
        label: disciplina1.name,
      };
    });
  }, [disciplinas]);

  const VersaoOption1 = useMemo(() => {
    return versoes.map((versao1) => {
      return {
        id: versao1.id,
        label: versao1.credito_quantidade,
      };
    });
  }, [versoes]);

  const handleSelectVersao = useCallback(async (newVersaoId?: string) => {
    if (newVersaoId) {
      const response = await api.get(`/versao/${newVersaoId}`);

      setVersaoRender(response.data);
    } else {
      setVersaoRender(null);
    }
  }, []);

  const handleSelectDisciplina = useCallback(async (newVersaoId?: string) => {
    if (newVersaoId) {
      const response = await api.get(`/disciplina/${newVersaoId}`);

      setVersaoRenderDisciplina(response.data);
    } else {
      setVersaoRenderDisciplina(null);
    }
  }, []);

  return (
    <>
      {/* {openUpdateVersao && (
        <UpdateVersaoModal
          open={openUpdateVersao}
          onClose={() => setOpenUpdateVersao(false)}
          versao_id={params.id || ''}
          reloadList={() => getVersao()}
        />
      )}
      {openUpdateVersao2 && (
        <UpdateVersaoModal
          open={openUpdateVersao2}
          onClose={() => setOpenUpdateVersao2(false)}
          versao_id={versaoRender?.id || ''}
          reloadList={() => handleSelectVersao(versaoRender?.id)}
        />
      )}
      {openDelete && (
        <DeleteEspecificVersão
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          versao_id={params.id || ''}
        />
      )}
      {openDelete2 && (
        <DeleteVersão
          open={openDelete2}
          onClose={() => setOpenDelete(false)}
          versao_id={versaoRender?.id || ''}
          reloadList={() => handleSelectVersao('versaoRender?.id')}
        />
      )} */}
      <Box className="Pagina" sx={{ display: 'flex' }}>
        <Box
          sx={(theme) => ({
            mt: '1rem',
            padding: '1.5rem',
            width: comparadorCollapse ? `calc(100% - 40vw)` : '100%',
            transition: theme.transitions.create(['width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          })}
        >
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Link to="/disciplinas">Disciplinas</Link>
              {disciplina && <Link to={`/disciplinas/${disciplina?.id}`}>{disciplina?.name}</Link>}
              {disciplina && <Typography>{versao?.disciplina_versao_nome}</Typography>}
            </Breadcrumbs>
          </Box>
          {versao && (
            <>
              <Box sx={{ marginTop: '1rem' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                  {disciplina?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: '0.35rem',
                  color: 'rgba(60, 62, 131, 0.56)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>Sigla: {disciplina?.sigla}</Typography>
                <Icon
                  sx={{ height: '33px', cursor: 'pointer' }}
                  onClick={() => {
                    setComparadorCollapse(!comparadorCollapse);
                  }}
                >
                  <img src={image10} alt="comparador" />
                </Icon>
              </Box>
              <Box sx={{ marginTop: '0.35rem', color: 'rgba(60, 62, 131, 0.56)' }}>
                <Typography>Área: {disciplina?.area.name}</Typography>
              </Box>
              <Box sx={{ marginTop: '1rem' }}>
                <Divider />
              </Box>
              <Box sx={{ marginTop: '1rem' }}>
                <StyledTableContainer>
                  <Table sx={{ padding: '1rem' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Versao</TableCell>
                        <TableCell align="center">Disciplina</TableCell>
                        <TableCell align="center">Creditos</TableCell>
                        <TableCell align="center">Oferta</TableCell>
                        <TableCell align="center">Produzido</TableCell>
                        {/* <TableCell align="center">Ações</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <>
                        <TableRow
                          key={versao?.id}
                          onClick={() => {
                            setVersaoCollapse(versaoCollapse);
                          }}
                          sx={{
                            boxShadow: '0px 0px 0px 8px #EFEFEF',
                            borderRadius: '10px 10px 0 0',
                          }}
                        >
                          <TableCell align="center">{versao?.disciplina_versao_nome}</TableCell>
                          <TableCell align="center">{versao?.disciplina.name}</TableCell>
                          <TableCell align="center">{versao?.credito_quantidade}</TableCell>
                          <TableCell align="center">{versao?.em_oferta ? 'Sim' : 'Não'}</TableCell>
                          <TableCell align="center">{versao?.produzido ? 'Sim' : 'Não'}</TableCell>
                          {/* <TableCell align="center">
                            <ButtonGroup
                              variant="outlined"
                              aria-label="outlined primary button group"
                            >
                              <IconButton
                                color="primary"
                                onClick={async (e) => {
                                  e.stopPropagation();

                                  setOpenDelete(versao.id);
                                }}
                              >
                                <img src={Delete} alt="Edit" />
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
                          </TableCell> */}
                        </TableRow>
                        <TableRow
                          sx={{
                            boxShadow: '0px 2px 0px 8px #EFEFEF',
                            borderRadius: '0px 0px 10px 10px',
                          }}
                        >
                          <TableCell
                            colSpan={7}
                            sx={{
                              paddingBottom: 0,
                              paddingTop: 0,
                              borderRadius: '0px 0px 10px 10px !important',
                            }}
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
                                      <Typography whiteSpace="pre-wrap">
                                        {versao?.ementa}
                                      </Typography>
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
            </>
          )}
        </Box>
        <Collapse in={comparadorCollapse} orientation="horizontal">
          <Box
            sx={{
              width: '40vw',
              background: '#E5E5E5',
              borderLeft: '1px solid #e2e2e2',
              boxShadow: '0px -15px 20px 0px #C7C7C7',
            }}
          >
            <Box sx={{ padding: '2rem 1rem', minHeight: '92.55vh' }}>
              {!versaoRender && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '2rem',
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      Comparar Disciplinas
                    </Typography>
                    <IconButton
                      color="primary"
                      sx={{ color: '#020560' }}
                      onClick={() => setComparadorCollapse(false)}
                    >
                      <Close />
                    </IconButton>
                  </Box>

                  <Typography sx={{ marginTop: '0.5rem', fontSize: '1rem' }}>
                    Insira abaixo os dados da disciplina que deseja comparar
                  </Typography>
                  <Box sx={{ marginTop: '1rem' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Autocomplete
                          value={DisciplinasId}
                          onChange={(event: any, newValue) => {
                            setDisciplinasId(newValue);

                            handleSelectDisciplina(newValue?.id);
                          }}
                          disablePortal
                          id="combo-box-demo"
                          options={DisciplinaOption1}
                          renderInput={(params1) => (
                            <TextField {...params1} label="Disciplina" fullWidth />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Autocomplete
                          value={versoesId}
                          onChange={(event: any, newValue) => {
                            setVersoesId(newValue);

                            handleSelectVersao(newValue?.id);
                          }}
                          disablePortal
                          id="combo-box-demo"
                          options={VersaoOption1}
                          renderInput={(params1) => (
                            <TextField {...params1} label="Crédito da Disciplina" fullWidth />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}

              {versaoRender && versaoRenderDisciplina && (
                <>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Button
                      variant="contained"
                      sx={{ background: '#020560', '&:hover': { background: '#020560' } }}
                      onClick={() => handleSelectVersao('')}
                    >
                      Voltar
                    </Button>
                    <IconButton
                      color="primary"
                      sx={{ color: '#020560' }}
                      onClick={() => setComparadorCollapse(false)}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                      {versaoRenderDisciplina?.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      marginTop: '0.35rem',
                      color: 'rgba(60, 62, 131, 0.56)',
                    }}
                  >
                    <Typography>Sigla: {versaoRenderDisciplina?.sigla}</Typography>
                  </Box>
                  <Box sx={{ marginTop: '0.35rem', color: 'rgba(60, 62, 131, 0.56)' }}>
                    <Typography>Área: {versaoRenderDisciplina?.area.name}</Typography>
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>
                    <Divider />
                  </Box>
                  <Box sx={{ marginTop: '1rem' }}>
                    <StyledTableContainer>
                      <Table sx={{ padding: '1rem' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Versao</TableCell>
                            <TableCell align="center">Disciplina</TableCell>
                            <TableCell align="center">Creditos</TableCell>
                            <TableCell align="center">Oferta</TableCell>
                            <TableCell align="center">Produzido</TableCell>
                            {/* <TableCell align="center">Ações</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <>
                            <TableRow
                              key={versaoRender?.id}
                              onClick={() => {
                                setVersaoCollapse(versaoCollapse);
                              }}
                              sx={{
                                boxShadow: '0px 0px 0px 8px #EFEFEF',
                                borderRadius: '10px 10px 0 0',
                              }}
                            >
                              <TableCell align="center">
                                {versaoRender?.disciplina_versao_nome}
                              </TableCell>
                              <TableCell align="center">{versaoRender?.disciplina.name}</TableCell>
                              <TableCell align="center">
                                {versaoRender?.credito_quantidade}
                              </TableCell>
                              <TableCell align="center">
                                {versaoRender?.em_oferta ? 'Sim' : 'Não'}
                              </TableCell>
                              <TableCell align="center">
                                {versaoRender?.produzido ? 'Sim' : 'Não'}
                              </TableCell>
                              {/* <TableCell align="center">
                                <ButtonGroup
                                  variant="outlined"
                                  aria-label="outlined primary button group"
                                >
                                  <IconButton
                                    color="primary"
                                    onClick={async (e) => {
                                      e.stopPropagation();

                                      setOpenDelete2(versaoRender.id);
                                    }}
                                  >
                                    <img src={Delete} alt="Edit" />
                                  </IconButton>
                                  <IconButton
                                    color="primary"
                                    onClick={async (e) => {
                                      e.stopPropagation();

                                      setOpenUpdateVersao2(true);
                                    }}
                                  >
                                    <img src={Edit} alt="Edit" />
                                  </IconButton>
                                </ButtonGroup>
                              </TableCell> */}
                            </TableRow>
                            <TableRow
                              sx={{
                                boxShadow: '0px 2px 0px 8px #EFEFEF',
                                borderRadius: '0px 0px 10px 10px',
                              }}
                            >
                              <TableCell
                                colSpan={7}
                                sx={{
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                  borderRadius: '0px 0px 10px 10px !important',
                                }}
                              >
                                <Collapse in={versaoCollapse}>
                                  <Box sx={{ margin: '1rem' }}>
                                    {/* Ementa Collapse */}
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                      }}
                                      onClick={() => {
                                        setEmentaCollapse2(!ementaCollapse2);
                                      }}
                                    >
                                      {ementaCollapse2 ? (
                                        <ArrowDropDown sx={{ color: '#7678D7' }} />
                                      ) : (
                                        <ArrowRight sx={{ color: '#7678D7' }} />
                                      )}
                                      <Typography sx={{ fontWeight: 'bold' }}>Ementa</Typography>
                                    </Box>
                                    <Collapse in={ementaCollapse2}>
                                      <Box sx={{ padding: '1rem' }}>
                                        <Box>
                                          <Typography whiteSpace="pre-wrap">
                                            {versaoRender?.ementa}
                                          </Typography>
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
                                        setBibliografiaCollapse2(!bibliografiaCollapse2);
                                      }}
                                    >
                                      {bibliografiaCollapse2 ? (
                                        <ArrowDropDown sx={{ color: '#7678D7' }} />
                                      ) : (
                                        <ArrowRight sx={{ color: '#7678D7' }} />
                                      )}
                                      <Typography sx={{ fontWeight: 'bold' }}>
                                        Bibliografias
                                      </Typography>
                                    </Box>
                                    <Collapse in={bibliografiaCollapse2}>
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
                                        setPpcsCollapse2(!ppcsCollapse2);
                                      }}
                                    >
                                      {ppcsCollapse2 ? (
                                        <ArrowDropDown sx={{ color: '#7678D7' }} />
                                      ) : (
                                        <ArrowRight sx={{ color: '#7678D7' }} />
                                      )}
                                      <Typography sx={{ fontWeight: 'bold' }}>PPCs</Typography>
                                    </Box>
                                    <Collapse in={ppcsCollapse2}>
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
                </>
              )}
            </Box>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
