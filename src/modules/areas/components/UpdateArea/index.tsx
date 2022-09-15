import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, TextField, Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

import { api } from '#shared/services/axios';

type IUpdateAreaModal = {
  open: boolean;
  onClose: () => void;
  area_id: string;
  reloadList?: () => void;
};

export function UpdateAreaModal({ open, onClose, area_id, reloadList }: IUpdateAreaModal) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function getArea() {
      const response = await api.get(`/area/${area_id}`);

      setDescription(response.data.description);
      setName(response.data.name);
    }

    getArea();
  }, [area_id]);

  const handleUpdate = useCallback(async () => {
    try {
      await api.put(`/areas/${area_id}`, { name, description });

      if (reloadList) {
        reloadList();
      }
      onClose();
    } catch {
      alert('Isso não deu certo');
    }
  }, [area_id, name, description, reloadList, onClose]);

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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Área</DialogTitle>
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
            <Box>
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
