import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  Box,
  DialogTitle,
  IconButton,
  Container,
  Grid,
  TextField,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { useState, useEffect, useMemo, useCallback } from 'react';

import { api } from '#shared/services/axios';

type Curso = {
  id: string;
  name: string;
};

type CursoOption = {
  id: string;
  label: string;
};

type IUpdatePpcModal = {
  open: boolean;
  onClose: () => void;
  ppc_id: string;
  reloadList?: () => void;
};

export function UpdatePpcModal({ open, onClose, ppc_id, reloadList }: IUpdatePpcModal) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursoId, setCursoId] = useState<CursoOption | null>(null);
  const [anoVoto, setAnoVoto] = useState(0);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [horaCredito, setHoraCredito] = useState(0);
  const [quantSemestres, setQuantSemestres] = useState(0);
  const [active, setActive] = useState(true);
  const [atual, setAtual] = useState(true);

  useEffect(() => {
    async function getCursos() {
      const response = await api.get('/cursos');

      setCursos(response.data);
    }

    getCursos();
  }, []);

  useEffect(() => {
    async function getPpc() {
      const response = await api.get(`/ppc/${ppc_id}`);

      setCursoId(response.data.curso.name);
      setAnoVoto(response.data.anoVoto);
      setDataInicio(response.data.dataInicio);
      setDataFim(response.data.dataFim);
      setHoraCredito(response.data.horaCredito);
      setQuantSemestres(response.data.quantSemestres);
    }

    getPpc();
  }, [ppc_id]);

  const cursoOptions = useMemo(() => {
    return cursos.map((curso) => {
      return {
        id: curso.id,
        label: curso.name,
      };
    });
  }, [cursos]);

  const handleUpdate = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (cursoId !== null) {
        try {
          await api.put(`/ppcs/${ppc_id}`, {
            curso_id: cursoId.id,
            anoVoto,
            dataInicio,
            dataFim,
            horaCredito,
            quantSemestres,
          });

          if (reloadList) {
            reloadList();
          }
          onClose();
        } catch {
          alert('Isso não deu certo');
        }
      }
    },
    [
      cursoId,
      ppc_id,
      anoVoto,
      dataInicio,
      dataFim,
      horaCredito,
      quantSemestres,
      reloadList,
      onClose,
    ],
  );

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <Box
        sx={{
          display: 'flex',
          align: 'center',
          borderBottom: '1px solid #333',
          background: '#020560',
        }}
      >
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Update PPC</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Container sx={{ marginTop: '1rem' }}>
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Ano do Voto"
                variant="outlined"
                value={anoVoto}
                onChange={(event) => setAnoVoto(Number(event.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Data de Inicio"
                variant="outlined"
                value={dataInicio}
                onChange={(event) => setDataInicio(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Data de Fim"
                variant="outlined"
                value={dataFim}
                onChange={(event) => setDataFim(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Horas/Creditos"
                variant="outlined"
                value={horaCredito}
                onChange={(event) => setHoraCredito(Number(event.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantidade de Semestres"
                variant="outlined"
                value={quantSemestres}
                onChange={(event) => setQuantSemestres(Number(event.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                value={cursoId}
                onChange={(event: any, newValue) => {
                  setCursoId(newValue);
                }}
                disablePortal
                id="combo-box-demo"
                options={cursoOptions}
                sx={{ width: '100%' }}
                renderInput={(params1) => <TextField {...params1} label="Curso" fullWidth />}
              />
            </Grid>

            <Grid item xs={6}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="PPC Ativo"
                  checked={active}
                  onChange={() => setActive(!active)}
                />
              </FormGroup>
            </Grid>

            <Grid item xs={6}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="PPC Atual"
                  checked={atual}
                  onChange={() => setAtual(!atual)}
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: '1rem' }}>
              <Button
                sx={{
                  background: '#0b0f79',
                  color: '#E5E5E5',
                  '&:hover': { background: '#020560' },
                }}
                fullWidth
                variant="contained"
                type="submit"
              >
                Atualizar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Dialog>
  );
}
