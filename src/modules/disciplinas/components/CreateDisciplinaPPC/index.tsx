import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
  Typography,
  Checkbox,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '#shared/services/axios';

type ICreateDisciplinaPPC = {
  open: boolean;
  semestre?: number;
  modulo?: number;
  ppc_id?: string;
  onClose: () => void;
  reloadList?: () => void;
};

type Disciplinas = {
  id: string;
  name: string;
  area_id: string;
  sigla: string;
};

type DisciplinasOption = {
  id: string;
  label: string;
};

type Versoes = {
  id: string;
  disciplina_id: string;
  disciplina_versao_nome: string;
  codigo: string;
  credito_quantidade: number;
  ementa: string;
  observacao: string;
  em_oferta: number;
  produzido: number;
  disciplina: Disciplinas;
};

type VersaosOption = {
  id: string;
  label: string;
};

type Competencias = {
  id: string;
  ppc_id: string;
  competencia: string;
  competenciaNumero: number;
};

type Perfils = {
  id: string;
  ppc_id: string;
  perfil: string;
  perfilNumero: number;
};

export function CreateDisciplinaPPC({
  open,
  onClose,
  ppc_id,
  semestre,
  modulo,
  reloadList,
}: ICreateDisciplinaPPC) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams();
  const [competencia, setCompetencia] = useState<Competencias[]>([]);
  const [perfil, setPerfil] = useState<Perfils[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplinas[]>([]);
  const [disciplinaId, setDisciplinaId] = useState<DisciplinasOption | null>(null);
  const [versao, setVersao] = useState<Versoes[]>([]);
  const [versaoId, setVersaoId] = useState<VersaosOption | null>(null);
  const [versaoRender, setVersaoRender] = useState<Versoes | null>(null);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    async function getCompetencia() {
      const response = await api.get(`/ppc/${ppc_id}`);

      setCompetencia(response.data.competencias);
      setPerfil(response.data.perfis);
    }

    getCompetencia();
  }, [ppc_id]);

  const CompetenciaOption = useMemo(() => {
    return competencia?.map((competencia1) => {
      return {
        id: competencia1.id,
        label: String(competencia1.competenciaNumero),
      };
    });
  }, [competencia]);

  const PerfilOption = useMemo(() => {
    return perfil.map((perfil1) => {
      return {
        id: perfil1.id,
        label: String(perfil1.perfilNumero),
      };
    });
  }, [perfil]);

  useEffect(() => {
    async function getDisciplinas() {
      const response = await api.get('/disciplinas');

      setDisciplinas(response.data);
    }

    getDisciplinas();
  }, []);

  const DisciplinaOption = useMemo(() => {
    return disciplinas.map((disciplina_1) => {
      return {
        id: disciplina_1.id,
        label: disciplina_1.name,
      };
    });
  }, [disciplinas]);

  useEffect(() => {
    async function getVersao() {
      if (disciplinaId !== null) {
        const response = await api.get('/versoes', {
          params: { disciplina_id: disciplinaId.id },
        });

        setVersao(response.data);
      }
    }

    getVersao();
  }, [disciplinaId, disciplinaId?.id]);

  const VersaoOption = useMemo(() => {
    return versao.map((versao_1) => {
      return {
        id: versao_1.id,
        label: versao_1.disciplina_versao_nome,
      };
    });
  }, [versao]);

  const handleSelectVersion = useCallback(async (newVersaoId?: string) => {
    if (newVersaoId) {
      const response = await api.get(`/versao/${newVersaoId}`);

      setVersaoRender(response.data);
    } else {
      setVersaoRender(null);
    }
  }, []);

  const handleCreate = useCallback(async () => {
    await api.post('/ppc_disciplina_versao', {
      ppc_id,
      disciplina_versao_id: versaoId?.id,
      modulo,
      semestre,
    });

    if (reloadList) {
      reloadList();
    }
    setVersaoId(null);
    setDisciplinaId(null);
    onClose();
  }, [ppc_id, versaoId?.id, modulo, semestre, reloadList, onClose]);

  return (
    <Dialog onClose={onClose} open={open} sx={{ left: '-40%' }}>
      <Box
        sx={{
          display: 'flex',
          align: 'center',
          borderBottom: '1px solid #333',
          background: '#020560',
        }}
      >
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Inserir Versão</DialogTitle>
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
            <Autocomplete
              fullWidth
              value={disciplinaId}
              onChange={(event: any, newValue) => {
                setDisciplinaId(newValue);
              }}
              disablePortal
              id="combo-box-demo"
              options={DisciplinaOption}
              renderInput={(params1) => <TextField {...params1} label="Disciplina" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              value={versaoId}
              onChange={(event: any, newValue) => {
                setVersaoId(newValue);

                handleSelectVersion(newValue?.id);
              }}
              disablePortal
              id="combo-box-demo"
              options={VersaoOption}
              renderInput={(params1) => <TextField {...params1} label="Versao" fullWidth />}
            />
          </Grid>
          {versaoRender && (
            <Dialog
              onClose={() => setVersaoRender(null)}
              open={!!versaoRender}
              sx={{ left: '40%' }}
            >
              <Box sx={{ display: 'flex', align: 'center', borderBottom: '1px solid #333' }}>
                <DialogTitle>Detalhes da Versão</DialogTitle>
                <IconButton
                  color="primary"
                  sx={{ marginLeft: 'auto', padding: '1rem' }}
                  onClick={() => setVersaoRender(null)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Grid container spacing={2} sx={{ padding: '1rem' }}>
                <Grid item xs={6}>
                  <Typography sx={{ textDecoration: 'underline' }}>Disciplina</Typography>
                  <Typography>{versaoRender.disciplina.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ textDecoration: 'underline' }}>Versão</Typography>
                  <Typography>{versaoRender.disciplina_versao_nome}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: '1rem' }}>
                  <Typography sx={{ textDecoration: 'underline' }}>Código</Typography>
                  <Typography>{versaoRender.codigo}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: '1rem' }}>
                  <Typography sx={{ textDecoration: 'underline' }}>Creditos</Typography>
                  <Typography>{versaoRender.credito_quantidade}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: '1rem' }}>
                  <Typography sx={{ textDecoration: 'underline' }}>Ementa</Typography>
                  <Typography>{versaoRender.ementa}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: '1rem' }}>
                  <Typography sx={{ textDecoration: 'underline' }}>Observação</Typography>
                  <Typography>{versaoRender.observacao}</Typography>
                </Grid>
              </Grid>
            </Dialog>
          )}
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              multiple
              id="checkboxes-tags-demo"
              options={CompetenciaOption}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params1) => <TextField {...params1} label="Competencias" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              multiple
              id="checkboxes-tags-demo"
              options={PerfilOption}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params1) => <TextField {...params1} label="Perfil" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
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
