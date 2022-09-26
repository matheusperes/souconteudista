import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MyTextField } from '#shared/components/Form/TextField';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

type ICreatePerfilModalPPC = {
  reloadList?: () => void;
  open: boolean;
  onClose: () => void;
  ppc_id: string;
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

export function CreatePerfilModalPPC({ reloadList, open, onClose, ppc_id }: ICreatePerfilModalPPC) {
  const { message } = useToast();

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
        await api.post('/perfis', {
          perfil: form.perfil,
          perfilNumero: form.perfilNumero,
          ppc_id,
        });

        if (reloadList) {
          reloadList();
        }
        message({ mensagem: 'Perfil Cadastrado', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [ppc_id, reloadList, message, reset, onClose],
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Criar Perfil</DialogTitle>
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
              <MyTextField name="perfil" control={control} errors={errors.perfil} label="Perfil" />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
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
      </Box>
    </Dialog>
  );
}
