import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MyTextField } from '#shared/components/Form/TextField';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

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

type Autores = {
  first_name: string;
  middle_name: string;
  last_name: string;
  quote: string;
  nationality: string;
};

type IUpdateAutorModal = {
  open: boolean;
  onClose: () => void;
  autor_id: string;
  reloadList?: () => void;
};

export function UpdateAutorModal({ open, onClose, autor_id, reloadList }: IUpdateAutorModal) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(validateForm),
  });

  const [data, setData] = useState<Autores | null>(null);

  useEffect(() => {
    async function getAutor() {
      startLoading();
      try {
        const response = await api.get(`/autor/${autor_id}`);
        setData(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getAutor();
  }, [autor_id, message, startLoading, stopLoading]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      try {
        await api.put(`/autores/${autor_id}`, {
          first_name: form.primeiroNome,
          middle_name: form.nomeMeio,
          last_name: form.ultimoNome,
          quote: form.quote,
          nationality: form.nacionalidade,
        });

        if (reloadList) {
          reloadList();
        }
        onClose();
        message({ mensagem: 'Autor Atualizado', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response?.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [autor_id, reloadList, onClose, message, reset],
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Autor</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        <form onSubmit={handleSubmit(handleUpdate)} noValidate>
          {data && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.first_name}
                  name="primeiroNome"
                  control={control}
                  errors={errors.primeiroNome}
                  label="Primeiro Nome"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.middle_name}
                  name="nomeMeio"
                  control={control}
                  errors={errors.nomeMeio}
                  label="Nome do Meio"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.last_name}
                  name="ultimoNome"
                  control={control}
                  errors={errors.ultimoNome}
                  label="Último Nome"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.quote}
                  name="quote"
                  control={control}
                  errors={errors.quote}
                  label="Quote"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.nationality}
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
                  Atualizar
                </Button>
              </Grid>
            </Grid>
          )}
        </form>
      </Box>
    </Dialog>
  );
}
