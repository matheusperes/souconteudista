import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useEffect, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormCheckbox } from '#shared/components/Form/CheckBox';
import { MyTextField } from '#shared/components/Form/TextField';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { IInstituicoes } from '#modules/instituicoes/pages/ListInstituicoes';

type IUpdateInstituicaoModal = {
  open: boolean;
  onClose: () => void;
  instituicao1_id: string;
  reloadList: () => void;
};

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

export function UpdateInstituicaoModal({
  open,
  onClose,
  instituicao1_id,
  reloadList,
}: IUpdateInstituicaoModal) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();

  const [data, setData] = useState<IInstituicoes | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(validateForm),
  });

  useEffect(() => {
    async function getInstituicao() {
      startLoading();
      try {
        const response = await api.get(`/instituicao/${instituicao1_id}`);
        setData(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getInstituicao();
  }, [instituicao1_id, message, startLoading, stopLoading]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      try {
        await api.put(`/instituicoes/${instituicao1_id}`, {
          name: form.name,
          description: form.description,
          sigla: form.sigla,
          link: form.link,
          padrao: form.padrao,
        });

        if (reloadList) {
          reloadList();
        }
        message({ mensagem: 'Instituição Atualizada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response?.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [instituicao1_id, reloadList, message, reset, onClose],
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
          Editar Instituição
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
                  label="Nome da Instituição"
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
                <MyTextField
                  defaultValue={data.link}
                  name="link"
                  control={control}
                  errors={errors.link}
                  label="Link"
                />
              </Grid>
              <Grid item xs={6}>
                <FormCheckbox
                  defaultValue={data.padrao}
                  name="padrao"
                  control={control}
                  label="Instituição Padrão"
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
