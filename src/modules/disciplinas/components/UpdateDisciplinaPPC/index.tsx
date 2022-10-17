import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  Box,
  DialogTitle,
  IconButton,
  Grid,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormSelect } from '#shared/components/Form/FormSelect';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { Ppc } from '#modules/ppcs/pages/ListPpcsCurso';
import { Versoes } from '#modules/versoes/pages/FilteredVersao';

type CompetenciasAPI = {
  id: string;
  ppc_id: string;
  competencia: string;
  competenciaNumero: number;
};

type Disciplinas = {
  id: string;
  name: string;
  area_id: string;
  sigla: string;
};

type PerfisAPI = {
  id: string;
  ppc_id: string;
  perfil: string;
  perfilNumero: number;
};

type Versao = {
  id: string;
  codigo: string;
  credito_quantidade: number;
  disciplina: Disciplinas;
  disciplina_id: string;
  disciplina_versao_nome: string;
  em_oferta: boolean;
  ementa: string;
  observacao: string;
  produzido: boolean;
};

type VersoesAPI = {
  id: string;
  competencias: CompetenciasAPI[];
  disciplina_versao_id: string;
  instituicao_id: string;
  modulo: number;
  perfis: PerfisAPI[];
  ppc: Ppc;
  ppc_id: string;
  semestre: number;
  versao: Versao;
};

type IUpdateDisciplinaPPC = {
  open: boolean;
  semestre: number;
  modulo: number;
  ppc_id: string;
  ppc_disciplina_versao: string;
  onClose: () => void;
  reloadList?: () => void;
  instituicao_Id: string | undefined;
};

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

type DisciplinasOption = {
  id: string;
  label: string;
};

type IForm = {
  competencia: Array<{ id: string; label: string }>;
  perfil: Array<{ id: string; label: string }>;
  versao: { id: string; label: string };
};

