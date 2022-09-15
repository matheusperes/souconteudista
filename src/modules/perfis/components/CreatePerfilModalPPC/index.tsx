import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, TextField, Button } from '@mui/material';
import { useCallback, useState } from 'react';

import { api } from '#shared/services/axios';

type ICreatePerfilModalPPC = {
  reloadList?: () => void;
  open: boolean;
  onClose: () => void;
  ppc_id: string;
};

export function CreatePerfilModalPPC({ reloadList, open, onClose, ppc_id }: ICreatePerfilModalPPC) {
  const [perfil, SetPerfil] = useState('');
  const [perfilNumero, setPerfilNumero] = useState(0);

  const handleCreate = useCallback(async () => {
    await api.post('/perfis', {
      perfil,
      perfilNumero,
      ppc_id,
    });

    if (reloadList) {
      reloadList();
    }
    SetPerfil('');
    setPerfilNumero(0);
    onClose();
  }, [perfil, perfilNumero, ppc_id, reloadList, onClose]);

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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Criar Perfil</DialogTitle>
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
                label="Perfil"
                variant="outlined"
                multiline
                value={perfil}
                onChange={(event) => SetPerfil(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <TextField
                fullWidth
                label="Número"
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
                onClick={handleCreate}
                sx={{
                  background: '#0b0f79',
                  color: '#E5E5E5',
                  '&:hover': { background: '#020560' },
                }}
              >
                Inserir
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
