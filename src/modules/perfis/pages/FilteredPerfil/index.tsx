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

type IPerfil = {
  id: string;
  ppc_id: string;
  perfil: string;
  perfilNumero: string;
  ppc: IPPC;
};

export function FilteredPerfil() {
  const params = useParams();
  const { setTitle } = useTitle();

  const [perfil, setPerfil] = useState<IPerfil>();
  const [ppc, setPpc] = useState<InfoPpcs>();

  useEffect(() => {
    setTitle('Perfil do egresso');
  }, [setTitle]);

  const getPerfil = useCallback(async () => {
    const response = await api.get(`/perfil/${params?.id}`);

    setPerfil(response.data);
  }, [params?.id]);

  useEffect(() => {
    getPerfil();
  }, [getPerfil]);

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
            <Typography>Perfis</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ marginTop: '0.5rem', textAlign: 'justify' }}>
          <Box sx={{ background: 'rgba(239, 239, 239, 0.45)', padding: '1.5rem ' }}>
            <Typography>{`${perfil?.perfilNumero} - ${perfil?.perfil}`}</Typography>

            <Typography sx={{}} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
