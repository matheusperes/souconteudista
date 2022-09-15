import { ArrowForward } from '@mui/icons-material';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useTitle } from '#shared/hooks/title';
import { api } from '#shared/services/axios';

import { InfoPpcs } from '#modules/ppcs/pages/ListPpcInfo';

type DisciplinaAPI = {
  id: string;
  modulo: number;
  semestre: number;
  created_at: string;
};

type Curso = {
  id: string;
  name: string;
};

export type IPPC = {
  id: string;
  curso_id: string;
  anoVoto: number;
  dataInicio: string;
  dataFim: string;
  horaCredito: number;
  quantSemestres: number;
  curso: Curso;
  ppcDisciplinaVersoes?: DisciplinaAPI[];
};

type ICompetencia = {
  id: string;
  ppc_id: string;
  competencia: string;
  competenciaNumero: string;
  ppc: IPPC;
};

export function FilteredCompetencia() {
  const params = useParams();
  const { setTitle } = useTitle();

  const [competencia, setCompetencia] = useState<ICompetencia>();
  const [ppc, setPpc] = useState<InfoPpcs>();

  useEffect(() => {
    setTitle('Competências e habilidades');
  }, [setTitle]);

  const getCompetencia = useCallback(async () => {
    const response = await api.get(`/competencia/${params?.id}`);

    setCompetencia(response.data);
  }, [params?.id]);

  useEffect(() => {
    getCompetencia();
  }, [getCompetencia]);

  const getPpc = useCallback(async () => {
    const response = await api.get(`/ppc/${params?.ppc_id}`);

    setPpc(response.data);
  }, [params?.ppc_id]);

  useEffect(() => {
    getPpc();
  }, [getPpc]);

  return (
    <Box className="Pagina">
      <Box sx={{ mt: '1rem', width: '100%' }}>
        <Box sx={{ padding: '1.5rem' }}>
          <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
            <Link to="/">Home</Link>
            <Link to="/cursos">Cursos</Link>
            <Link to={`/cursos/${ppc?.curso.id}/ppcs`}>{ppc?.curso?.name}</Link>
            <Link to={`/cursos/${ppc?.curso.id}/ppcs/${ppc?.id}`}>{`PPC ${ppc?.anoVoto}`}</Link>
            <Typography>Competências</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ marginTop: '0.5rem', textAlign: 'justify' }}>
          <Box sx={{ background: 'rgba(239, 239, 239, 0.45)', padding: '1.5rem ' }}>
            <Typography>{`${competencia?.competenciaNumero} - ${competencia?.competencia}`}</Typography>

            <Typography sx={{}} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
