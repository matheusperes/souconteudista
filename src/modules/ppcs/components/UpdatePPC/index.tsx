import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormCheckbox } from '#shared/components/Form/CheckBox';
import { FormSelect } from '#shared/components/Form/FormSelect';
import { MyTextField } from '#shared/components/Form/TextField';
import { useInstitution } from '#shared/hooks/institution';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { Ppc } from '#modules/ppcs/pages/ListPpcsCurso';

type ICursoAPI = {
  id: string;
  name: string;
  active: boolean;
  ppc_ativo: string;
  ppcs: [
    {
      id: string;
      curso_id: string;
      anoVoto: number;
      dataInicio: string;
      dataFim: string;
      horaCredito: number;
      quantSemestres: number;
      ppc_ativo: boolean;
    },
  ];
};

type Curso = {
  id: string;
  name: string;
};

type IUpdatePpcModal = {
  open: boolean;
  onClose: () => void;
  ppc_id: string;
  curso_id?: string;
  reloadList?: () => void;
};

type CursoForm = {
  id: string;
  name: string;
};

type IForm = {
  anoVoto: number;
  dataInicio: string;
  dataFim: string;
  horaCredito: number;
  quantSemestres: number;
  active: boolean;
  ppc_ativo: boolean;
  curso: CursoForm;
};

const validateForm = yup.object().shape({
  anoVoto: yup.number().required('Ano Obrigatório'),
  dataInicio: yup.string().required('Data Obrigatória'),
  dataFim: yup.string().required('Data Obrigatória'),
  quantSemestres: yup.number().required('Quantidade de Semestres Obrigatório'),
  horaCredito: yup.number().required('Quantidade de Créditos Obrigatório'),
});

export function UpdatePpcModal({ open, onClose, ppc_id, reloadList, curso_id }: IUpdatePpcModal) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();
  const { instituicao } = useInstitution();

  const [data, setData] = useState<Ppc | null>(null);
  const [curso, setCurso] = useState<ICursoAPI | null>(null);

  const [cursos, setCursos] = useState<Curso[]>([]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(validateForm),
  });

  useEffect(() => {
    async function getCursos() {
      startLoading();
      try {
        const response = await api.get('/cursos', {
          params: { instituicao_id: instituicao?.id },
        });
        setCursos(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getCursos();
  }, [instituicao?.id, message, startLoading, stopLoading]);

  useEffect(() => {
    async function getCurso() {
      startLoading();
      try {
        const response = await api.get(`/curso/${curso_id}`);
        setCurso(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }
    getCurso();
  }, [curso_id, message, ppc_id, startLoading, stopLoading]);

  useEffect(() => {
    async function getPpc() {
      startLoading();
      try {
        const response = await api.get(`/ppc/${ppc_id}`);
        setData(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }
    getPpc();
  }, [message, ppc_id, startLoading, stopLoading]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      try {
        await api.put(`/ppcs/${ppc_id}`, {
          instituicao_id: instituicao?.id,
          curso_id: form.curso.id,
          anoVoto: form.anoVoto,
          dataInicio: form.dataInicio,
          dataFim: form.dataFim,
          horaCredito: form.horaCredito,
          quantSemestres: form.quantSemestres,
          active: form.active,
          ppc_ativo: form.ppc_ativo,
          competencias: [],
          perfis: [],
        });

        if (reloadList) {
          reloadList();
        }
        message({ mensagem: 'PPC Atualizado', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response?.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [ppc_id, instituicao?.id, reloadList, message, reset, onClose],
  );

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <Box
        sx={{
          display: 'flex',
          align: 'center',
          borderBottom: '1px solid #333',
          background: '#020560',
        }}
      >
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Update PPC</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ marginTop: '1rem', padding: '1rem' }}>
        {data && curso && (
          <form onSubmit={handleSubmit(handleUpdate)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.anoVoto}
                  name="anoVoto"
                  control={control}
                  errors={errors.anoVoto}
                  label="Ano Voto"
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.dataInicio}
                  name="dataInicio"
                  control={control}
                  errors={errors.dataInicio}
                  label="Data de Inicio"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.dataFim}
                  name="dataFim"
                  control={control}
                  errors={errors.dataFim}
                  label="Data de Fim"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.horaCredito}
                  name="horaCredito"
                  control={control}
                  errors={errors.horaCredito}
                  label="Horas/Créditos"
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.quantSemestres}
                  name="quantSemestres"
                  control={control}
                  errors={errors.quantSemestres}
                  label="Quantidade de Semestres"
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormSelect
                  defaultValue={data.curso}
                  name="curso"
                  control={control}
                  options={cursos}
                  optionLabel="name"
                  optionValue="id"
                  label="Curso"
                />
              </Grid>
              <Grid item xs={6}>
                <FormCheckbox
                  name="ppc_ativo"
                  control={control}
                  defaultValue={data.ppc_ativo}
                  label="PPC Ativo"
                />
              </Grid>
              <Grid item xs={6}>
                <FormCheckbox
                  name="active"
                  control={control}
                  defaultValue={curso.ppc_ativo === data.id}
                  label="PPC Atual"
                />
              </Grid>

              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Dialog>
  );
}
