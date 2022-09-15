import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, TextField, Button } from '@mui/material';
import { useCallback, useState } from 'react';

import { api } from '#shared/services/axios';

type ICreateCompetenciaModalPPC = {
  reloadList?: () => void;
  open: boolean;
  onClose: () => void;
  ppc_id: string;
};

export function CreateCompetenciaModalPPC({
  reloadList,
  open,
  onClose,
  ppc_id,
}: ICreateCompetenciaModalPPC) {
  const [competencia, SetCompetencia] = useState('');
  const [competenciaNumero, setCompetenciaNumero] = useState(0);

  const handleCreate = useCallback(async () => {
    await api.post('/competencias', {
      competencia,
      competenciaNumero,
      ppc_id,
    });

    if (reloadList) {
      reloadList();
    }
    SetCompetencia('');
    setCompetenciaNumero(0);
    onClose();
  }, [competencia, competenciaNumero, ppc_id, reloadList, onClose]);

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
          Criar Competencia
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
                onChange={(event) => SetCompetencia(event.target.value)}
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
