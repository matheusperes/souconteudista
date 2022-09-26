import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormSelect } from '#shared/components/Form/FormSelect';
import { MyTextField } from '#shared/components/Form/TextField';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { IArea } from '#modules/areas/components/CreateArea';

type Disciplinas = {
  name: string;
  sigla: string;
  area_id: string;
  area: IArea;
};

type IForm = {
  name: number;
  sigla: string;
  area: IArea;
};

const validateForm = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  sigla: yup.string().required('Sigla Obrigatória'),
});

type IUpdateDisciplinaModal = {
  open: boolean;
  onClose: () => void;
  disciplina_id: string;
  reloadList?: () => void;
};

export function UpdateDisciplinaModal({
  open,
  onClose,
  disciplina_id,
  reloadList,
}: IUpdateDisciplinaModal) {
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

  const [areas, setAreas] = useState<IArea[]>([]);
  const [data, setData] = useState<Disciplinas | null>(null);

  useEffect(() => {
    async function getAreas() {
      startLoading();
      try {
        const response = await api.get('/areas');
        setAreas(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getAreas();
  }, [message, startLoading, stopLoading]);

  useEffect(() => {
    async function getDisciplina() {
      startLoading();
      try {
        const response = await api.get(`/disciplina/${disciplina_id}`);
        setData(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getDisciplina();
  }, [disciplina_id, message, startLoading, stopLoading]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      try {
        await api.put(`/disciplinas/${disciplina_id}`, {
          name: form.name,
          sigla: form.sigla,
          area_id: form.area.id,
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
    [disciplina_id, message, onClose, reloadList, reset],
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
          Editar Disciplina
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
        {data && (
          <form onSubmit={handleSubmit(handleUpdate)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.name}
                  name="name"
                  control={control}
                  errors={errors.name}
                  label="Nome da disciplina"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.sigla}
                  name="sigla"
                  control={control}
                  errors={errors.sigla}
                  label="Sigla"
                />
              </Grid>
              <Grid item xs={12}>
                <FormSelect
                  defaultValue={data.area}
                  name="area"
                  control={control}
                  options={areas}
                  optionLabel="name"
                  optionValue="id"
                  label="Area"
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
                    Atualizar
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
