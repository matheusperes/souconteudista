import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, Box, Grid, Button, IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormCheckbox } from '#shared/components/Form/CheckBox';
import { MyTextField } from '#shared/components/Form/TextField';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { IInstituicoes } from '#modules/instituicoes/pages/ListInstituicoes';

type IForm = {
  name: string;
  sigla: string;
  description: string;
  link: string;
  padrao: boolean;
};

const validateForm = yup.object().shape({
  name: yup.string().required('Instituição precisa ter um nome'),
  description: yup.string().required('Instituição precisa ter uma descrição'),
  sigla: yup.string().required('Instituição precisa ter uma sigla'),
  link: yup.string().required('Instituição precisa ter um link'),
});

type ICreateInstituicaoModal = {
  updateListInstituicao: (instituicao: IInstituicoes) => void;
  open: boolean;
  onClose: () => void;
};

export function CreateInstituicaoModal({
  updateListInstituicao,
  open,
  onClose,
}: ICreateInstituicaoModal) {
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
        const response = await api.post('/instituicoes', {
          name: form.name,
          description: form.description,
          sigla: form.sigla,
          link: form.link,
          padrao: form.padrao,
        });
        updateListInstituicao(response.data);
        message({ mensagem: 'Instituição Cadastrada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [updateListInstituicao, message, reset, onClose],
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
          Cadastrar Instituição
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
                name="name"
                control={control}
                errors={errors.name}
                label="Nome da Instituição"
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
            <Grid item xs={12}>
              <MyTextField name="sigla" control={control} errors={errors.sigla} label="Sigla" />
            </Grid>
            <Grid item xs={12}>
              <MyTextField name="link" control={control} errors={errors.link} label="Link" />
            </Grid>
            <Grid item xs={6}>
              <FormCheckbox name="padrao" control={control} label="Instituição Padrão" />
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
