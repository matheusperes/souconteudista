import {
  AddCircle,
  ArrowForward,
  Close,
  ExpandLess,
  ExpandMore,
  Search,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useInstitution } from '#shared/hooks/institution';
import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import image1 from '#shared/images/image1.svg';
import image10 from '#shared/images/image10.svg';
import image2 from '#shared/images/image2.svg';
import image3 from '#shared/images/image3.svg';
import { api } from '#shared/services/axios';

import { CreateCompetenciaModalPPC } from '#modules/competencias/components/CreateCompetenciaModalPPC';
import { DeleteCompetencia } from '#modules/competencias/components/DeleteCompetencia';
import { UpdateCompetenciaModal } from '#modules/competencias/components/UpdateCompetenciaModal';
import { CreateDisciplinaPPC } from '#modules/disciplinas/components/CreateDisciplinaPPC';
import { DeleteDisciplinaPPC } from '#modules/disciplinas/components/DeleteDisciplinaPPC';
import { UpdateDisciplinaPPC } from '#modules/disciplinas/components/UpdateDisciplinaPPC';
import { IInstituicoes } from '#modules/instituicoes/pages/ListInstituicoes';
import { CreatePerfilModalPPC } from '#modules/perfis/components/CreatePerfilModalPPC';
import { DeletePerfil } from '#modules/perfis/components/DeletePerfilModal';
import { UpdatePerfilModal } from '#modules/perfis/components/UpdatePerfilModal';

import { toRoman } from './roman';
import { BoxStyled } from './styles';
import { getSemestres } from './utils';

type Competencias = {
  id: string;
  ppc_id: string;
  competencia: string;
  competenciaNumero: number;
};

type Perfils = {
  id: string;
  ppc_id: string;
  perfil: string;
  perfilNumero: number;
};

type DisciplinaVersao = {
  id: string;
  disciplina_id: string;
  disciplina_versao_nome: string;
  codigo: string;
  credito_quantidade: number;
  ementa: string;
  observacao: string;
  em_oferta: boolean;
  produzido: boolean;
};

type Disciplina = {
  name: string;
};

type Versoes = {
  disciplina_versao_nome: string;
  credito_quantidade: number;
  disciplina: Disciplina;
};

type DisciplinaAPI = {
  id: string;
  modulo: number;
  semestre: number;
  created_at: string;
  versao: Versoes;
  disciplinaVersao: DisciplinaVersao;
};

type Curso = {
  id: string;
  name: string;
};

export type InfoPpcs = {
  id: string;
  anoVoto: number;
  dataInicio: string;
  dataFim: string;
  horaCredito: number;
  quantSemestres: number;
  curso_id: string;
  competencias: Competencias[];
  perfis: Perfils[];
  curso: Curso;
  ppcDisciplinaVersoes: DisciplinaAPI[];
};

export type IModalVersao = {
  modulo: number;
  ppc_id: string;
  semestre: number;
  ppc_disciplina_versao?: string;
} | null;

export type IModalVersao2 = {
  modulo: number;
  ppc_id: string;
  semestre: number;
  ppc_disciplina_versao: string;
} | null;

type ICursoApi = {
  id: string;
  name: string;
  active: boolean;
  ppc_ativo: string;
  ppcs: InfoPpcs[];
};

type CursoOption = {
  id: string;
  label: string;
};

type InstituicaoOption = {
  id: string;
  label: string;
};

type PPCOption = {
  id: string;
  label: string;
};

