import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button, Container } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FormCheckbox } from '#shared/components/Form/CheckBox';
import { MyTextField } from '#shared/components/Form/TextField';
import { useInstitution } from '#shared/hooks/institution';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { Ppc } from '#modules/ppcs/pages/ListPpcsCurso';

type ICreateFilteredPpcModal = {
  updateListPpcs: (ppc: Ppc) => void;
  open: boolean;
  onClose: () => void;
};

type IForm = {
  anoVoto: number;
  dataInicio: string;
  dataFim: string;
  horaCredito: number;
  quantSemestres: number;
  active: boolean;
  ppc_ativo: boolean;
};

const validateForm = yup.object().shape({
  anoVoto: yup.number().required('Ano Obrigatório'),
  dataInicio: yup.string().required('Data Obrigatória'),
  dataFim: yup.string().required('Data Obrigatória'),
  quantSemestres: yup.number().required('Quantidade de Semestres Obrigatório'),
  horaCredito: yup.number().required('Quantidade de Créditos Obrigatório'),
});

export function CreateFilteredPpcModal({ updateListPpcs, open, onClose }: ICreateFilteredPpcModal) {
  const { message } = useToast();
  const params = useParams();
  const { instituicao } = useInstitution();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(validateForm),
  });

  const handleCreate = useCallback(
    async (form: IForm) => {
      try {
        if (params?.curso_id !== null) {
          const response = await api.post('/ppcs', {
            instituicao_id: instituicao?.id,
            curso_id: params.curso_id,
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
          updateListPpcs(response.data);
          message({ mensagem: 'PPC Cadastrado', tipo: 'success' });
          reset();
          onClose();
        }
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [params.curso_id, instituicao?.id, updateListPpcs, message, reset, onClose],
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Cadastrar PPC</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Container sx={{ marginTop: '1rem' }}>
        <form onSubmit={handleSubmit(handleCreate)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MyTextField
                name="anoVoto"
                control={control}
                errors={errors.anoVoto}
                label="Ano Voto"
                inputProps={{ inputMode: 'numeric' }}
              />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                name="dataInicio"
                control={control}
                errors={errors.dataInicio}
                label="Data de Inicio"
              />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                name="dataFim"
                control={control}
                errors={errors.dataFim}
                label="Data de Fim"
              />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                name="horaCredito"
                control={control}
                errors={errors.horaCredito}
                label="Horas/Créditos"
                inputProps={{ inputMode: 'numeric' }}
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                name="quantSemestres"
                control={control}
                errors={errors.quantSemestres}
                label="Quantidade de Semestres"
                inputProps={{ inputMode: 'numeric' }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormCheckbox name="ppc_ativo" control={control} label="PPC Ativo" />
            </Grid>
            <Grid item xs={6}>
              <FormCheckbox name="active" control={control} label="PPC Atual" />
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: '1rem' }}>
              <Button
                sx={{
                  background: '#0b0f79',
                  color: '#E5E5E5',
                  '&:hover': { background: '#020560' },
                }}
                fullWidth
                variant="contained"
                type="submit"
              >
                Inserir
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Dialog>
  );
}
