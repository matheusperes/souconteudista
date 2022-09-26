import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MyTextField } from '#shared/components/Form/TextField';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

type IUpdateCompetenciaModal = {
  reloadList?: () => void;
  open: boolean;
  onClose: () => void;
  competencia_id: string;
};

type Competencia = {
  ppc_id: string;
  competencia: string;
  competenciaNumero: number;
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

export function UpdateCompetenciaModal({
  reloadList,
  open,
  onClose,
  competencia_id,
}: IUpdateCompetenciaModal) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();

  const [data, setData] = useState<Competencia | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(validateForm),
  });

  useEffect(() => {
    async function getCompetencia() {
      startLoading();
      try {
        const response = await api.get(`/competencia/${competencia_id}`);
        setData(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }
    getCompetencia();
  }, [competencia_id, message, startLoading, stopLoading]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      try {
        await api.put(`/competencias/${competencia_id}`, {
          competencia: form.competencia,
          competenciaNumero: form.competenciaNumero,
        });

        if (reloadList) {
          reloadList();
        }
        message({ mensagem: 'Competência Atualizada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response?.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [competencia_id, reloadList, message, reset, onClose],
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
          Editar Competencia
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
        {data && (
          <form onSubmit={handleSubmit(handleUpdate)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MyTextField
                  name="competencia"
                  defaultValue={data.competencia}
                  control={control}
                  errors={errors.competencia}
                  label="Competencia"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  multiline
                  defaultValue={data.competenciaNumero}
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
