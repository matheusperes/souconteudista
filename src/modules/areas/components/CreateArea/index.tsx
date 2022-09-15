import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, Box, Grid, TextField, Button, IconButton } from '@mui/material';
import { useCallback, useState } from 'react';

import { api } from '#shared/services/axios';

export type IArea = {
  id: string;
  name: string;
  description: string;
};

type ICreateAreaModal = {
  updateListArea: (area: IArea) => void;
  open: boolean;
  onClose: () => void;
};

export function CreateAreaModal({ updateListArea, open, onClose }: ICreateAreaModal) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = useCallback(async () => {
    const response = await api.post('/areas', { name, description });

    updateListArea(response.data);
    setName('');
    setDescription('');
    onClose();
  }, [name, description, updateListArea, onClose]);

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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Cadastrar Área</DialogTitle>
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
                label="Nome da Area"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Descrição da Area"
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" marginBottom="1rem">
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
