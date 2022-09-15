import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, TextField, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { api } from '#shared/services/axios';

type IUpdatePerfilModal = {
  reloadList?: () => void;
  open: boolean;
  onClose: () => void;
  perfil_id: string;
};

export function UpdatePerfilModal({ reloadList, open, onClose, perfil_id }: IUpdatePerfilModal) {
  const [perfil, setPerfil] = useState('');
  const [perfilNumero, setPerfilNumero] = useState(0);

  useEffect(() => {
    async function getPerfil() {
      const response = await api.get(`/perfil/${perfil_id}`);

      setPerfil(response.data.perfil);
      setPerfilNumero(response.data.perfilNumero);
    }

    getPerfil();
  }, [perfil_id]);

  const handleUpdate = useCallback(async () => {
    try {
      await api.put(`/perfis/${perfil_id}`, { perfil, perfilNumero });

      if (reloadList) {
        reloadList();
      }
      onClose();
    } catch {
      alert('Isso não deu certo');
    }
  }, [perfil_id, perfil, perfilNumero, reloadList, onClose]);

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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Perfil</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nome do Perfil"
                variant="outlined"
                value={perfil}
                multiline
                onChange={(event) => setPerfil(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <TextField
                fullWidth
                label="Numero do Perfil"
                variant="outlined"
                multiline
                value={perfilNumero}
                onChange={(event) => setPerfilNumero(Number(event.target.value))}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Button
                fullWidth
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  background: '#0b0f79',
                  color: '#E5E5E5',
                  '&:hover': { background: '#020560' },
                }}
              >
                Atualizar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
