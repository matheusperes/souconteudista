import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  Box,
  DialogTitle,
  IconButton,
  Grid,
  Button,
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '#shared/services/axios';

import { Ppc } from '#modules/ppcs/pages/ListPpcsCurso';

type Competencia = {
  competencia: string;
  id: string;
};

type Perfil = {
  perfil: string;
  id: string;
};

type CompetenciaApi = {
  competencia: string;
  competenciaNumero: number;
};

type PerfilApi = {
  perfil: string;
  perfilNumero: number;
};

type ICreateFilteredPpcModal = {
  updateListPpcs: (ppc: Ppc) => void;
  open: boolean;
  onClose: () => void;
};

export function CreateFilteredPpcModal({ updateListPpcs, open, onClose }: ICreateFilteredPpcModal) {
  const params = useParams();
  const [anoVoto, setAnoVoto] = useState(0);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [horaCredito, setHoraCredito] = useState(0);
  const [quantSemestres, setQuantSemestres] = useState(0);
  const [active, setActive] = useState(true);
  const [atual, setAtual] = useState(true);
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [perfil, setPerfil] = useState<Perfil[]>([]);

  const handleCreate = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (params?.curso_id !== null) {
        const competenciaFixed = competencias.map<CompetenciaApi>((competencia, index) => {
          return {
            competencia: competencia.competencia,
            competenciaNumero: index + 1,
          };
        });

        const perfilFixed = perfil.map<PerfilApi>((perfil2, index) => {
          return {
            perfil: perfil2.perfil,
            perfilNumero: index + 1,
          };
        });

        const response = await api.post('/ppcs', {
          curso_id: params.curso_id,
          anoVoto,
          dataInicio,
          dataFim,
          horaCredito,
          quantSemestres,
          active,
          ppc_ativo: atual,
          competencias: competenciaFixed,
          perfis: perfilFixed,
        });

        updateListPpcs(response.data);
        setAnoVoto(0);
        setCompetencias([]);
        setDataInicio('');
        setDataFim('');
        setHoraCredito(0);
        setQuantSemestres(0);
        setActive(true);
        setAtual(true);
        setPerfil([]);
        onClose();
      }
    },
    [
      params.curso_id,
      competencias,
      perfil,
      anoVoto,
      dataInicio,
      dataFim,
      horaCredito,
      quantSemestres,
      active,
      atual,
      updateListPpcs,
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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Cadastrar PPC</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Container sx={{ marginTop: '1rem' }}>
        <form onSubmit={handleCreate}>
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

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quantidade de Semestres"
                variant="outlined"
                value={quantSemestres}
                onChange={(event) => setQuantSemestres(Number(event.target.value))}
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
                Inserir
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Dialog>
  );
}
