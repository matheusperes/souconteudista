import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

type IDeleteAreaModal = {
  open: boolean;
  onClose: () => void;
  versao_id: string;
};

export function DeleteEspecificVersão({ open, onClose, versao_id }: IDeleteAreaModal) {
  const { message } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function getVersao() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.get(`/versao/${versao_id}`);
    }
    getVersao();
  }, [versao_id]);

  const handleUpdate = useCallback(async () => {
    try {
      await api.delete(`/versoes/${versao_id}`);

      onClose();
      navigate(-1);
      message({ mensagem: 'Versão Deletada', tipo: 'success' });
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    }
  }, [versao_id, onClose, navigate, message]);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ background: '#E5E5E5' }}>Excluir Versão</DialogTitle>
      <DialogContent sx={{ background: '#E5E5E5' }}>
        <DialogContentText sx={{ fontSize: '1rem' }}>
          Tem ceretza que deseja realizar esta ação?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ background: '#E5E5E5' }}>
        <Button variant="outlined" color="error" onClick={onClose}>
          Não
        </Button>
        <Button variant="outlined" color="success" onClick={handleUpdate} autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}
