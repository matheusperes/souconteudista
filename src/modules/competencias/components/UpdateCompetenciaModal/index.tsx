import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, TextField, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { api } from '#shared/services/axios';

type IUpdateCompetenciaModal = {
  reloadList?: () => void;
  open: boolean;
  onClose: () => void;
  competencia_id: string;
};

export function UpdateCompetenciaModal({
  reloadList,
  open,
  onClose,
  competencia_id,
}: IUpdateCompetenciaModal) {
  const [competencia, setCompetencia] = useState('');
  const [competenciaNumero, setCompetenciaNumero] = useState(0);

  useEffect(() => {
    async function getCompetencia() {
      const response = await api.get(`/competencia/${competencia_id}`);

      setCompetencia(response.data.competencia);
      setCompetenciaNumero(response.data.competenciaNumero);
    }

    getCompetencia();
  }, [competencia_id]);

  const handleUpdate = useCallback(async () => {
    try {
      await api.put(`/competencias/${competencia_id}`, { competencia, competenciaNumero });

      if (reloadList) {
        reloadList();
      }
      onClose();
    } catch {
      alert('Isso não deu certo');
    }
  }, [competencia_id, competencia, competenciaNumero, reloadList, onClose]);

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
          Editar Competencia
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nome da competencia"
                variant="outlined"
                multiline
                value={competencia}
                onChange={(event) => setCompetencia(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <TextField
                fullWidth
                label="Numero da Competencia"
                variant="outlined"
                multiline
                value={competenciaNumero}
                onChange={(event) => setCompetenciaNumero(Number(event.target.value))}
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
