import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormCheckbox } from '#shared/components/Form/CheckBox';
import { FormSelect } from '#shared/components/Form/FormSelect';
import { MyTextField } from '#shared/components/Form/TextField';
import { useInstitution } from '#shared/hooks/institution';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { Area } from '#modules/areas/pages/FilteredDisciplinas';
import { Versoes } from '#modules/versoes/pages/FilteredVersao';

type IUpdateVersaoModal = {
  open: boolean;
  onClose: () => void;
  versao_id: string;
  reloadList?: () => void;
};

type Disciplinas = {
  id: string;
  name: string;
  area_id: string;
  sigla: string;
  area: Area;
};

type IForm = {
  codigo: string;
  credito: number;
  oferta: boolean;
  produzido: boolean;
  ementa: string;
  observacao: string;
  disciplina: Disciplinas;
};

const validateForm = yup.object().shape({
  codigo: yup.string().required('código Obrigatória'),
  credito: yup.number().required('Crédito Obrigatório'),
  ementa: yup.string().required('Ementa Obrigatória'),
});

export function UpdateVersaoModal({ open, onClose, versao_id, reloadList }: IUpdateVersaoModal) {
  const { startLoading, stopLoading } = useLoading();
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

  const [disciplinas, setDisciplinas] = useState<Disciplinas[]>([]);
  const [data, setData] = useState<Versoes | null>(null);

  useEffect(() => {
    async function getDisciplinas() {
      startLoading();
      try {
        const response = await api.get('/disciplinas', {
          params: { instituicao_id: instituicao?.id },
        });
        setDisciplinas(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getDisciplinas();
  }, [instituicao?.id, message, startLoading, stopLoading]);

  useEffect(() => {
    async function getVersao() {
      startLoading();
      try {
        const response = await api.get(`/versao/${versao_id}`, {
          params: { instituicao_id: instituicao?.id },
        });
        setData(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getVersao();
  }, [instituicao?.id, message, startLoading, stopLoading, versao_id]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      try {
        await api.put(`/versoes/${versao_id}`, {
          instituicao_id: instituicao?.id,
          disciplina_id: form.disciplina.id,
          codigo: form.codigo,
          credito_quantidade: form.credito,
          ementa: form.ementa,
          observacao: form.observacao,
          em_oferta: form.oferta,
          produzido: form.produzido,
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
    [versao_id, instituicao?.id, reloadList, message, reset, onClose],
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Versão</DialogTitle>
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
                <FormSelect
                  defaultValue={data.disciplina}
                  name="disciplina"
                  control={control}
                  options={disciplinas}
                  optionLabel="name"
                  optionValue="id"
                  label="Disciplina"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.codigo}
                  name="codigo"
                  control={control}
                  errors={errors.codigo}
                  label="Código"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.credito_quantidade}
                  name="credito"
                  control={control}
                  errors={errors.credito}
                  label="Créditos"
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormCheckbox
                  defaultValue={data.em_oferta}
                  name="oferta"
                  control={control}
                  label="Em Oferta"
                />
              </Grid>
              <Grid item xs={6}>
                <FormCheckbox
                  defaultValue={data.produzido}
                  name="produzido"
                  control={control}
                  label="Produzido"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.ementa}
                  name="ementa"
                  control={control}
                  errors={errors.ementa}
                  label="Ementa"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.observacao}
                  name="observacao"
                  control={control}
                  label="Observação"
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
        )}
      </Box>
    </Dialog>
  );
}
