import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useEffect, useCallback } from 'react';

import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

type IDeleteAreaModal = {
  open: boolean;
  onClose: () => void;
  autor_id: string;
  reloadList?: () => void;
};

export function DeleteAutor({ open, onClose, autor_id, reloadList }: IDeleteAreaModal) {
  const { message } = useToast();

  useEffect(() => {
    async function getAutor() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.get(`/autor/${autor_id}`);
    }
    getAutor();
  }, [autor_id]);

  const handleUpdate = useCallback(async () => {
    try {
      await api.delete(`/autores/${autor_id}`);

      if (reloadList) {
        reloadList();
      }
      onClose();
      message({ mensagem: 'Autor Deletado', tipo: 'success' });
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    }
  }, [autor_id, reloadList, onClose, message]);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ background: '#E5E5E5' }}>Excluir Autor</DialogTitle>
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
