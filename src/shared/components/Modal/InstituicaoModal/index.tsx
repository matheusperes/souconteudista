import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Box, Button, Dialog, DialogTitle } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MyTextField } from '#shared/components/Form/TextField';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

type IInstituicao = {
  id: string;
  name: string;
};

type IInstituicaoModal = {
  open: boolean;
  onClose: () => void;
  updateDefaultInstituicao: (instituicao: IInstituicao) => void;
};

type IForm = {
  name: string;
  description?: string;
  sigla: string;
  link: string;
};

const validateForm = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
});

export function InstituicaoModal({ open, onClose, updateDefaultInstituicao }: IInstituicaoModal) {
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
          padrao: true,
        });

        updateDefaultInstituicao(response.data);

        message({ mensagem: 'Instituição Cadastrada', tipo: 'success' });

        reset();

        onClose();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [message, onClose, reset, updateDefaultInstituicao],
  );

  return (
    <Dialog open={open}>
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
              <MyTextField name="description" control={control} label="Descrição" multiline />
            </Grid>
            <Grid item xs={12}>
              <MyTextField name="sigla" control={control} label="Sigla" />
            </Grid>
            <Grid item xs={12}>
              <MyTextField name="link" control={control} label="Link" multiline />
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
