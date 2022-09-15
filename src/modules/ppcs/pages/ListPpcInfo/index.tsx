import { AddCircle, ArrowForward, ExpandLess, ExpandMore, Search } from '@mui/icons-material';
import {
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
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useTitle } from '#shared/hooks/title';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import image1 from '#shared/images/image1.svg';
import image2 from '#shared/images/image2.svg';
import image3 from '#shared/images/image3.svg';
import { api } from '#shared/services/axios';

import { CreateCompetenciaModalPPC } from '#modules/competencias/components/CreateCompetenciaModalPPC';
import { UpdateCompetenciaModal } from '#modules/competencias/components/UpdateCompetenciaModal';
import { CreateDisciplinaPPC } from '#modules/disciplinas/components/CreateDisciplinaPPC';
import { CreatePerfilModalPPC } from '#modules/perfis/components/CreatePerfilModalPPC';
import { UpdatePerfilModal } from '#modules/perfis/components/UpdatePerfilModal';

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

type DisciplinaAPI = {
  id: string;
  modulo: number;
  semestre: number;
  created_at: string;
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
} | null;

export function InfoPpcs() {
  const { setTitle } = useTitle();
  const params = useParams();
  const navigate = useNavigate();

  const [openCreateCompetencia, setOpenCreateCompetencia] = useState(false);
  const [openUpdateCompetencia, setOpenUpdateCompetencia] = useState<string | null>(null);

  const [openCreatePerfil, setOpenCreatePerfil] = useState(false);
  const [openUpdatePerfil, setOpenUpdatePerfil] = useState<string | null>(null);

  const [openCreate, setOpenCreate] = useState<IModalVersao>(null);

  const [perfilCollapse, setPerfilCollapse] = useState(false);
  const [competenciaCollapse, setCompetenciaCollapse] = useState(false);
  const [disciplinasCollapse, setDisciplinasCollapse] = useState(false);

  const [ppc, setPpc] = useState<InfoPpcs>();

  useEffect(() => {
    setTitle(`PPC ${ppc?.anoVoto}` || '');
  }, [ppc?.anoVoto, ppc?.curso.name, setTitle]);

  const getPpc = useCallback(async () => {
    const response = await api.get(`/ppc/${params?.id}`);

    setPpc(response.data);
  }, [params?.id]);

  useEffect(() => {
    getPpc();
  }, [getPpc]);

  const ppcInfo = useMemo(() => {
    if (!ppc) {
      return null;
    }
    return {
      ...ppc,
      semestres: getSemestres(ppc),
    };
  }, [ppc]);

  return (
    <>
      {!!openCreate && (
        <CreateDisciplinaPPC
          open={!!openCreate}
          onClose={() => setOpenCreate(null)}
          ppc_id={openCreate.ppc_id}
          modulo={openCreate.modulo}
          semestre={openCreate.semestre}
          reloadList={() => getPpc()}
        />
      )}
      <CreateCompetenciaModalPPC
        open={openCreateCompetencia}
        onClose={() => setOpenCreateCompetencia(false)}
        ppc_id={ppcInfo?.id || ''}
        reloadList={() => getPpc()}
      />
      <CreatePerfilModalPPC
        open={openCreatePerfil}
        onClose={() => setOpenCreatePerfil(false)}
        ppc_id={ppcInfo?.id || ''}
        reloadList={() => getPpc()}
      />
      {!!openUpdateCompetencia && (
        <UpdateCompetenciaModal
          open={!!openUpdateCompetencia}
          onClose={() => setOpenUpdateCompetencia(null)}
          competencia_id={openUpdateCompetencia}
          reloadList={() => getPpc()}
        />
      )}
      {!!openUpdatePerfil && (
        <UpdatePerfilModal
          open={!!openUpdatePerfil}
          onClose={() => setOpenUpdatePerfil(null)}
          perfil_id={openUpdatePerfil}
          reloadList={() => getPpc()}
        />
      )}
      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Link to="/cursos">Cursos</Link>
              <Link to={`/cursos/${ppc?.curso.id}/ppcs`}>{ppc?.curso.name}</Link>
              <Typography>{`PPC ${ppc?.anoVoto}`}</Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>{ppc?.curso.name}</Typography>
          </Box>
          <Box sx={{ marginTop: '0.375rem' }}>
            <Typography sx={{ fontSize: '1rem' }}>{`PPC ${ppc?.anoVoto}`}</Typography>
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
            <Typography>{`Ano Voto: ${ppc?.anoVoto}`}</Typography>
            <Typography>{`Ano Inicio: ${ppc?.dataInicio}`}</Typography>
            <Typography>{`Ano Final: ${ppc?.dataFim}`}</Typography>
            <Typography>{`Horas/Créditos: ${ppc?.horaCredito}`}</Typography>
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
                {perfilCollapse ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
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
                  {ppcInfo?.perfis?.map((perfil) => (
                    <Box sx={{ marginTop: '0.5rem' }}>
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
                            <Typography>{perfil.perfilNumero}</Typography>
                          </CardContent>
                        </Box>
                        <Divider orientation="vertical" flexItem variant="middle" />
                        <Box sx={{ width: '100%' }}>
                          <CardContent sx={{ justifyContent: 'center', paddingBottom: '0' }}>
                            <Typography sx={{ textAlign: 'justify' }}>{perfil.perfil}</Typography>
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
                                  try {
                                    await api.delete(`/perfis/${perfil.id}`);
                                    getPpc();
                                  } catch {
                                    alert('Isso não deu certo');
                                  }
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
                  {ppcInfo?.competencias?.map((competencia) => (
                    <Box sx={{ marginTop: '0.5rem' }}>
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
                            <Typography>{competencia.competenciaNumero}</Typography>
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
                                  try {
                                    await api.delete(`/competencias/${competencia.id}`);
                                    getPpc();
                                  } catch {
                                    alert('Isso não deu certo');
                                  }
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
                            <Box>
                              <Box display="flex" alignItems="center">
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
                              </Box>

                              <Box sx={{ marginLeft: '1rem' }}>
                                {modulo.disciplinas.map((disciplina) => (
                                  <Box display="flex" alignItems="center">
                                    <Typography>
                                      {disciplina.name} - {disciplina.creditos} créditos
                                    </Typography>
                                    <IconButton
                                      color="primary"
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        try {
                                          await api.delete(
                                            `/ppc_disciplina_versao/${disciplina.id}`,
                                          );
                                          getPpc();
                                        } catch {
                                          alert('Isso não deu certo');
                                        }
                                      }}
                                    >
                                      <img src={Delete} alt="Delete" />
                                    </IconButton>
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
        </Box>
      </Box>
    </>
  );
}
