import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, Box, Grid, Button, IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MyTextField } from '#shared/components/Form/TextField';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

export type IArea = {
  id: string;
  name: string;
  description: string;
};

type IForm = {
  name: string;
  description: string;
};

const validateForm = yup.object().shape({
  name: yup.string().required('Área precisa ter um nome'),
  description: yup.string().required('Área precisa ter uma descrição'),
});

type ICreateAreaModal = {
  updateListArea: (area: IArea) => void;
  open: boolean;
  onClose: () => void;
};

export function CreateAreaModal({ updateListArea, open, onClose }: ICreateAreaModal) {
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
        const response = await api.post('/areas', {
          name: form.name,
          description: form.description,
        });
        updateListArea(response.data);
        message({ mensagem: 'Área Cadastrada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [updateListArea, message, reset, onClose],
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Cadastrar Área</DialogTitle>
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
                name="name"
                control={control}
                errors={errors.name}
                label="Nome da Área"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                name="description"
                control={control}
                errors={errors.description}
                label="Descrição"
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
