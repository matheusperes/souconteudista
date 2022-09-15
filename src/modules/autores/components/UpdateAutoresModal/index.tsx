import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, TextField, Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

import { api } from '#shared/services/axios';

type IUpdateAutorModal = {
  open: boolean;
  onClose: () => void;
  autor_id: string;
  reloadList?: () => void;
};

export function UpdateAutorModal({ open, onClose, autor_id, reloadList }: IUpdateAutorModal) {
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [nomeMeio, setNomeMeio] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');
  const [quote, setQuote] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');

  useEffect(() => {
    async function getAutor() {
      const response = await api.get(`/autor/${autor_id}`);

      setPrimeiroNome(response.data.first_name);
      setNomeMeio(response.data.middle_name);
      setUltimoNome(response.data.last_name);
      setQuote(response.data.quote);
      setNacionalidade(response.data.nationality);
    }

    getAutor();
  }, [autor_id]);

  const handleUpdate = useCallback(async () => {
    try {
      await api.put(`/autores/${autor_id}`, {
        first_name: primeiroNome,
        middle_name: nomeMeio,
        last_name: ultimoNome,
        quote,
        nationality: nacionalidade,
      });

      if (reloadList) {
        reloadList();
      }
      onClose();
    } catch {
      alert('Isso não deu certo');
    }
  }, [autor_id, primeiroNome, nomeMeio, ultimoNome, quote, nacionalidade, reloadList, onClose]);

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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Autor</DialogTitle>
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
                label="Primeiro Nome"
                variant="outlined"
                value={primeiroNome}
                onChange={(event) => setPrimeiroNome(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nome do Meio"
                variant="outlined"
                value={nomeMeio}
                onChange={(event) => setNomeMeio(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Ultimo Nome"
                variant="outlined"
                value={ultimoNome}
                onChange={(event) => setUltimoNome(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Quote"
                variant="outlined"
                value={quote}
                onChange={(event) => setQuote(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nacionalidade"
                variant="outlined"
                value={nacionalidade}
                onChange={(event) => setNacionalidade(event.target.value)}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" marginBottom="1rem">
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
