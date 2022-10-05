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

type IDeleteInstituicaoModal = {
  open: boolean;
  onClose: () => void;
  instituicao1_id: string;
  reloadList?: () => void;
};

export function DeleteInstituicaoModal({
  open,
  onClose,
  instituicao1_id,
  reloadList,
}: IDeleteInstituicaoModal) {
  const { message } = useToast();

  useEffect(() => {
    async function getInstituicao() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.get(`/instituicao/${instituicao1_id}`);
    }
    getInstituicao();
  }, [instituicao1_id]);

  const handleUpdate = useCallback(async () => {
    try {
      await api.delete(`/instituicoes/${instituicao1_id}`);

      if (reloadList) {
        reloadList();
      }
      onClose();
      message({ mensagem: 'Instituição Deletada', tipo: 'success' });
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    }
  }, [instituicao1_id, reloadList, onClose, message]);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ background: '#E5E5E5' }}>Excluir Instituição</DialogTitle>
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
