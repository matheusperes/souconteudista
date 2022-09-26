import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, Button } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FormCheckbox } from '#shared/components/Form/CheckBox';
import { MyTextField } from '#shared/components/Form/TextField';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { Area } from '#modules/areas/pages/FilteredDisciplinas';
import { Versoes } from '#modules/disciplinas/pages/FilteredVersoes';

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

type CreateFilteredVersaoModal = {
  updateListVersoes: (versao: Versoes) => void;
  open: boolean;
  onClose: () => void;
};

export function CreateFilteredVersaoModal({
  updateListVersoes,
  open,
  onClose,
}: CreateFilteredVersaoModal) {
  const params = useParams();
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
        const response = await api.post('/versoes', {
          disciplina_id: params.id,
          codigo: form.codigo,
          credito_quantidade: form.credito,
          ementa: form.ementa,
          observacao: form.observacao,
          em_oferta: form.oferta,
          produzido: form.produzido,
        });
        updateListVersoes(response.data);
        message({ mensagem: 'Versão Cadastrada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [message, onClose, params.id, reset, updateListVersoes],
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Cadastrar Versão</DialogTitle>
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
            <Grid item xs={6}>
              <MyTextField name="codigo" control={control} errors={errors.codigo} label="Código" />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                name="credito"
                control={control}
                errors={errors.credito}
                label="Créditos"
                inputProps={{ inputMode: 'numeric' }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormCheckbox name="oferta" control={control} label="Em Oferta" />
            </Grid>
            <Grid item xs={6}>
              <FormCheckbox name="produzido" control={control} label="Produzido" />
            </Grid>
            <Grid item xs={12}>
              <MyTextField name="ementa" control={control} errors={errors.ementa} label="Ementa" />
            </Grid>
            <Grid item xs={12}>
              <MyTextField name="observacao" control={control} label="Observação" />
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