export function UpdateDisciplinaPPC({
  open,
  onClose,
  ppc_disciplina_versao,
  ppc_id,
  semestre,
  modulo,
  reloadList,
  instituicao_Id,
}: IUpdateDisciplinaPPC) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();

  const { handleSubmit, control, reset } = useForm<IForm>();

  const [competencias, setCompetencias] = useState<Competencias[]>([]);
  const [perfis, setPerfis] = useState<Perfils[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplinas[]>([]);
  const [disciplinaId, setDisciplinaId] = useState<DisciplinasOption | null>(null);
  const [versao, setVersao] = useState<Versoes[]>([]);

  const [data, setData] = useState<VersoesAPI | null>(null);

  useEffect(() => {
    async function getPPCDisciplinaVersao() {
      startLoading();
      try {
        const response = await api.get(`/ppc_disciplina_versao/${ppc_disciplina_versao}`, {
          params: { instituicao_id: instituicao_Id },
        });
        setData(response.data);
        setDisciplinaId(response.data.versao.disciplina.name);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getPPCDisciplinaVersao();
  }, [instituicao_Id, message, ppc_disciplina_versao, startLoading, stopLoading]);

  useEffect(() => {
    async function getCompetencia() {
      startLoading();
      try {
        const response = await api.get(`/ppc/${ppc_id}`, {
          params: { instituicao_id: instituicao_Id },
        });
        setCompetencias(response.data.competencias);
        setPerfis(response.data.perfis);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getCompetencia();
  }, [instituicao_Id, message, ppc_id, startLoading, stopLoading]);

  const CompetenciaOption = useMemo(() => {
    return competencias?.map((competencia1) => {
      return {
        id: competencia1.id,
        label: String(competencia1.competenciaNumero),
      };
    });
  }, [competencias]);

  const PerfilOption = useMemo(() => {
    return perfis.map((perfil1) => {
      return {
        id: perfil1.id,
        label: String(perfil1.perfilNumero),
      };
    });
  }, [perfis]);

  useEffect(() => {
    async function getDisciplinas() {
      startLoading();
      try {
        const response = await api.get('/disciplinas', {
          params: { instituicao_id: instituicao_Id },
        });

        setDisciplinas(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getDisciplinas();
  }, [instituicao_Id, message, startLoading, stopLoading]);

  const DisciplinaOption = useMemo(() => {
    return disciplinas.map((disciplina_1) => {
      return {
        id: disciplina_1.id,
        label: disciplina_1.name,
      };
    });
  }, [disciplinas]);

  useEffect(() => {
    async function getVersao() {
      startLoading();
      try {
        if (disciplinaId !== null) {
          const response = await api.get('/versoes', {
            params: { disciplina_id: disciplinaId.id, instituicao_id: instituicao_Id },
          });

          setVersao(response.data);
        }
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getVersao();
  }, [disciplinaId, disciplinaId?.id, instituicao_Id, message, startLoading, stopLoading]);

  const VersaoOption = useMemo(() => {
    return versao.map((versao_1) => {
      return {
        id: versao_1.id,
        label: versao_1.disciplina_versao_nome,
      };
    });
  }, [versao]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      const competencias_id = form.competencia?.map((competencia2) => {
        return competencia2.id;
      });
      const perfis_id = form.perfil?.map((perfil) => {
        return perfil.id;
      });
      try {
        await api.put(`/ppc_disciplina_versao/${ppc_disciplina_versao}`, {
          instituicao_id: instituicao_Id,
          ppc_id,
          modulo,
          semestre,
          competencias_id,
          perfis_id,
          disciplina_versao_id: form.versao.id,
        });

        if (reloadList) {
          reloadList();
        }
        message({ mensagem: 'Versão Atualizada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response?.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [
      instituicao_Id,
      message,
      modulo,
      onClose,
      ppc_disciplina_versao,
      ppc_id,
      reloadList,
      reset,
      semestre,
    ],
  );

  const ApiVersao = useMemo(() => {
    return {
      id: data?.versao.id,
      label: data?.versao.disciplina_versao_nome,
    };
  }, [data?.versao.disciplina_versao_nome, data?.versao.id]);

  const ApiCompetencia = useMemo(() => {
    return data?.competencias.map((comp) => {
      return {
        id: comp.id,
        label: String(comp.competenciaNumero),
      };
    });
  }, [data?.competencias]);

  const ApiPerfil = useMemo(() => {
    return data?.perfis.map((perf) => {
      return {
        id: perf.id,
        label: String(perf.perfilNumero),
      };
    });
  }, [data?.perfis]);

  return (
    <Dialog onClose={onClose} open={open}>
      <Box
        sx={{
          display: 'flex',
          align: 'center',
          borderBottom: '1px solid #333',
          background: '#020560',
        }}
      >
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Versão</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        {data && (
          <form onSubmit={handleSubmit(handleUpdate)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  value={disciplinaId}
                  onChange={(event: any, newValue) => {
                    setDisciplinaId(newValue);
                  }}
                  disablePortal
                  id="combo-box-demo"
                  options={DisciplinaOption}
                  renderInput={(params1) => <TextField {...params1} label="Disciplina" fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormSelect
                  defaultValue={ApiVersao}
                  control={control}
                  name="versao"
                  label="Versão"
                  options={VersaoOption}
                  optionLabel="label"
                  optionValue="id"
                />
              </Grid>

              <Grid item xs={12}>
                <FormSelect
                  defaultValue={ApiCompetencia}
                  control={control}
                  name="competencia"
                  label="Competencia"
                  options={CompetenciaOption}
                  optionLabel="label"
                  optionValue="id"
                  multiple
                />
              </Grid>
              <Grid item xs={12}>
                <FormSelect
                  defaultValue={ApiPerfil}
                  control={control}
                  name="perfil"
                  label="Perfil"
                  options={PerfilOption}
                  optionLabel="label"
                  optionValue="id"
                  multiple
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" marginBottom="1rem">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      background: '#020560',
                      color: '#E5E5E5',
                      '&:hover': { background: '#020560' },
                    }}
                  >
                    Atualizar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Dialog>
  );
}
