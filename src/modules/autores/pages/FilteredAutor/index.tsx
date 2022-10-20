import { ArrowForward } from '@mui/icons-material';
import { Box, Breadcrumbs, Divider, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Col, StyledTable } from '#shared/components/StyledTable';
import { useTitle } from '#shared/hooks/title';
import { api } from '#shared/services/axios';

import { IObras } from '#modules/obras/pages/ListObras';

type IObrasAutor = {
  id: string;
  autor_id: string;
  obra_id: string;
  funcao: string;
  obra: IObras;
};

type IAutoresOne = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  quote: string;
  nationality: string;
  obrasAutor: IObrasAutor[];
};

export function FilteredAutor() {
  const { setTitle } = useTitle();
  const params = useParams();

  const [autor, setAutor] = useState<IAutoresOne>();

  const NomeCompleto = `${autor?.first_name} ${autor?.middle_name} ${autor?.last_name}`;

  useEffect(() => {
    setTitle(`Autor - ${NomeCompleto}` || '');
  }, [NomeCompleto, setTitle]);

  const getAutores = useCallback(async () => {
    const response = await api.get(`/autor/${params?.id}`);

    setAutor(response.data);
  }, [params?.id]);

  useEffect(() => {
    getAutores();
  }, [getAutores]);

  const colunas = useMemo<Col<IObrasAutor>[]>(() => {
    return [
      { name: 'Função', personalizarCol: (item) => item.funcao },
      { name: 'Tipo', personalizarCol: (item) => item.obra.item_tipo },
      { name: 'Nome da Obra', personalizarCol: (item) => item.obra.obra_nome },
    ];
  }, []);

  return (
    <Box className="Pagina">
      <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
        <Box>
          <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
            <Link to="/">Home</Link>
            {autor && NomeCompleto && <Link to="/disciplinas">Disciplinas</Link>}
            {autor && NomeCompleto && <Link to="/autores">Autores</Link>}
            {autor && NomeCompleto && <Typography>{NomeCompleto}</Typography>}
          </Breadcrumbs>
        </Box>
        {autor && NomeCompleto && (
          <>
            <Box sx={{ marginTop: '1rem' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                {NomeCompleto}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '0.35rem' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Citação:</Typography>
              <Typography sx={{ ml: '3px' }}>{autor?.quote}</Typography>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '0.35rem' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Nacionalidade:</Typography>
              <Typography sx={{ ml: '3px' }}>{autor?.nationality}</Typography>
            </Box>
            <Box sx={{ marginTop: '1rem' }}>
              <Typography
                sx={{ color: 'rgba(60, 62, 131, 0.56)', fontSize: '16px', fontWeight: 'bold' }}
              >
                Obras
              </Typography>
              <Divider />
            </Box>
          </>
        )}

        {autor?.obrasAutor && (
          <Box>
            <StyledTable
              colunas={colunas}
              conteudo={autor.obrasAutor}
              // navegationLine={(item) => navigate(`/disciplinas/${item.id}`)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
