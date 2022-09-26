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

type IUpdatePerfilModal = {
  reloadList?: () => void;
  open: boolean;
  onClose: () => void;
  perfil_id: string;
};

type Perfil = {
  ppc_id: string;
  perfil: string;
  perfilNumero: number;
};

type IForm = {
  ppc_id: string;
  perfil: string;
  perfilNumero: number;
};

const validateForm = yup.object().shape({
  perfil: yup.string().required('Perfil precisa ter um nome'),
  perfilNumero: yup.number().required('Perfil precisa ter um número'),
});

export function UpdatePerfilModal({ reloadList, open, onClose, perfil_id }: IUpdatePerfilModal) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();

  const [data, setData] = useState<Perfil | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(validateForm),
  });

  useEffect(() => {
    async function getPerfil() {
      startLoading();
      try {
        const response = await api.get(`/perfil/${perfil_id}`);
        setData(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getPerfil();
  }, [message, perfil_id, startLoading, stopLoading]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      try {
        await api.put(`/perfis/${perfil_id}`, {
          perfil: form.perfil,
          perfilNumero: form.perfilNumero,
        });

        if (reloadList) {
          reloadList();
        }
        message({ mensagem: 'Perfil Atualizado', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response?.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [perfil_id, reloadList, message, reset, onClose],
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Perfil</DialogTitle>
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
                  defaultValue={data.perfil}
                  name="perfil"
                  control={control}
                  errors={errors.perfil}
                  label="Perfil"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.perfilNumero}
                  name="perfilNumero"
                  control={control}
                  errors={errors.perfilNumero}
                  label="Número do perfil"
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
        )}
      </Box>
    </Dialog>
  );
}
