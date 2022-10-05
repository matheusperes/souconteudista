import { ArrowForward } from '@mui/icons-material';
import { Box, Breadcrumbs, Grid, IconButton, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import DisciplinaIcon from '#shared/images/IconDisciplina.svg';
import { api } from '#shared/services/axios';

import { InfoPpcs } from '#modules/ppcs/pages/ListPpcInfo';
import { toRoman } from '#modules/ppcs/pages/ListPpcInfo/roman';

type DisciplinaCompetencia = {
  id: string;
  ppc_id: string;
  disciplina_versao_id: string;
  modulo: number;
  semestre: number;
  versoes: {
    id: string;
    disciplina_id: string;
    disciplina_versao_nome: string;
    codigo: string;
    credito_quantidade: string;
    ementa: string;
    observacao: string;
    em_oferta: boolean;
    produzido: boolean;
    disciplina: { id: string; name: string; sigla: string; area_id: string };
  };
};

type Versoes = {
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
  versoes: Versoes;
};

type Curso = {
  id: string;
  name: string;
};

export type IPPC = {
  id: string;
  curso_id: string;
  anoVoto: number;
  dataInicio: string;
  dataFim: string;
  horaCredito: number;
  quantSemestres: number;
  curso: Curso;
  ppcDisciplinaVersoes?: DisciplinaAPI[];
};

type ICompetencia = {
  id: string;
  ppc_id: string;
  competencia: string;
  competenciaNumero: string;
  ppc: IPPC;
};

export function FilteredCompetencia() {
  const params = useParams();
  const navigate = useNavigate();
  const { setTitle } = useTitle();
  const { message } = useToast();
  const { startLoading, stopLoading } = useLoading();

  const [competencia, setCompetencia] = useState<ICompetencia>();
  const [disciplinaCompetencia, setDisciplinaCompetencia] = useState<DisciplinaCompetencia[]>([]);
  const [ppc, setPpc] = useState<InfoPpcs>();

  useEffect(() => {
    setTitle('Competências e habilidades');
  }, [setTitle]);

  const getCompetencia = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get(`/competencia/${params?.id}`);
      setCompetencia(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params?.id, startLoading, stopLoading]);

  useEffect(() => {
    getCompetencia();
  }, [getCompetencia]);

  const getDisciplinaCompetencia = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get(`/ppc_disciplina_versao/competencia/${params?.id}`);
      setDisciplinaCompetencia(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params?.id, startLoading, stopLoading]);

  useEffect(() => {
    getDisciplinaCompetencia();
  }, [getDisciplinaCompetencia]);

  const getPpc = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get(`/ppc/${params?.ppc_id}`);
      setPpc(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, params?.ppc_id, startLoading, stopLoading]);

  useEffect(() => {
    getPpc();
  }, [getPpc]);

  return (
    <Box className="Pagina">
      <Box sx={{ mt: '1rem', width: '100%' }}>
        <Box sx={{ padding: '1.5rem' }}>
          <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
            <Link to="/">Home</Link>
            <Link to="/cursos">Cursos</Link>
            {ppc && <Link to={`/cursos/${ppc?.curso.id}/ppcs`}>{ppc?.curso?.name}</Link>}
            {ppc && (
              <Link to={`/cursos/${ppc?.curso.id}/ppcs/${ppc?.id}`}>{`PPC ${ppc?.anoVoto}`}</Link>
            )}
            {ppc && <Typography>Competências</Typography>}
          </Breadcrumbs>
        </Box>
        {competencia && (
          <>
            <Box sx={{ marginTop: '0.5rem', textAlign: 'justify' }}>
              <Box sx={{ background: 'rgba(239, 239, 239, 0.45)', padding: '1.5rem ' }}>
                <Typography>{`${toRoman(Number(competencia?.competenciaNumero))} - ${
                  competencia?.competencia
                }`}</Typography>

                <Typography />
              </Box>
            </Box>
            <Box sx={{ padding: '1rem' }}>
              <Grid container spacing={2}>
                {disciplinaCompetencia.map((versao) => (
                  <Grid
                    item
                    xs={3}
                    key={versao.id}
                    onClick={() =>
                      navigate(
                        `/disciplinas/${versao.versoes.disciplina_id}/versao/${versao.versoes.id}`,
                      )
                    }
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        sx={{
                          cursor: 'default',
                        }}
                      >
                        <img src={DisciplinaIcon} alt="Icon" />
                      </IconButton>
                      <Typography>{versao.versoes.disciplina.name}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
