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
} from '@mui/material';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { api } from '#shared/services/axios';

import { IObras, IObrasAutor } from '../../pages/ListObras';

type ICreateObraAutorModal = {
  updateListObrasAutor: (obraAutor: IObrasAutor) => void;
  open: boolean;
  onClose: () => void;
};

export type IAutores = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  quote: string;
  nationality: string;
};

export type ObraOption = {
  id: string;
  label: string;
};

export function CreateObraAutorModal({
  open,
  onClose,
  updateListObrasAutor,
}: ICreateObraAutorModal) {
  const [autores, setAutores] = useState<IAutores[]>([]);
  const [autorId, setAutorId] = useState<ObraOption | null>(null);
  const [obras, setObras] = useState<IObras[]>([]);
  const [obraId, setObraId] = useState<ObraOption | null>(null);
  const [funcao, setFuncao] = useState('');

  useEffect(() => {
    async function getObras() {
      const response = await api.get('/obras');

      setObras(response.data);
    }

    getObras();
  }, []);

  const obraOptions = useMemo(() => {
    return obras.map((obra) => {
      return {
        id: obra.id,
        label: obra.obra_nome,
      };
    });
  }, [obras]);

  useEffect(() => {
    async function getAutores() {
      const response = await api.get('/autores');

      setAutores(response.data);
    }

    getAutores();
  }, []);

  const autoresOptions = useMemo(() => {
    return autores.map((autor) => {
      return {
        id: autor.id,
        label: autor.quote,
      };
    });
  }, [autores]);

  const handleCreate = useCallback(async () => {
    if (obraId && autorId !== null) {
      const response = await api.post('/obra_autor', {
        autor_id: autorId?.id,
        funcao,
        obra_id: obraId?.id,
      });

      updateListObrasAutor(response.data);
      setAutorId(null);
      setFuncao('');
      setObraId(null);
      onClose();
    }
  }, [obraId, autorId, funcao, updateListObrasAutor, onClose]);

  return (
    <Dialog onClose={onClose} open={open}>
      <Box sx={{ display: 'flex', align: 'center', borderBottom: '1px solid #333' }}>
        <DialogTitle>Cadastrar Obra</DialogTitle>
        <IconButton color="primary" sx={{ marginLeft: 'auto', padding: '1rem' }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Autocomplete
                value={autorId}
                onChange={(event: any, newValue) => {
                  setAutorId(newValue);
                }}
                disablePortal
                id="combo-box-demo"
                options={autoresOptions}
                renderInput={(params) => <TextField {...params} label="Autor" fullWidth />}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <TextField
                fullWidth
                label="Função"
                variant="outlined"
                value={funcao}
                onChange={(event) => setFuncao(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Autocomplete
                value={obraId}
                onChange={(event: any, newValue) => {
                  setObraId(newValue);
                }}
                disablePortal
                id="combo-box-demo"
                options={obraOptions}
                renderInput={(params) => <TextField {...params} label="Obra" fullWidth />}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" marginBottom="1rem">
              <Button fullWidth variant="contained" onClick={handleCreate}>
                Inserir
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
