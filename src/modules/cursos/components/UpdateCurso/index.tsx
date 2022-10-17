import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormCheckbox } from '#shared/components/Form/CheckBox';
import { MyTextField } from '#shared/components/Form/TextField';
import { useInstitution } from '#shared/hooks/institution';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

type UpdateCursoModal = {
  open: boolean;
  onClose: () => void;
  curso_id: string;
  reloadList?: () => void;
};

type IForm = {
  name: string;
  active: boolean;
};

type ICursoApi = {
  id: string;
  name: string;
  active: boolean;
};

const validateForm = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
});

export function UpdateCursoModal({ open, onClose, curso_id, reloadList }: UpdateCursoModal) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();
  const { instituicao } = useInstitution();

  const [data, setData] = useState<ICursoApi | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(validateForm),
  });

  useEffect(() => {
    async function getCurso() {
      startLoading();
      try {
        const response = await api.get(`/curso/${curso_id}`, {
          params: { instituicao_id: instituicao?.id },
        });

        setData(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getCurso();
  }, [curso_id, instituicao?.id, message, startLoading, stopLoading]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      try {
        await api.put(`/cursos/${curso_id}`, {
          instituicao_id: instituicao?.id,
          name: form.name,
          active: form.active,
        });

        if (reloadList) {
          reloadList();
        }

        message({ mensagem: 'Curso Atualizado', tipo: 'success' });

        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [curso_id, instituicao?.id, reloadList, message, reset, onClose],
  );

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs" fullWidth>
      <Box
        sx={{
          display: 'flex',
          align: 'center',
          borderBottom: '1px solid #333',
          background: '#020560',
        }}
      >
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Curso</DialogTitle>
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
                  name="name"
                  defaultValue={data.name}
                  control={control}
                  errors={errors.name}
                  label="Curso"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormCheckbox
                  name="active"
                  defaultValue={data.active}
                  control={control}
                  label="Curso Ativo"
                />
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
        )}
      </Box>
    </Dialog>
  );
}
