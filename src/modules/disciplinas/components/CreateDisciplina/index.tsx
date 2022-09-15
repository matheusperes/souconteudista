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

import { IArea } from '#modules/areas/components/CreateArea';
import { IDisciplinas } from '#modules/areas/pages/FilteredDisciplinas';
import { AreaOption } from '#modules/disciplinas/pages/ListDisciplinas';

type ICreateDisciplinaModal = {
  updateListDisciplinas: (disciplina: IDisciplinas) => void;
  open: boolean;
  onClose: () => void;
};

export function CreateDisciplinaModal({
  updateListDisciplinas,
  open,
  onClose,
}: ICreateDisciplinaModal) {
  const [areas, setAreas] = useState<IArea[]>([]);
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

  const areaOptions = useMemo(() => {
    return areas.map((area) => {
      return {
        id: area.id,
        label: area.name,
      };
    });
  }, [areas]);

  const handleCreate = useCallback(async () => {
    if (areaId !== null) {
      const response = await api.post('/disciplinas', {
        name,
        area_id: areaId.id,
        sigla,
      });

      updateListDisciplinas(response.data);
      setName('');
      setSigla('');
      setAreaId(null);
      onClose();
    }
  }, [areaId, name, onClose, sigla, updateListDisciplinas]);

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
            <Box>
              <Autocomplete
                value={areaId}
                onChange={(event: any, newValue) => {
                  setAreaId(newValue);
                }}
                disablePortal
                id="combo-box-demo"
                options={areaOptions}
                renderInput={(params) => <TextField {...params} label="Area" fullWidth />}
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
