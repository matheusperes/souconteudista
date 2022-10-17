import { ArrowForward, FileDownloadOutlined } from '@mui/icons-material';
import {
  Box,
  Typography,
  Stack,
  Button,
  Breadcrumbs,
  TextField,
  ButtonGroup,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Link, useNavigate } from 'react-router-dom';

import { Col, StyledTable } from '#shared/components/StyledTable';
import { useInstitution } from '#shared/hooks/institution';
import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { CreateAreaModal } from '#modules/areas/components/CreateArea';
import { DeleteAreaModal } from '#modules/areas/components/DeleteArea';
import { UpdateAreaModal } from '#modules/areas/components/UpdateArea';

type IAreas = {
  id: string;
  name: string;
  description: string;
};

export function ListAreas() {
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const { message } = useToast();
  const { startLoading, stopLoading } = useLoading();
  const { instituicao } = useInstitution();

  const [search, setSearch] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<any>(null);
  const [areas, setAreas] = useState<IAreas[]>([]);

  useEffect(() => {
    setTitle('Áreas');
  }, [setTitle]);

  const getAreas = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get('/areas', {
        params: { instituicao_id: instituicao?.id },
      });
      setAreas(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [instituicao?.id, message, startLoading, stopLoading]);

  useEffect(() => {
    getAreas();
  }, [getAreas]);

  const filteredAreas = useMemo(() => {
    return areas.filter((area1) => {
      return area1.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [areas, search]);

  const colunas = useMemo<Col<IAreas>[]>(() => {
    return [
      { name: 'Área', propriedadeName: 'name' },
      { name: 'Descrição', propriedadeName: 'description' },
      {
        name: 'Ações',
        personalizarCol: (item) => {
          return (
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              <IconButton
                color="primary"
                onClick={async (e) => {
                  e.stopPropagation();

                  setOpenDelete(item.id);
                }}
              >
                <img src={Delete} alt="Delete" />
              </IconButton>
              <IconButton
                color="primary"
                onClick={async (e) => {
                  e.stopPropagation();

                  setOpenUpdate(item.id);
                }}
              >
                <img src={Edit} alt="Edit" />
              </IconButton>
            </ButtonGroup>
          );
        },
      },
    ];
  }, []);

  const headers = [
    { label: 'id', key: 'id' },
    { label: 'Area', key: 'area' },
    { label: 'Descricao', key: 'description' },
  ];

  const data = areas.map((area) => ({
    id: area.id,
    area: area.name,
    description: area.description,
  }));

  return (
    <>
      <CreateAreaModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        updateListArea={(area2) => setAreas([...areas, area2])}
      />
      {openUpdate && (
        <UpdateAreaModal
          open={!!openUpdate}
          onClose={() => setOpenUpdate(null)}
          area_id={openUpdate}
          reloadList={() => getAreas()}
        />
      )}
      {openDelete && (
        <DeleteAreaModal
          open={!!openDelete}
          onClose={() => setOpenDelete(null)}
          area_id={openDelete}
          reloadList={() => getAreas()}
        />
      )}
      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Typography>Áreas</Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              marginTop: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Stack direction="row" spacing={8}>
              <Button
                sx={{
                  color: '#020560',
                  fontWeight: 'bold',
                  textDecoration: 'underline 2px',
                  textUnderlineOffset: '10px',
                  borderRadius: '50px',
                  '&:hover': { textDecoration: 'underline 2px', background: '#E5E5E5' },
                }}
                onClick={() => navigate('/areas')}
              >
                Áreas do Conhecimento
              </Button>
              <Button
                sx={{ color: '#000', fontWeight: 'bold' }}
                onClick={() => navigate('/disciplinas')}
              >
                Disciplinas
              </Button>
              <Button
                sx={{ color: '#000', fontWeight: 'bold' }}
                onClick={() => navigate('/versoes')}
              >
                Versões de Disciplinas
              </Button>
              <Button onClick={() => navigate('/obras')} sx={{ color: '#000', fontWeight: 'bold' }}>
                Obras
              </Button>
              <Button
                sx={{ color: '#000', fontWeight: 'bold' }}
                onClick={() => navigate('/autores')}
              >
                Autores
              </Button>
            </Stack>
          </Box>
          <Box sx={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button
                variant="contained"
                sx={{ background: '#020560', '&:hover': { background: '#020560' } }}
                onClick={() => {
                  setOpenCreate(true);
                }}
              >
                Adicionar Área
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <TextField
                sx={{ width: '166px' }}
                id="outlined-search"
                placeholder="Pesquisar"
                type="search"
                variant="outlined"
                size="small"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: '0.5rem',
            }}
          >
            <Box />
            <CSVLink data={data} headers={headers} filename="areas.csv">
              <Tooltip title="Export CSV" placement="left">
                <IconButton>
                  <FileDownloadOutlined />
                </IconButton>
              </Tooltip>
            </CSVLink>
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <StyledTable
              colunas={colunas}
              conteudo={filteredAreas}
              navegationLine={(item) => navigate(`/areas/${item.id}`)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