export function InfoPpcs() {
  const { setTitle } = useTitle();
  const params = useParams();
  const navigate = useNavigate();
  const { message } = useToast();
  const { startLoading, stopLoading } = useLoading();
  const { instituicao } = useInstitution();

  const [searchPerfil, setSearchPerfil] = useState('');
  const [searchPerfil2, setSearchPerfil2] = useState('');

  const [searchCompetencia, setSearchCompetencia] = useState('');
  const [searchCompetencia2, setSearchCompetencia2] = useState('');

  const [openCreateCompetencia, setOpenCreateCompetencia] = useState(false);
  const [openCreateCompetencia2, setOpenCreateCompetencia2] = useState(false);

  const [openUpdateCompetencia, setOpenUpdateCompetencia] = useState<string | null>(null);
  const [openUpdateCompetencia2, setOpenUpdateCompetencia2] = useState<string | null>(null);

  const [openDeleteCompetencia, setOpenDeleteCompetencia] = useState<any>(null);
  const [openDeleteCompetencia2, setOpenDeleteCompetencia2] = useState<any>(null);

  const [openCreatePerfil, setOpenCreatePerfil] = useState(false);
  const [openCreatePerfil2, setOpenCreatePerfil2] = useState(false);

  const [openUpdatePerfil, setOpenUpdatePerfil] = useState<string | null>(null);
  const [openUpdatePerfil2, setOpenUpdatePerfil2] = useState<string | null>(null);

  const [openDeletePerfil, setOpenDeletePerfil] = useState<any>(null);
  const [openDeletePerfil2, setOpenDeletePerfil2] = useState<any>(null);

  const [openCreate, setOpenCreate] = useState<IModalVersao>(null);
  const [openCreate2, setOpenCreate2] = useState<IModalVersao>(null);

  const [openUpdate, setOpenUpdate] = useState<IModalVersao2 | null>(null);
  const [openUpdate2, setOpenUpdate2] = useState<IModalVersao2 | null>(null);

  const [openDelete, setOpenDelete] = useState<any>(null);
  const [openDelete2, setOpenDelete2] = useState<any>(null);

  const [perfilCollapse, setPerfilCollapse] = useState(false);
  const [perfilCollapse2, setPerfilCollapse2] = useState(false);

  const [competenciaCollapse, setCompetenciaCollapse] = useState(false);
  const [competenciaCollapse2, setCompetenciaCollapse2] = useState(false);

  const [disciplinasCollapse, setDisciplinasCollapse] = useState(false);
  const [disciplinasCollapse2, setDisciplinasCollapse2] = useState(false);

  const [comparadorCollapse, setComparadorCollapse] = useState(false);

  const [ppc, setPpc] = useState<InfoPpcs>();

  const [cursos, setCursos] = useState<ICursoApi[]>([]);
  const [cursosId, setCursosId] = useState<CursoOption | null>(null);
  const [instituicoes, setInstituicoes] = useState<IInstituicoes[]>([]);
  const [instituicoesId, setInstituicoesId] = useState<InstituicaoOption | null>(null);
  const [ppcs, setppcs] = useState<InfoPpcs[]>([]);
  const [ppcsId, setppcsId] = useState<PPCOption | null>(null);
  const [versaoRender, setVersaoRender] = useState<InfoPpcs | null>(null);

  useEffect(() => {
    setTitle(`PPC ${ppc?.anoVoto || ''}`);
  }, [message, ppc?.anoVoto, ppc?.curso.name, setTitle]);

  const getPpc = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get(`/ppc/${params?.id}`, {
        params: { instituicao_id: instituicao?.id },
      });
      setPpc(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [instituicao?.id, message, params?.id, startLoading, stopLoading]);

  useEffect(() => {
    getPpc();
  }, [getPpc]);

  useEffect(() => {
    async function getCursos() {
      const response = await api.get('/cursos', {
        params: { instituicao_id: instituicoesId?.id },
      });

      setCursos(response.data);
    }

    getCursos();
  }, [instituicoesId?.id]);

  useEffect(() => {
    async function getInstituicoes() {
      const response = await api.get('/instituicoes');

      setInstituicoes(response.data);
    }

    getInstituicoes();
  }, [instituicao?.id]);

  useEffect(() => {
    async function getPPCs() {
      if (cursosId !== null) {
        startLoading();
        try {
          const response = await api.get('/ppcs', {
            params: { curso_id: cursosId.id, instituicao_id: instituicoesId?.id },
          });
          setppcs(response.data);
        } catch (error: any) {
          message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
        } finally {
          stopLoading();
        }
      }
    }

    getPPCs();
  }, [cursosId, instituicoesId?.id, message, ppc?.curso.id, startLoading, stopLoading]);

  const CursoOption1 = useMemo(() => {
    return cursos.map((curso) => {
      return {
        id: curso.id,
        label: curso.name,
      };
    });
  }, [cursos]);

  const InstituicoesOption = useMemo(() => {
    return instituicoes.map((inst) => {
      return {
        id: inst.id,
        label: `${inst.name} - ${inst.sigla}`,
      };
    });
  }, [instituicoes]);

  const PPCOption1 = useMemo(() => {
    return ppcs.map((ppc1) => {
      return {
        id: ppc1.id,
        label: String(ppc1.anoVoto),
      };
    });
  }, [ppcs]);

  const handleSelectPPC = useCallback(
    async (newVersaoId?: string) => {
      if (newVersaoId) {
        const response = await api.get(`/ppc/${newVersaoId}`, {
          params: { instituicao_id: instituicoesId?.id },
        });
        setVersaoRender(response.data);
      } else {
        setVersaoRender(null);
        setInstituicoesId(null);
        setCursosId(null);
        setppcsId(null);
      }
    },
    [instituicoesId?.id],
  );

  const ppcInfo = useMemo(() => {
    if (!ppc) {
      return null;
    }
    return {
      ...ppc,
      semestres: getSemestres(ppc),
    };
  }, [ppc]);

  const ppcInfoRender = useMemo(() => {
    if (!versaoRender) {
      return null;
    }
    return {
      ...versaoRender,
      semestres: getSemestres(versaoRender),
    };
  }, [versaoRender]);

  // const perfilSort = useMemo(() => {
  //   return {
  //     ...ppcInfo?.perfis.sort((a, b) => a.perfilNumero - b.perfilNumero),
  //   };
  // }, [ppcInfo?.perfis]);
  // console.log(perfilSort);

  // const competenciaSort = useMemo(() => {
  //   return {
  //     ...ppcInfo?.competencias.sort((a, b) => a.competenciaNumero - b.competenciaNumero),
  //   };
  // }, [ppcInfo?.competencias]);
  // console.log(competenciaSort);

  const filteredPerfil = useMemo(() => {
    return ppcInfo?.perfis.filter((perfil) => {
      return perfil.perfil.toLowerCase().includes(searchPerfil.toLowerCase());
    });
  }, [ppcInfo?.perfis, searchPerfil]);

  const filteredPerfilRender = useMemo(() => {
    return versaoRender?.perfis.filter((perfil) => {
      return perfil.perfil.toLowerCase().includes(searchPerfil2.toLowerCase());
    });
  }, [searchPerfil2, versaoRender?.perfis]);

  const filteredCompetencia = useMemo(() => {
    return ppcInfo?.competencias.filter((competencia) => {
      return competencia.competencia.toLowerCase().includes(searchCompetencia.toLowerCase());
    });
  }, [ppcInfo?.competencias, searchCompetencia]);

  const filteredCompetenciaRender = useMemo(() => {
    return versaoRender?.competencias.filter((competencia) => {
      return competencia.competencia.toLowerCase().includes(searchCompetencia2.toLowerCase());
    });
  }, [searchCompetencia2, versaoRender?.competencias]);

  return (
    <>
      {!!openCreate && (
        <CreateDisciplinaPPC
          open={!!openCreate}
          onClose={() => setOpenCreate(null)}
          instituicao_Id={instituicao?.id}
          ppc_id={openCreate.ppc_id}
          modulo={openCreate.modulo}
          semestre={openCreate.semestre}
          reloadList={() => getPpc()}
        />
      )}
      {!!openCreate2 && (
        <CreateDisciplinaPPC
          open={!!openCreate2}
          onClose={() => setOpenCreate2(null)}
          instituicao_Id={instituicoesId?.id}
          ppc_id={openCreate2.ppc_id}
          modulo={openCreate2.modulo}
          semestre={openCreate2.semestre}
          reloadList={() => handleSelectPPC(versaoRender?.id)}
        />
      )}
      {!!openUpdate && (
        <UpdateDisciplinaPPC
          open={!!openUpdate}
          onClose={() => setOpenUpdate(null)}
          instituicao_Id={instituicao?.id}
          ppc_disciplina_versao={openUpdate.ppc_disciplina_versao}
          ppc_id={openUpdate.ppc_id}
          modulo={openUpdate.modulo}
          semestre={openUpdate.semestre}
          reloadList={() => getPpc()}
        />
      )}
      {!!openUpdate2 && (
        <UpdateDisciplinaPPC
          open={!!openUpdate2}
          onClose={() => setOpenUpdate2(null)}
          instituicao_Id={instituicoesId?.id}
          ppc_disciplina_versao={openUpdate2.ppc_disciplina_versao}
          ppc_id={openUpdate2.ppc_id}
          modulo={openUpdate2.modulo}
          semestre={openUpdate2.semestre}
          reloadList={() => handleSelectPPC(versaoRender?.id)}
        />
      )}
      {!!openDelete && (
        <DeleteDisciplinaPPC
          open={!!openDelete}
          onClose={() => setOpenDelete(null)}
          ppc_disciplina_versao={openDelete}
          reloadList={() => getPpc()}
        />
      )}
      {!!openDelete2 && (
        <DeleteDisciplinaPPC
          open={!!openDelete2}
          onClose={() => setOpenDelete2(null)}
          ppc_disciplina_versao={openDelete2}
          reloadList={() => handleSelectPPC(versaoRender?.id)}
        />
      )}
      <CreateCompetenciaModalPPC
        open={openCreateCompetencia}
        onClose={() => setOpenCreateCompetencia(false)}
        ppc_id={ppcInfo?.id || ''}
        instituicao_id={instituicao?.id}
        reloadList={() => getPpc()}
      />
      <CreateCompetenciaModalPPC
        open={openCreateCompetencia2}
        onClose={() => setOpenCreateCompetencia2(false)}
        ppc_id={ppcInfoRender?.id || ''}
        instituicao_id={instituicoesId?.id}
        reloadList={() => handleSelectPPC(versaoRender?.id)}
      />
      <CreatePerfilModalPPC
        open={openCreatePerfil}
        onClose={() => setOpenCreatePerfil(false)}
        ppc_id={ppcInfo?.id || ''}
        instituicao_id={instituicao?.id}
        reloadList={() => getPpc()}
      />
      <CreatePerfilModalPPC
        open={openCreatePerfil2}
        onClose={() => setOpenCreatePerfil2(false)}
        ppc_id={ppcInfoRender?.id || ''}
        instituicao_id={instituicoesId?.id}
        reloadList={() => handleSelectPPC(versaoRender?.id)}
      />
      {!!openUpdateCompetencia && (
        <UpdateCompetenciaModal
          open={!!openUpdateCompetencia}
          onClose={() => setOpenUpdateCompetencia(null)}
          competencia_id={openUpdateCompetencia}
          instituicao_Id={instituicao?.id}
          reloadList={() => getPpc()}
        />
      )}
      {!!openUpdateCompetencia2 && (
        <UpdateCompetenciaModal
          open={!!openUpdateCompetencia2}
          onClose={() => setOpenUpdateCompetencia2(null)}
          competencia_id={openUpdateCompetencia2}
          instituicao_Id={instituicoesId?.id}
          reloadList={() => handleSelectPPC(versaoRender?.id)}
        />
      )}
      {!!openUpdatePerfil && (
        <UpdatePerfilModal
          open={!!openUpdatePerfil}
          onClose={() => setOpenUpdatePerfil(null)}
          perfil_id={openUpdatePerfil}
          instituicao_Id={instituicao?.id}
          reloadList={() => getPpc()}
        />
      )}
      {!!openUpdatePerfil2 && (
        <UpdatePerfilModal
          open={!!openUpdatePerfil2}
          onClose={() => setOpenUpdatePerfil2(null)}
          perfil_id={openUpdatePerfil2}
          instituicao_Id={instituicoesId?.id}
          reloadList={() => handleSelectPPC(versaoRender?.id)}
        />
      )}
      {!!openDeleteCompetencia && (
        <DeleteCompetencia
          open={!!openDeleteCompetencia}
          onClose={() => setOpenDeleteCompetencia(null)}
          competencia_id={openDeleteCompetencia}
          reloadList={() => getPpc()}
        />
      )}
      {!!openDeleteCompetencia2 && (
        <DeleteCompetencia
          open={!!openDeleteCompetencia2}
          onClose={() => setOpenDeleteCompetencia2(null)}
          competencia_id={openDeleteCompetencia2}
          reloadList={() => handleSelectPPC(versaoRender?.id)}
        />
      )}
      {!!openDeletePerfil && (
        <DeletePerfil
          open={!!openDeletePerfil}
          onClose={() => setOpenDeletePerfil(null)}
          perfil_id={openDeletePerfil}
          reloadList={() => getPpc()}
        />
      )}
      {!!openDeletePerfil2 && (
        <DeletePerfil
          open={!!openDeletePerfil2}
          onClose={() => setOpenDeletePerfil2(null)}
          perfil_id={openDeletePerfil2}
          reloadList={() => handleSelectPPC(versaoRender?.id)}
        />
      )}
      <Box className="Pagina" sx={{ display: 'flex' }}>
        <Box
          sx={(theme) => ({
            mt: '1rem',
            padding: '1.5rem',
            width: comparadorCollapse ? `calc(100% - 42vw)` : '100%',
            transition: theme.transitions.create(['width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          })}
        >
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Link to="/cursos">Cursos</Link>
              {ppc && <Link to={`/cursos/${ppc.curso.id}/ppcs`}>{ppc.curso.name}</Link>}
              {ppc && <Typography>{`PPC ${ppc.anoVoto}`}</Typography>}
            </Breadcrumbs>
          </Box>
          {ppc && (
            <>
              <Box
                sx={{
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
                  {ppc.curso.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: '0.375rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ fontSize: '1rem' }}>{`PPC ${ppc?.anoVoto}`}</Typography>
                <Tooltip title="Comparador" placement="left">
                  <Icon
                    sx={{ height: '33px', cursor: 'pointer' }}
                    onClick={() => {
                      setComparadorCollapse(!comparadorCollapse);
                    }}
                  >
                    <img src={image10} alt="comparador" />
                  </Icon>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '0.375rem',
                  color: 'rgba(60, 62, 131, 0.56)',
                  fontSize: '0.875rem',
                }}
              >
                <Typography>{`Ano Voto: ${ppc.anoVoto}`}</Typography>
                <Typography>{`Ano Inicio: ${ppc.dataInicio}`}</Typography>
                <Typography>{`Ano Final: ${ppc.dataFim}`}</Typography>
                <Typography>{`Horas/Créditos: ${ppc.horaCredito}`}</Typography>
              </Box>
              <Box
                sx={{
                  marginTop: '2rem',
                  display: 'flex',
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => {
                    setPerfilCollapse(!perfilCollapse);
                  }}
                >
                  <Icon sx={{ height: '33px', textAlign: 'unset' }}>
                    <img src={image1} alt="Perfil" />
                  </Icon>
                  <Typography sx={{ marginLeft: '8px', fontWeight: 'bold' }}>
                    Perfil do egresso
                  </Typography>
                  <IconButton sx={{ height: '31px', marginLeft: '8px' }}>
                    {perfilCollapse ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <Collapse in={perfilCollapse}>
                <Box>
                  <Box sx={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="contained"
                      sx={{ background: '#020560', '&:hover': { background: '#020560' } }}
                      onClick={() => {
                        setOpenCreatePerfil(true);
                      }}
                    >
                      Adicionar
                    </Button>
                  </Box>
                  {ppcInfo?.perfis && ppcInfo?.perfis.length > 0 && (
                    <>
                      <Box sx={{ marginTop: '1.5rem' }}>
                        <TextField
                          id="input-with-icon-textfield"
                          onChange={(e) => setSearchPerfil(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search />
                              </InputAdornment>
                            ),
                          }}
                          variant="outlined"
                          fullWidth
                          placeholder="Pesquisar"
                        />
                      </Box>
                      {filteredPerfil?.map((perfil) => (
                        <Box sx={{ marginTop: '0.5rem' }} key={perfil.id}>
                          <Card
                            sx={{ display: 'flex', cursor: 'pointer' }}
                            onClick={() =>
                              navigate(
                                `/cursos/${ppc?.curso_id}/ppcs/${perfil?.ppc_id}/perfil/${perfil.id}`,
                              )
                            }
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '3rem',
                              }}
                            >
                              <CardContent>
                                <Typography>{toRoman(perfil.perfilNumero)}</Typography>
                              </CardContent>
                            </Box>
                            <Divider orientation="vertical" flexItem variant="middle" />
                            <Box sx={{ width: '100%' }}>
                              <CardContent sx={{ justifyContent: 'center', paddingBottom: '0' }}>
                                <Typography sx={{ textAlign: 'justify' }}>
                                  {perfil.perfil}
                                </Typography>
                              </CardContent>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  padding: '0 1rem',
                                }}
                              >
                                <ButtonGroup
                                  variant="outlined"
                                  aria-label="outlined primary button group"
                                >
                                  <IconButton
                                    sx={{ marginLeft: 'auto' }}
                                    color="primary"
                                    onClick={async (e) => {
                                      e.stopPropagation();

                                      setOpenUpdatePerfil(perfil.id);
                                    }}
                                  >
                                    <img src={Edit} alt="Edit" />
                                  </IconButton>
                                  <IconButton
                                    color="primary"
                                    onClick={async (e) => {
                                      e.stopPropagation();

                                      setOpenDeletePerfil(perfil.id);
                                    }}
                                  >
                                    <img src={Delete} alt="Delete" />
                                  </IconButton>
                                </ButtonGroup>
                              </Box>
                            </Box>
                          </Card>
                        </Box>
                      ))}
                    </>
                  )}
                </Box>
              </Collapse>
              <Box
                sx={{
                  marginTop: '1.5rem',
                  display: 'flex',
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => {
                    setCompetenciaCollapse(!competenciaCollapse);
                  }}
                >
                  <Icon sx={{ height: '33px', textAlign: 'unset' }}>
                    <img src={image2} alt="Perfil" />
                  </Icon>
                  <Typography sx={{ marginLeft: '8px', fontWeight: 'bold' }}>
                    Competências e habilidades
                  </Typography>
                  <IconButton sx={{ height: '31px', marginLeft: '8px' }}>
                    {competenciaCollapse ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <Collapse in={competenciaCollapse}>
                <Box>
                  <Box sx={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="contained"
                      sx={{ background: '#020560', '&:hover': { background: '#020560' } }}
                      onClick={() => {
                        setOpenCreateCompetencia(true);
                      }}
                    >
                      Adicionar
                    </Button>
                  </Box>
                  {ppcInfo?.competencias && ppcInfo?.competencias.length > 0 && (
                    <Box sx={{ marginTop: '1.5rem' }}>
                      <TextField
                        id="input-with-icon-textfield"
                        onChange={(e) => setSearchCompetencia(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        fullWidth
                        placeholder="Pesquisar"
                      />
                      {filteredCompetencia?.map((competencia) => (
                        <Box sx={{ marginTop: '0.5rem' }} key={competencia.id}>
                          <Card
                            sx={{ display: 'flex', cursor: 'pointer' }}
                            onClick={() =>
                              navigate(
                                `/cursos/${ppc?.curso_id}/ppcs/${competencia?.ppc_id}/competencia/${competencia.id}`,
                              )
                            }
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '3rem',
                              }}
                            >
                              <CardContent>
                                <Typography>{toRoman(competencia.competenciaNumero)}</Typography>
                              </CardContent>
                            </Box>
                            <Divider orientation="vertical" flexItem variant="middle" />
                            <Box sx={{ width: '100%' }}>
                              <CardContent sx={{ justifyContent: 'center', paddingBottom: '0' }}>
                                <Typography sx={{ textAlign: 'justify' }}>
                                  {competencia.competencia}
                                </Typography>
                              </CardContent>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  padding: '0 1rem',
                                }}
                              >
                                <ButtonGroup
                                  variant="outlined"
                                  aria-label="outlined primary button group"
                                >
                                  <IconButton
                                    color="primary"
                                    onClick={async (e) => {
                                      e.stopPropagation();

                                      setOpenUpdateCompetencia(competencia.id);
                                    }}
                                  >
                                    <img src={Edit} alt="Edit" />
                                  </IconButton>
                                  <IconButton
                                    color="primary"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      setOpenDeleteCompetencia(competencia.id);
                                    }}
                                  >
                                    <img src={Delete} alt="Delete" />
                                  </IconButton>
                                </ButtonGroup>
                              </Box>
                            </Box>
                          </Card>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Collapse>
              <Box
                sx={{
                  marginTop: '1.5rem',
                  display: 'flex',
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => {
                    setDisciplinasCollapse(!disciplinasCollapse);
                  }}
                >
                  <Icon sx={{ height: '33px', textAlign: 'unset' }}>
                    <img src={image3} alt="Perfil" />
                  </Icon>
                  <Typography sx={{ marginLeft: '8px', fontWeight: 'bold' }}>
                    Disciplinas no PPC
                  </Typography>
                  <IconButton sx={{ height: '31px', marginLeft: '8px' }}>
                    {disciplinasCollapse ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <Collapse in={disciplinasCollapse}>
                <Box sx={{ marginTop: '1rem' }}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {ppcInfo?.semestres.map((semestre) => (
                        <Grid item xs={6} key={semestre.semestre}>
                          <Box sx={{ background: '#F4F4F4', padding: '10px' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1rem',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 'bold',
                                  color: 'rgba(2, 5, 96, 0.85)',
                                  fontSize: '1.5rem',
                                }}
                              >
                                Semestre {semestre.semestre}
                              </Typography>
                            </Box>
                            <Divider sx={{ background: 'rgba(145, 147, 185, 0.34)' }} />
                            <Box>
                              {semestre.modulos.map((modulo) => (
                                <Box key={modulo.modulo}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <BoxStyled>
                                      <Typography
                                        sx={{
                                          marginTop: '0.25rem',
                                          fontWeight: 'bold',
                                          color: '#7678D7',
                                        }}
                                      >
                                        Modulo {modulo.modulo}
                                      </Typography>

                                      <IconButton
                                        onClick={() =>
                                          setOpenCreate({
                                            semestre: semestre.semestre,
                                            modulo: modulo.modulo,
                                            ppc_id: ppcInfo.id,
                                          })
                                        }
                                      >
                                        <AddCircle fontSize="small" sx={{ color: '#7678D7' }} />
                                      </IconButton>
                                    </BoxStyled>
                                    <Box>
                                      <Typography
                                        sx={{
                                          marginTop: '0.25rem',
                                          fontWeight: 'bold',
                                          color: '#7678D7',
                                        }}
                                      >
                                        CH Total
                                      </Typography>
                                    </Box>
                                  </Box>

                                  <Box sx={{ marginLeft: '1rem' }}>
                                    {modulo.disciplinas.map((disciplina) => (
                                      <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        key={disciplina.id}
                                      >
                                        <Typography>{disciplina.name}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <Typography>{disciplina.creditos}</Typography>
                                          <IconButton
                                            onClick={async (e) => {
                                              e.stopPropagation();
                                              setOpenUpdate({
                                                semestre: semestre.semestre,
                                                modulo: modulo.modulo,
                                                ppc_id: ppcInfo.id,
                                                ppc_disciplina_versao: disciplina.id,
                                              });
                                            }}
                                          >
                                            <img src={Edit} alt="Edit" />
                                          </IconButton>
                                          <IconButton
                                            color="primary"
                                            onClick={async (e) => {
                                              e.stopPropagation();
                                              setOpenDelete(disciplina.id);
                                            }}
                                          >
                                            <img src={Delete} alt="Delete" />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                    ))}
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>
            </>
          )}
        </Box>
        <Collapse in={comparadorCollapse} orientation="horizontal">
          <Box
            sx={{
              width: '42vw',
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
                      marginTop: '3rem',
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      Comparar PPCs
                    </Typography>
                    <IconButton
                      color="primary"
                      sx={{ color: '#020560' }}
                      onClick={() => {
                        handleSelectPPC('');
                        setComparadorCollapse(false);
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Box>

                  <Typography sx={{ marginTop: '0.5rem', fontSize: '1rem' }}>
                    Insira abaixo os dados do PPC que deseja comparar
                  </Typography>
                  <Box sx={{ marginTop: '1rem' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Autocomplete
                          value={instituicoesId}
                          onChange={(event: any, newValue) => {
                            setInstituicoesId(newValue);
                          }}
                          disablePortal
                          id="combo-box-demo"
                          options={InstituicoesOption}
                          renderInput={(params1) => (
                            <TextField {...params1} label="Instituição" fullWidth />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Autocomplete
                          value={cursosId}
                          onChange={(event: any, newValue) => {
                            setCursosId(newValue);
                          }}
                          disablePortal
                          id="combo-box-demo"
                          options={CursoOption1}
                          renderInput={(params1) => (
                            <TextField {...params1} label="Curso" fullWidth />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Autocomplete
                          value={ppcsId}
                          onChange={(event: any, newValue) => {
                            setppcsId(newValue);

                            handleSelectPPC(newValue?.id);
                          }}
                          disablePortal
                          id="combo-box-demo"
                          options={PPCOption1}
                          renderInput={(params1) => (
                            <TextField {...params1} label="Ano Voto PPC" fullWidth />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}

              {versaoRender && (
                <>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Button
                      variant="contained"
                      sx={{ background: '#020560', '&:hover': { background: '#020560' } }}
                      onClick={() => handleSelectPPC('')}
                    >
                      Voltar
                    </Button>
                    <IconButton
                      color="primary"
                      sx={{ color: '#020560' }}
                      onClick={() => {
                        handleSelectPPC('');
                        setComparadorCollapse(false);
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                  <Box sx={{ marginTop: '0.5rem' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
                      {versaoRender.curso.name}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: '0.5rem' }}>
                    <Typography
                      sx={{ fontSize: '1rem' }}
                    >{`PPC ${versaoRender.anoVoto}`}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '0.9rem',
                      color: 'rgba(60, 62, 131, 0.56)',
                      fontSize: '0.875rem',
                    }}
                  >
                    <Typography>{`Ano Voto: ${versaoRender.anoVoto}`}</Typography>
                    <Typography>{`Ano Inicio: ${versaoRender.dataInicio}`}</Typography>
                    <Typography>{`Ano Final: ${versaoRender.dataFim}`}</Typography>
                    <Typography>{`Horas/Créditos: ${versaoRender.horaCredito}`}</Typography>
                  </Box>
                  <Box
                    sx={{
                      marginTop: '2rem',
                      display: 'flex',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      onClick={() => {
                        setPerfilCollapse2(!perfilCollapse2);
                      }}
                    >
                      <Icon sx={{ height: '33px', textAlign: 'unset' }}>
                        <img src={image1} alt="Perfil" />
                      </Icon>
                      <Typography sx={{ marginLeft: '8px', fontWeight: 'bold' }}>
                        Perfil do egresso
                      </Typography>
                      <IconButton sx={{ height: '31px', marginLeft: '8px' }}>
                        {perfilCollapse2 ? (
                          <ExpandLess fontSize="small" />
                        ) : (
                          <ExpandMore fontSize="small" />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                  <Collapse in={perfilCollapse2}>
                    <Box>
                      <Box
                        sx={{
                          marginTop: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{ background: '#020560', '&:hover': { background: '#020560' } }}
                          onClick={() => {
                            setOpenCreatePerfil2(true);
                          }}
                        >
                          Adicionar
                        </Button>
                      </Box>
                      {versaoRender?.perfis && versaoRender?.perfis.length > 0 && (
                        <>
                          <Box sx={{ marginTop: '1.5rem' }}>
                            <TextField
                              id="input-with-icon-textfield"
                              onChange={(e) => setSearchPerfil2(e.target.value)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Search />
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              fullWidth
                              placeholder="Pesquisar"
                            />
                          </Box>
                          {filteredPerfilRender?.map((perfil) => (
                            <Box sx={{ marginTop: '0.5rem' }} key={perfil.id}>
                              <Card
                                sx={{ display: 'flex', cursor: 'default' }}
                                // onClick={() =>
                                //   navigate(
                                //     `/cursos/${versaoRender?.curso_id}/ppcs/${perfil?.ppc_id}/perfil/${perfil.id}`,
                                //   )
                                // }
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '3rem',
                                  }}
                                >
                                  <CardContent>
                                    <Typography>{toRoman(perfil.perfilNumero)}</Typography>
                                  </CardContent>
                                </Box>
                                <Divider orientation="vertical" flexItem variant="middle" />
                                <Box sx={{ width: '100%' }}>
                                  <CardContent
                                    sx={{ justifyContent: 'center', paddingBottom: '0' }}
                                  >
                                    <Typography sx={{ textAlign: 'justify' }}>
                                      {perfil.perfil}
                                    </Typography>
                                  </CardContent>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      padding: '0 1rem',
                                    }}
                                  >
                                    <ButtonGroup
                                      variant="outlined"
                                      aria-label="outlined primary button group"
                                    >
                                      <IconButton
                                        sx={{ marginLeft: 'auto' }}
                                        color="primary"
                                        onClick={async (e) => {
                                          e.stopPropagation();

                                          setOpenUpdatePerfil2(perfil.id);
                                        }}
                                      >
                                        <img src={Edit} alt="Edit" />
                                      </IconButton>
                                      <IconButton
                                        color="primary"
                                        onClick={async (e) => {
                                          e.stopPropagation();
                                          setOpenDeletePerfil2(perfil.id);
                                        }}
                                      >
                                        <img src={Delete} alt="Delete" />
                                      </IconButton>
                                    </ButtonGroup>
                                  </Box>
                                </Box>
                              </Card>
                            </Box>
                          ))}
                        </>
                      )}
                    </Box>
                  </Collapse>
                  <Box
                    sx={{
                      marginTop: '1.5rem',
                      display: 'flex',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      onClick={() => {
                        setCompetenciaCollapse2(!competenciaCollapse2);
                      }}
                    >
                      <Icon sx={{ height: '33px', textAlign: 'unset' }}>
                        <img src={image2} alt="Perfil" />
                      </Icon>
                      <Typography sx={{ marginLeft: '8px', fontWeight: 'bold' }}>
                        Competências e habilidades
                      </Typography>
                      <IconButton sx={{ height: '31px', marginLeft: '8px' }}>
                        {competenciaCollapse2 ? (
                          <ExpandLess fontSize="small" />
                        ) : (
                          <ExpandMore fontSize="small" />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                  <Collapse in={competenciaCollapse2}>
                    <Box>
                      <Box
                        sx={{
                          marginTop: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{ background: '#020560', '&:hover': { background: '#020560' } }}
                          onClick={() => {
                            setOpenCreateCompetencia2(true);
                          }}
                        >
                          Adicionar
                        </Button>
                      </Box>
                      {versaoRender?.competencias && versaoRender?.competencias.length > 0 && (
                        <Box sx={{ marginTop: '1.5rem' }}>
                          <TextField
                            id="input-with-icon-textfield"
                            onChange={(e) => setSearchCompetencia2(e.target.value)}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Search />
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            fullWidth
                            placeholder="Pesquisar"
                          />
                          {filteredCompetenciaRender?.map((competencia) => (
                            <Box sx={{ marginTop: '0.5rem' }} key={competencia.id}>
                              <Card
                                sx={{ display: 'flex', cursor: 'default' }}
                                // onClick={() =>
                                //   navigate(
                                //     `/cursos/${versaoRender?.curso_id}/ppcs/${competencia?.ppc_id}/competencia/${competencia.id}`,
                                //   )
                                // }
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '3rem',
                                  }}
                                >
                                  <CardContent>
                                    <Typography>
                                      {toRoman(competencia.competenciaNumero)}
                                    </Typography>
                                  </CardContent>
                                </Box>
                                <Divider orientation="vertical" flexItem variant="middle" />
                                <Box sx={{ width: '100%' }}>
                                  <CardContent
                                    sx={{ justifyContent: 'center', paddingBottom: '0' }}
                                  >
                                    <Typography sx={{ textAlign: 'justify' }}>
                                      {competencia.competencia}
                                    </Typography>
                                  </CardContent>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      padding: '0 1rem',
                                    }}
                                  >
                                    <ButtonGroup
                                      variant="outlined"
                                      aria-label="outlined primary button group"
                                    >
                                      <IconButton
                                        color="primary"
                                        onClick={async (e) => {
                                          e.stopPropagation();

                                          setOpenUpdateCompetencia2(competencia.id);
                                        }}
                                      >
                                        <img src={Edit} alt="Edit" />
                                      </IconButton>
                                      <IconButton
                                        color="primary"
                                        onClick={async (e) => {
                                          e.stopPropagation();
                                          setOpenDeleteCompetencia2(competencia.id);
                                        }}
                                      >
                                        <img src={Delete} alt="Delete" />
                                      </IconButton>
                                    </ButtonGroup>
                                  </Box>
                                </Box>
                              </Card>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                  <Box
                    sx={{
                      marginTop: '1.5rem',
                      display: 'flex',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      onClick={() => {
                        setDisciplinasCollapse2(!disciplinasCollapse2);
                      }}
                    >
                      <Icon sx={{ height: '33px', textAlign: 'unset' }}>
                        <img src={image3} alt="Perfil" />
                      </Icon>
                      <Typography sx={{ marginLeft: '8px', fontWeight: 'bold' }}>
                        Disciplinas no PPC
                      </Typography>
                      <IconButton sx={{ height: '31px', marginLeft: '8px' }}>
                        {disciplinasCollapse2 ? (
                          <ExpandLess fontSize="small" />
                        ) : (
                          <ExpandMore fontSize="small" />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                  <Collapse in={disciplinasCollapse2}>
                    <Box sx={{ marginTop: '1rem' }}>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          {ppcInfoRender?.semestres.map((semestre) => (
                            <Grid item xs={6} key={semestre.semestre}>
                              <Box sx={{ background: '#F4F4F4', padding: '10px' }}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '1rem',
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: 'bold',
                                      color: 'rgba(2, 5, 96, 0.85)',
                                      fontSize: '1.5rem',
                                    }}
                                  >
                                    Semestre {semestre.semestre}
                                  </Typography>
                                </Box>
                                <Divider sx={{ background: 'rgba(145, 147, 185, 0.34)' }} />
                                <Box>
                                  {semestre.modulos.map((modulo) => (
                                    <Box key={modulo.modulo}>
                                      <Box
                                        sx={{ display: 'flex', justifyContent: 'space-between' }}
                                      >
                                        <BoxStyled>
                                          <Typography
                                            sx={{
                                              marginTop: '0.25rem',
                                              fontWeight: 'bold',
                                              color: '#7678D7',
                                            }}
                                          >
                                            Modulo {modulo.modulo}
                                          </Typography>

                                          <IconButton
                                            onClick={() =>
                                              setOpenCreate2({
                                                semestre: semestre.semestre,
                                                modulo: modulo.modulo,
                                                ppc_id: ppcInfoRender.id,
                                              })
                                            }
                                          >
                                            <AddCircle fontSize="small" sx={{ color: '#7678D7' }} />
                                          </IconButton>
                                        </BoxStyled>
                                        <Box>
                                          <Typography
                                            sx={{
                                              marginTop: '0.25rem',
                                              fontWeight: 'bold',
                                              color: '#7678D7',
                                            }}
                                          >
                                            CH Total
                                          </Typography>
                                        </Box>
                                      </Box>

                                      <Box sx={{ marginLeft: '1rem' }}>
                                        {modulo.disciplinas.map((disciplina) => (
                                          <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            key={disciplina.id}
                                          >
                                            <Typography>{disciplina.name}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                              <Typography>{disciplina.creditos}</Typography>
                                              <IconButton
                                                onClick={async (e) => {
                                                  e.stopPropagation();
                                                  setOpenUpdate2({
                                                    semestre: semestre.semestre,
                                                    modulo: modulo.modulo,
                                                    ppc_id: ppcInfoRender.id,
                                                    ppc_disciplina_versao: disciplina.id,
                                                  });
                                                }}
                                              >
                                                <img src={Edit} alt="Edit" />
                                              </IconButton>
                                              <IconButton
                                                color="primary"
                                                onClick={async (e) => {
                                                  e.stopPropagation();
                                                  setOpenDelete2(disciplina.id);
                                                }}
                                              >
                                                <img src={Delete} alt="Delete" />
                                              </IconButton>
                                            </Box>
                                          </Box>
                                        ))}
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Box>
                  </Collapse>
                </>
              )}
            </Box>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
