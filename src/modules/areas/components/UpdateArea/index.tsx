import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useEffect, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { MyTextField } from '#shared/components/Form/TextField';
import { useInstitution } from '#shared/hooks/institution';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { IArea } from '../CreateArea';

type IUpdateAreaModal = {
  open: boolean;
  onClose: () => void;
  area_id: string;
  reloadList?: () => void;
};

type IForm = {
  name: string;
  description: string;
};

const validateForm = yup.object().shape({
  name: yup.string().required('Área precisa ter um nome'),
  description: yup.string().required('Área precisa ter uma descrição'),
});

export function UpdateAreaModal({ open, onClose, area_id, reloadList }: IUpdateAreaModal) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();
  const { instituicao } = useInstitution();

  const [data, setData] = useState<IArea | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(validateForm),
  });

  useEffect(() => {
    async function getArea() {
      startLoading();
      try {
        const response = await api.get(`/area/${area_id}`);
        setData(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getArea();
  }, [area_id, message, startLoading, stopLoading]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      try {
        await api.put(`/areas/${area_id}`, {
          instituicao_id: instituicao?.id,
          name: form.name,
          description: form.description,
        });

        if (reloadList) {
          reloadList();
        }
        message({ mensagem: 'Disciplina Atualizada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response?.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [area_id, instituicao?.id, reloadList, message, reset, onClose],
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Área</DialogTitle>
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
                  defaultValue={data.name}
                  name="name"
                  control={control}
                  errors={errors.name}
                  label="Nome da Área"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.description}
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
        )}
      </Box>
    </Dialog>
  );
}
