import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  Box,
  DialogTitle,
  IconButton,
  Grid,
  TextField,
  Autocomplete,
  Button,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '#shared/services/axios';

type Area = {
  id: string;
  name: string;
  description: string;
};

type AreaOption = {
  id: string;
  label: string;
};

type IUpdateDisciplinaModal = {
  open: boolean;
  onClose: () => void;
  disciplina_id: string;
  reloadList?: () => void;
};

export function UpdateDisciplinaModal({
  open,
  onClose,
  disciplina_id,
  reloadList,
}: IUpdateDisciplinaModal) {
  const [areas, setAreas] = useState<Area[]>([]);
  const [name, setName] = useState('');
  const [sigla, setSigla] = useState('');
  const [areaId, setAreaId] = useState<AreaOption | null>(null);

  useEffect(() => {
    async function getAreas() {
      const response = await api.get('/areas');

      setAreas(response.data);
    }

    getAreas();
  }, []);

  useEffect(() => {
    async function getDisciplina() {
      const response = await api.get(`/disciplina/${disciplina_id}`);

      setName(response.data.name);
      setSigla(response.data.sigla);
      setAreaId(response.data.area.name);
    }

    getDisciplina();
  }, [disciplina_id]);

  const areaOptions = useMemo(() => {
    return areas.map((area) => {
      return {
        id: area.id,
        label: area.name,
      };
    });
  }, [areas]);

  const handleUpdate = useCallback(async () => {
    if (areaId !== null) {
      try {
        await api.put(`/disciplinas/${disciplina_id}`, { name, sigla, area_id: areaId.id });

        if (reloadList) {
          reloadList();
        }
        onClose();
      } catch {
        alert('Isso não deu certo');
      }
    }
  }, [areaId, disciplina_id, name, onClose, reloadList, sigla]);

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
          Editar Disciplina
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
            <Box display="flex" alignItems="center">
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
            <Box>
              <Autocomplete
                value={areaId}
                onChange={(event: any, newValue) => {
                  setAreaId(newValue);
                }}
                disablePortal
                id="combo-box-demo"
                options={areaOptions}
                renderInput={(params1) => <TextField {...params1} label="Area" fullWidth />}
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
