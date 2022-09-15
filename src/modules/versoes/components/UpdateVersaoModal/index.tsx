import CloseIcon from '@mui/icons-material/Close';
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
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { api } from '#shared/services/axios';

type Disciplinas = {
  id: string;
  name: string;
  area_id: string;
  sigla: string;
};

type DisciplinaOption = {
  id: string;
  label: string;
};

type IUpdateVersaoModal = {
  open: boolean;
  onClose: () => void;
  versao_id: string;
  reloadList?: () => void;
};

export function UpdateVersaoModal({ open, onClose, versao_id, reloadList }: IUpdateVersaoModal) {
  // const [versaoName, setVersaoName] = useState('');
  const [disciplinas, setDisciplinas] = useState<Disciplinas[]>([]);
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

  useEffect(() => {
    async function getVersao() {
      const response = await api.get(`/versao/${versao_id}`);

      setDisciplinaId(response.data.disciplina.name);
      setCodigo(response.data.codigo);
      setCredito(response.data.credito_quantidade);
      setEmenta(response.data.ementa);
      setObservacao(response.data.observacao);
      setOferta(response.data.em_oferta);
      setProduzido(response.data.produzido);
      // setVersaoName(response.data.disciplina_versao_nome);
    }

    getVersao();
  }, [versao_id]);

  const disciplinaOptions = useMemo(() => {
    return disciplinas.map((disciplina) => {
      return {
        id: disciplina.id,
        label: disciplina.name,
      };
    });
  }, [disciplinas]);

  const handleUpdate = useCallback(async () => {
    if (disciplinaId !== null) {
      try {
        await api.put(`/versoes/${versao_id}`, {
          disciplina_id: disciplinaId.id,
          codigo,
          credito_quantidade: credito,
          ementa,
          observacao,
          em_oferta: oferta,
          produzido,
        });

        if (reloadList) {
          reloadList();
        }
        onClose();
      } catch {
        alert('Isso não deu certo');
      }
    }
  }, [
    disciplinaId,
    versao_id,
    codigo,
    credito,
    ementa,
    observacao,
    oferta,
    produzido,
    reloadList,
    onClose,
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Versão</DialogTitle>
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
          {/* <Grid item xs={12}>
            <Box>
              <TextField
                fullWidth
                label="Nome da Versão"
                variant="outlined"
                value={versaoName}
                disabled
              />
            </Box>
          </Grid> */}
          <Grid item xs={12}>
            <Box>
              <Autocomplete
                value={disciplinaId}
                onChange={(event: any, newValue) => {
                  setDisciplinaId(newValue);
                }}
                disablePortal
                id="combo-box-demo"
                options={disciplinaOptions}
                renderInput={(params1) => <TextField {...params1} label="Disciplina" fullWidth />}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <TextField
                fullWidth
                label="Codigo"
                variant="outlined"
                value={codigo}
                onChange={(event) => setCodigo(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <TextField
                fullWidth
                label="Credito"
                variant="outlined"
                value={credito}
                onChange={(event) => setCredito(Number(event.target.value))}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Em Oferta"
                  checked={oferta}
                  onChange={() => setOferta(!oferta)}
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Produzido"
                  checked={produzido}
                  onChange={() => setProduzido(!produzido)}
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Ementa"
                placeholder="Ementa"
                value={ementa}
                onChange={(event) => setEmenta(event.target.value)}
                multiline
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <TextField
                fullWidth
                placeholder="Observção"
                label="Observção"
                variant="outlined"
                value={observacao}
                onChange={(event) => setObservacao(event.target.value)}
                multiline
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
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
