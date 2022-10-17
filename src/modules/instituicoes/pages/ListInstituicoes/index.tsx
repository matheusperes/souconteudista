import { ArrowForward, FileDownloadOutlined } from '@mui/icons-material';
import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  TextField,
  ButtonGroup,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';

import { Col, StyledTable } from '#shared/components/StyledTable';
import { useInstitution } from '#shared/hooks/institution';
import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';
import { api } from '#shared/services/axios';

import { CreateInstituicaoModal } from '#modules/instituicoes/components/CreateInstituicoes';
import { DeleteInstituicaoModal } from '#modules/instituicoes/components/DeleteInstituicao';
import { UpdateInstituicaoModal } from '#modules/instituicoes/components/UpdateInstituicoes';

export type IInstituicoes = {
  id: string;
  name: string;
  description: string;
  sigla: string;
  link: string;
  padrao: boolean;
};

export function ListInstituicoes() {
  const { setTitle } = useTitle();
  const { message } = useToast();
  const { startLoading, stopLoading } = useLoading();
  const { instituicao } = useInstitution();

  const [search, setSearch] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<any>(null);
  const [instituicoes, setInstituicoes] = useState<IInstituicoes[]>([]);

  useEffect(() => {
    setTitle('Instituições');
  }, [setTitle]);

  const getInstituicoes = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get('/instituicoes', {
        params: { instituicao_id: instituicao?.id },
      });
      setInstituicoes(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [instituicao?.id, message, startLoading, stopLoading]);

  useEffect(() => {
    getInstituicoes();
  }, [getInstituicoes]);

  const filteredInstituicao = useMemo(() => {
    return instituicoes.filter((instituicao1) => {
      return instituicao1.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [instituicoes, search]);

  const colunas = useMemo<Col<IInstituicoes>[]>(() => {
    return [
      { name: 'Instituição', propriedadeName: 'name' },
      { name: 'Sigla', propriedadeName: 'sigla' },
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
    { label: 'Instituição', key: 'name' },
    { label: 'Descricao', key: 'description' },
    { label: 'Sigla', key: 'sigla' },
    { label: 'Ativo', key: 'padrao' },
    { label: 'Link', key: 'link' },
  ];

  const data = instituicoes.map((instituicao2) => ({
    id: instituicao2.id,
    name: instituicao2.name,
    description: instituicao2.description,
    sigla: instituicao2.sigla,
    padrao: instituicao2.padrao,
    link: instituicao2.link,
  }));

  return (
    <>
      <CreateInstituicaoModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        updateListInstituicao={(inst) => setInstituicoes([...instituicoes, inst])}
      />
      {openUpdate && (
        <UpdateInstituicaoModal
          open={!!openUpdate}
          onClose={() => setOpenUpdate(null)}
          instituicao1_id={openUpdate}
          reloadList={() => getInstituicoes()}
        />
      )}
      {openDelete && (
        <DeleteInstituicaoModal
          open={!!openDelete}
          onClose={() => setOpenDelete(null)}
          instituicao1_id={openDelete}
          reloadList={() => getInstituicoes()}
        />
      )}
      <Box className="Pagina">
        <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
          <Box>
            <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
              <Link to="/">Home</Link>
              <Typography>Instituições</Typography>
            </Breadcrumbs>
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
                Adicionar Instituição
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
            <CSVLink data={data} headers={headers} filename="instituicoes.csv">
              <Tooltip title="Export CSV" placement="left">
                <IconButton>
                  <FileDownloadOutlined />
                </IconButton>
              </Tooltip>
            </CSVLink>
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <StyledTable colunas={colunas} conteudo={filteredInstituicao} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
