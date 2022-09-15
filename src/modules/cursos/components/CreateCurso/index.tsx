import { yupResolver } from '@hookform/resolvers/yup';
import { Close } from '@mui/icons-material';
import { Grid, Box, Button, Dialog, DialogTitle, IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormCheckbox } from '#shared/components/Form/CheckBox';
import { MyTextField } from '#shared/components/Form/TextField';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { ICurso } from '#modules/cursos/pages/ListCursos';

type ICreateCursoModal = {
  updateListCursos: (curso: ICurso) => void;
  open: boolean;
  onClose: () => void;
};

type IForm = {
  name: string;
  active: boolean;
};

const validateForm = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
});

export function CreateCursoModal({ updateListCursos, open, onClose }: ICreateCursoModal) {
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
        const response = await api.post('/cursos', { name: form.name, active: form.active });

        updateListCursos(response.data);

        message({ mensagem: 'Curso Cadastrado', tipo: 'success' });

        reset();

        onClose();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [message, onClose, reset, updateListCursos],
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Cadastrar Curso</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        <form onSubmit={handleSubmit(handleCreate)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MyTextField name="name" control={control} errors={errors.name} label="Curso" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormCheckbox name="active" control={control} label="Curso Ativo" />
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
