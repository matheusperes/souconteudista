import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  Box,
  DialogTitle,
  IconButton,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { FormSelect } from '#shared/components/Form/FormSelect';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

type ICreateDisciplinaPPC = {
  open: boolean;
  semestre: number;
  modulo: number;
  ppc_id: string;
  onClose: () => void;
  reloadList?: () => void;
  instituicao_Id: string | undefined;
};

type Disciplinas = {
  id: string;
  name: string;
  area_id: string;
  sigla: string;
};

type DisciplinasOption = {
  id: string;
  label: string;
};

type Versoes = {
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

type IForm = {
  competencia: Array<{ id: string; label: string }>;
  perfil: Array<{ id: string; label: string }>;
  versao: { id: string; label: string };
};

export function CreateDisciplinaPPC({
  open,
  onClose,
  ppc_id,
  semestre,
  modulo,
  reloadList,
  instituicao_Id,
}: ICreateDisciplinaPPC) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();

  const { handleSubmit, control, reset } = useForm<IForm>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams();
  const [competencias, setCompetencias] = useState<Competencias[]>([]);
  const [perfis, setPerfis] = useState<Perfils[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplinas[]>([]);
  const [disciplinaId, setDisciplinaId] = useState<DisciplinasOption | null>(null);
  const [versao, setVersao] = useState<Versoes[]>([]);
  // const [versaoId, setVersaoId] = useState<VersaosOption | null>(null);
  const [versaoRender, setVersaoRender] = useState<Versoes | null>(null);

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSelectVersion = useCallback(
    async (newVersaoId?: string) => {
      if (newVersaoId) {
        try {
          const response = await api.get(`/versao/${newVersaoId}`, {
            params: { instituicao_id: instituicao_Id },
          });

          setVersaoRender(response.data);
        } catch (error: any) {
          message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
        } finally {
          stopLoading();
        }
      } else {
        setVersaoRender(null);
      }
    },
    [instituicao_Id, message, stopLoading],
  );

  const handleCreate = useCallback(
    async (form: IForm) => {
      const competencias_id = form.competencia?.map((competencia2) => {
        return competencia2.id;
      });
      const perfis_id = form.perfil?.map((perfil) => {
        return perfil.id;
      });
      try {
        await api.post('/ppc_disciplina_versao', {
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
        setDisciplinaId(null);
        message({ mensagem: 'Disciplina Cadastrada', tipo: 'success' });
        onClose();
        reset();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [instituicao_Id, ppc_id, modulo, semestre, reloadList, message, onClose, reset],
  );

  return (
    <Dialog onClose={onClose} open={open} /* sx={{ left: '-40%' }} */>
      <Box
        sx={{
          display: 'flex',
          align: 'center',
          borderBottom: '1px solid #333',
          background: '#020560',
        }}
      >
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Inserir Vers??o</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        <form onSubmit={handleSubmit(handleCreate)} noValidate>
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
                control={control}
                name="versao"
                label="Vers??o"
                options={VersaoOption}
                optionLabel="label"
                optionValue="id"
              />
              {/* <Autocomplete
                fullWidth
                value={versaoId}
                onChange={(event: any, newValue) => {
                  setVersaoId(newValue);

                  handleSelectVersion(newValue?.id);
                }}
                disablePortal
                id="combo-box-demo"
                options={VersaoOption}
                renderInput={(params1) => <TextField {...params1} label="Versao" fullWidth />}
              /> */}
            </Grid>
            {versaoRender && (
              <Dialog
                onClose={() => setVersaoRender(null)}
                open={!!versaoRender}
                /* sx={{ left: '40%' }} */
              >
                <Box
                  sx={{
                    display: 'flex',
                    align: 'center',
                    borderBottom: '1px solid #333',
                    background: '#020560',
                    color: '#E5E5E5',
                  }}
                >
                  <DialogTitle>Detalhes da Vers??o</DialogTitle>
                  <IconButton
                    color="primary"
                    sx={{ marginLeft: 'auto', color: '#E5E5E5', padding: '1rem' }}
                    onClick={() => setVersaoRender(null)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box>
                  <Box>
                    <Grid container spacing={2} sx={{ padding: '1rem' }}>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: '1rem', color: '#7678D7', fontWeight: 'bold' }}>
                          Disciplina
                        </Typography>
                        <Typography>{versaoRender.disciplina.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: '1rem', color: '#7678D7', fontWeight: 'bold' }}>
                          Vers??o
                        </Typography>
                        <Typography>{versaoRender.disciplina_versao_nome}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: '1rem', color: '#7678D7', fontWeight: 'bold' }}>
                          C??digo
                        </Typography>
                        <Typography>{versaoRender.codigo}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: '1rem', color: '#7678D7', fontWeight: 'bold' }}>
                          Creditos
                        </Typography>
                        <Typography>{versaoRender.credito_quantidade} Cr??ditos</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography sx={{ fontSize: '1rem', color: '#7678D7', fontWeight: 'bold' }}>
                          Ementa
                        </Typography>
                        <Typography sx={{ textAlign: 'justify' }}>{versaoRender.ementa}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography sx={{ fontSize: '1rem', color: '#7678D7', fontWeight: 'bold' }}>
                          Observa????o
                        </Typography>
                        <Typography>{versaoRender.observacao}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Dialog>
            )}
            <Grid item xs={12}>
              <FormSelect
                control={control}
                name="competencia"
                label="Competencias"
                options={CompetenciaOption}
                optionLabel="label"
                optionValue="id"
                multiple
              />
              {/* <Autocomplete
              fullWidth
              multiple
              id="checkboxes-tags-demo"
              options={CompetenciaOption}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params1) => <TextField {...params1} label="Competencias" />}
            /> */}
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                control={control}
                name="perfil"
                label="Perfil"
                options={PerfilOption}
                optionLabel="label"
                optionValue="id"
                multiple
              />
              {/* <Autocomplete
                fullWidth
                multiple
                id="checkboxes-tags-demo"
                options={PerfilOption}
                disableCloseOnSelect
                getOptionLabel={(option) => option.label}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                )}
                renderInput={(params1) => <TextField {...params1} label="Perfil" />}
              /> */}
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
                  Inserir
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Dialog>
  );
}
