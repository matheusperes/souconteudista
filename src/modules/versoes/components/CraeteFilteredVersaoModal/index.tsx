import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  Box,
  DialogTitle,
  IconButton,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '#shared/services/axios';

import { Versoes } from '#modules/disciplinas/pages/FilteredVersoes';

type CreateFilteredVersaoModal = {
  updateListVersoes: (versao: Versoes) => void;
  open: boolean;
  onClose: () => void;
};

export function CreateFilteredVersaoModal({
  updateListVersoes,
  open,
  onClose,
}: CreateFilteredVersaoModal) {
  const params = useParams();
  const [codigo, setCodigo] = useState('');
  const [credito, setCredito] = useState(0);
  const [ementa, setEmenta] = useState('');
  const [observacao, setObservacao] = useState('');
  const [oferta, setOferta] = useState(true);
  const [produzido, setProduzido] = useState(true);

  const handleCreate = useCallback(async () => {
    if (params?.id !== null) {
      const response = await api.post('/versoes', {
        disciplina_id: params.id,
        codigo,
        credito_quantidade: credito,
        ementa,
        observacao,
        em_oferta: oferta,
        produzido,
      });

      updateListVersoes(response.data);
      setCodigo('');
      setCredito(0);
      setEmenta('');
      setObservacao('');
      setOferta(true);
      setProduzido(true);
      onClose();
    }
  }, [
    codigo,
    credito,
    ementa,
    observacao,
    oferta,
    onClose,
    params.id,
    produzido,
    updateListVersoes,
  ]);

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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Cadastrar Versão</DialogTitle>
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
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              label="Codigo"
              variant="outlined"
              value={codigo}
              onChange={(event) => setCodigo(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              label="Credito"
              variant="outlined"
              value={credito}
              onChange={(event) => setCredito(Number(event.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Em Oferta"
                checked={oferta}
                onChange={() => setOferta(!oferta)}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Produzido"
                checked={produzido}
                onChange={() => setProduzido(!produzido)}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-textarea"
              label="Ementa"
              placeholder="Ementa"
              value={ementa}
              onChange={(event) => setEmenta(event.target.value)}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Observção"
              label="Observção"
              variant="outlined"
              value={observacao}
              onChange={(event) => setObservacao(event.target.value)}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
