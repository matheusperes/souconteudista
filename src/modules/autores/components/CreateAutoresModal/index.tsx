import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, TextField, Button } from '@mui/material';
import { useCallback, useState } from 'react';

import { api } from '#shared/services/axios';

import { IAutores } from '#modules/autores/pages/ListAutores';

type ICreateAutoresModal = {
  updateListAutores: (autor: IAutores) => void;
  open: boolean;
  onClose: () => void;
};

export function CreateAutoresModal({ updateListAutores, open, onClose }: ICreateAutoresModal) {
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [nomeMeio, setNomeMeio] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');
  const [quote, setQuote] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');

  const handleCreate = useCallback(async () => {
    const response = await api.post('/autores', {
      first_name: primeiroNome,
      middle_name: nomeMeio,
      last_name: ultimoNome,
      quote,
      nationality: nacionalidade,
    });

    updateListAutores(response.data);
    setPrimeiroNome('');
    setNomeMeio('');
    setUltimoNome('');
    setQuote('');
    setNacionalidade('');
    onClose();
  }, [primeiroNome, nomeMeio, ultimoNome, quote, nacionalidade, updateListAutores, onClose]);

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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Cadastrar Autor</DialogTitle>
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
