import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MyTextField } from '#shared/components/Form/TextField';
import { useInstitution } from '#shared/hooks/institution';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

type ICreateCompetenciaModalPPC = {
  reloadList?: () => void;
  open: boolean;
  onClose: () => void;
  ppc_id: string;
};

type IForm = {
  ppc_id: string;
  competencia: string;
  competenciaNumero: number;
};

const validateForm = yup.object().shape({
  competencia: yup.string().required('Competência precisa ter um nome'),
  competenciaNumero: yup.number().required('Competência precisa ter um número'),
});

export function CreateCompetenciaModalPPC({
  reloadList,
  open,
  onClose,
  ppc_id,
}: ICreateCompetenciaModalPPC) {
  const { message } = useToast();
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
        await api.post('/competencias', {
          instituicao_id: instituicao?.id,
          competencia: form.competencia,
          competenciaNumero: form.competenciaNumero,
          ppc_id,
        });

        if (reloadList) {
          reloadList();
        }
        message({ mensagem: 'Competência Cadastrada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [instituicao?.id, ppc_id, reloadList, message, reset, onClose],
  );

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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>
          Criar Competencia
        </DialogTitle>
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
              <MyTextField
                name="competencia"
                control={control}
                errors={errors.competencia}
                label="Competencia"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                name="competenciaNumero"
                control={control}
                errors={errors.competenciaNumero}
                label="Número da competencia"
                inputProps={{ inputMode: 'numeric' }}
              />
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
      </Box>
    </Dialog>
  );
}
