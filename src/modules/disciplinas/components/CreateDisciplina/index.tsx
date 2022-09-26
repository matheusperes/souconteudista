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
import { IDisciplinas } from '#modules/areas/pages/FilteredDisciplinas';

type ICreateDisciplinaModal = {
  updateListDisciplinas: (disciplina: IDisciplinas) => void;
  open: boolean;
  onClose: () => void;
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

export function CreateDisciplinaModal({
  updateListDisciplinas,
  open,
  onClose,
}: ICreateDisciplinaModal) {
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

  const handleCreate = useCallback(
    async (form: IForm) => {
      try {
        const response = await api.post('/disciplinas', {
          name: form.name,
          area_id: form.area.id,
          sigla: form.sigla,
        });
        updateListDisciplinas(response.data);
        message({ mensagem: 'Disciplina Cadastrada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [message, onClose, reset, updateListDisciplinas],
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
          Cadastrar Disciplina
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
                label="Nome da disciplina"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField name="sigla" control={control} errors={errors.sigla} label="Sigla" />
            </Grid>
            <Grid item xs={12}>
              <FormSelect
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
