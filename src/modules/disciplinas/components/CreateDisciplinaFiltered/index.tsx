import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, TextField, Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '#shared/services/axios';

import { IDisciplinas } from '#modules/areas/pages/FilteredDisciplinas';

type ICreateFilteredDisciplinaModal = {
  updateListDisciplinas: (disciplina: IDisciplinas) => void;
  open: boolean;
  onClose: () => void;
};

export function CreateFilteredDisciplinaModal({
  updateListDisciplinas,
  open,
  onClose,
}: ICreateFilteredDisciplinaModal) {
  const params = useParams();
  const [name, setName] = useState('');
  const [sigla, setSigla] = useState('');

  const handleCreate = useCallback(async () => {
    if (params?.id !== null) {
      const response = await api.post('/disciplinas', {
        name,
        area_id: params.id,
        sigla,
      });

      updateListDisciplinas(response.data);
      setName('');
      setSigla('');
      onClose();
    }
  }, [params.id, name, sigla, updateListDisciplinas, onClose]);

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
          Cadastrar Disciplina
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
                label="Nome da Disciplina"
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
                label="Sigla da Disciplina"
                variant="outlined"
                value={sigla}
                onChange={(event) => setSigla(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box marginTop="1rem">
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
