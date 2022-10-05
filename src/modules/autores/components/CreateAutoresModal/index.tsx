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

import { IAutores } from '#modules/autores/pages/ListAutores';

type IForm = {
  primeiroNome: string;
  nomeMeio: string;
  ultimoNome: string;
  quote: string;
  nacionalidade: string;
};

const validateForm = yup.object().shape({
  primeiroNome: yup.string().required('Nome Obrigatório'),
  nomeMeio: yup.string().required('Nome Obrigatório'),
  ultimoNome: yup.string().required('Nome Obrigatório'),
  quote: yup.string().required('Quote Obrigatório'),
  nacionalidade: yup.string().required('Nacionalidade Obrigatória'),
});

type ICreateAutoresModal = {
  updateListAutores: (autor: IAutores) => void;
  open: boolean;
  onClose: () => void;
};

export function CreateAutoresModal({ updateListAutores, open, onClose }: ICreateAutoresModal) {
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
        const response = await api.post('/autores', {
          instituicao_id: instituicao?.id,
          first_name: form.primeiroNome,
          middle_name: form.nomeMeio,
          last_name: form.ultimoNome,
          quote: form.quote,
          nationality: form.nacionalidade,
        });
        updateListAutores(response.data);
        message({ mensagem: 'Versão Cadastrada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [instituicao?.id, updateListAutores, message, reset, onClose],
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Cadastrar Autor</DialogTitle>
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
                name="primeiroNome"
                control={control}
                errors={errors.primeiroNome}
                label="Primeiro Nome"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                name="nomeMeio"
                control={control}
                errors={errors.nomeMeio}
                label="Nome do Meio"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                name="ultimoNome"
                control={control}
                errors={errors.ultimoNome}
                label="Último Nome"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField name="quote" control={control} errors={errors.quote} label="Quote" />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                name="nacionalidade"
                control={control}
                errors={errors.nacionalidade}
                label="Nacionalidade"
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
                Inserir
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Dialog>
  );
}
