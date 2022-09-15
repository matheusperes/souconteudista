import { Close } from '@mui/icons-material';
import {
  Dialog,
  Box,
  DialogTitle,
  IconButton,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '#shared/services/axios';

import { IDisciplinas } from '#modules/areas/pages/FilteredDisciplinas';
import { Versoes } from '#modules/versoes/pages/FilteredVersao';

type ICreateVersaoModal = {
  updateListVersoes: (versao: Versoes) => void;
  open: boolean;
  onClose: () => void;
};

export type DisciplinaOption = {
  id: string;
  label: string;
};

export function CreateVersaoModal({ updateListVersoes, open, onClose }: ICreateVersaoModal) {
  const [disciplinas, setDisciplinas] = useState<IDisciplinas[]>([]);
  const [disciplinaId, setDisciplinaId] = useState<DisciplinaOption | null>(null);
  const [codigo, setCodigo] = useState('');
  const [credito, setCredito] = useState(0);
  const [ementa, setEmenta] = useState('');
  const [observacao, setObservacao] = useState('');
  const [oferta, setOferta] = useState(true);
  const [produzido, setProduzido] = useState(true);

  useEffect(() => {
    async function getDisciplinas() {
      const response = await api.get('/disciplinas');

      setDisciplinas(response.data);
    }

    getDisciplinas();
  }, []);

  const disciplinaOptions = useMemo(() => {
    return disciplinas.map((disciplina) => {
      return {
        id: disciplina.id,
        label: disciplina.name,
      };
    });
  }, [disciplinas]);

  const handleCreate = useCallback(async () => {
    if (disciplinaId !== null) {
      const response = await api.post('/versoes', {
        disciplina_id: disciplinaId.id,
        codigo,
        credito_quantidade: credito,
        ementa,
        observacao,
        em_oferta: oferta,
        produzido,
      });

      updateListVersoes(response.data);
      setDisciplinaId(null);
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
    disciplinaId,
    ementa,
    observacao,
    oferta,
    onClose,
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
          <Close />
        </IconButton>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              value={disciplinaId}
              onChange={(event: any, newValue) => {
                setDisciplinaId(newValue);
              }}
              disablePortal
              id="combo-box-demo"
              options={disciplinaOptions}
              renderInput={(params) => <TextField {...params} label="Disciplina" fullWidth />}
            />
          </Grid>
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
                control={<Checkbox defaultChecked />}
                label="Em Oferta"
                checked={oferta}
                onChange={() => setOferta(!oferta)}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
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
