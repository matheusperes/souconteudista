import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  Box,
  DialogTitle,
  IconButton,
  Grid,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '#shared/services/axios';

import { IObras } from '#modules/obras/pages/ListObras';

type ICreateObrasModal = {
  updateListObras: (obra: IObras) => void;
  open: boolean;
  onClose: () => void;
};

export type ObraOption = {
  id: string;
  label: string;
};

export function CreateObrasModal({ updateListObras, open, onClose }: ICreateObrasModal) {
  const [tipo, setTipo] = useState('');
  const [obraName, setObraName] = useState('');
  const [capituloName, setCapituloName] = useState('');
  const [serieName, setSerieName] = useState('');
  const [colecaoName, setColecaoName] = useState('');
  const [organizadorName, setOrganizadorName] = useState('');
  const [funcao, setFuncao] = useState('');
  const [cidade, setCidade] = useState('');
  const [editora, setEditora] = useState('');
  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');
  const [dia, setDia] = useState('');
  const [volume, setVolume] = useState('');
  const [edicao, setEdicao] = useState('');
  const [resumo, setResumo] = useState('');
  const [periodicoNome, setPeriodicoNome] = useState('');
  const [periodicoAbrev, setPeriodicoAbrev] = useState('');
  const [numero, setNumero] = useState('');
  const [paginas, setPaginas] = useState('');
  const [idioma, setIdioma] = useState('');
  const [doi, setDoi] = useState('');
  const [isbn, setIsbn] = useState('');
  const [issn, setIssn] = useState('');
  const [url, SetUrl] = useState('');
  const [acesso, setAcesso] = useState('');
  const [obras, setObras] = useState<IObras[]>([]);
  const [obraId, setObraId] = useState<ObraOption | null>(null);

  useEffect(() => {
    async function getObras() {
      const response = await api.get('/obras');

      setObras(response.data);
    }

    getObras();
  }, []);

  const obraOptions = useMemo(() => {
    return obras.map((obra) => {
      return {
        id: obra.id,
        label: obra.obra_nome,
      };
    });
  }, [obras]);

  const handleCreate = useCallback(async () => {
    if (obraId !== null) {
      const response = await api.post('/obras', {
        item_tipo: tipo,
        obra_nome: obraName,
        capitulo_nome: capituloName,
        serie_nome: serieName,
        colecao_nome: colecaoName,
        organizador_editor_nome: organizadorName,
        funcao,
        cidade,
        editora,
        ano,
        mes,
        dia,
        volume,
        edicao,
        resumo,
        periodico_nome: periodicoNome,
        periodico_abreviacao: periodicoAbrev,
        numero,
        paginas,
        idioma,
        doi,
        isbn,
        issn,
        url,
        acesso_em: acesso,
        contido_em: obraId.id,
      });

      updateListObras(response.data);
      setTipo('');
      setObraName('');
      setCapituloName('');
      setSerieName('');
      setColecaoName('');
      setOrganizadorName('');
      setFuncao('');
      setCidade('');
      setEditora('');
      setAno('');
      setMes('');
      setDia('');
      setVolume('');
      setEdicao('');
      setResumo('');
      setPeriodicoNome('');
      setPeriodicoAbrev('');
      setNumero('');
      setPaginas('');
      setIdioma('');
      setDoi('');
      setIsbn('');
      setIssn('');
      SetUrl('');
      setAcesso('');
      setObraId(null);
      onClose();
    }
  }, [
    obraId,
    tipo,
    obraName,
    capituloName,
    serieName,
    colecaoName,
    organizadorName,
    funcao,
    cidade,
    editora,
    ano,
    mes,
    dia,
    volume,
    edicao,
    resumo,
    periodicoNome,
    periodicoAbrev,
    numero,
    paginas,
    idioma,
    doi,
    isbn,
    issn,
    url,
    acesso,
    updateListObras,
    onClose,
  ]);

  return (
    <Dialog onClose={onClose} open={open}>
      <Box sx={{ display: 'flex', align: 'center', borderBottom: '1px solid #333' }}>
        <DialogTitle>Cadastrar Obra</DialogTitle>
        <IconButton color="primary" sx={{ marginLeft: 'auto', padding: '1rem' }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nome do Organizador"
                variant="outlined"
                value={organizadorName}
                onChange={(event) => setOrganizadorName(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Função"
                variant="outlined"
                value={funcao}
                onChange={(event) => setFuncao(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Tipo da Obra"
                variant="outlined"
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nome da Obra"
                variant="outlined"
                value={obraName}
                onChange={(event) => setObraName(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nome do Capitulo"
                variant="outlined"
                value={capituloName}
                onChange={(event) => setCapituloName(event.target.value)}
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nome da Série"
                variant="outlined"
                value={serieName}
                onChange={(event) => setSerieName(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nome da Coleção"
                variant="outlined"
                value={colecaoName}
                onChange={(event) => setColecaoName(event.target.value)}
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Cidade"
                variant="outlined"
                value={cidade}
                onChange={(event) => setCidade(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Editora"
                variant="outlined"
                value={editora}
                onChange={(event) => setEditora(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Ano"
                variant="outlined"
                value={ano}
                onChange={(event) => setAno(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Mês"
                variant="outlined"
                value={mes}
                onChange={(event) => setMes(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Dia"
                variant="outlined"
                value={dia}
                onChange={(event) => setDia(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Volume"
                variant="outlined"
                value={volume}
                onChange={(event) => setVolume(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Edição"
                variant="outlined"
                value={edicao}
                onChange={(event) => setEdicao(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Resumo"
                variant="outlined"
                value={resumo}
                onChange={(event) => setResumo(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Nome do Periódico"
                variant="outlined"
                value={periodicoNome}
                onChange={(event) => setPeriodicoNome(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Abreviação do Periódico"
                variant="outlined"
                value={periodicoAbrev}
                onChange={(event) => setPeriodicoAbrev(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Número"
                variant="outlined"
                value={numero}
                onChange={(event) => setNumero(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Páginas"
                variant="outlined"
                value={paginas}
                onChange={(event) => setPaginas(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Idioma"
                variant="outlined"
                value={idioma}
                onChange={(event) => setIdioma(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Doi"
                variant="outlined"
                value={doi}
                onChange={(event) => setDoi(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="ISBN"
                variant="outlined"
                value={isbn}
                onChange={(event) => setIsbn(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="ISSN"
                variant="outlined"
                value={issn}
                onChange={(event) => setIssn(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="URL"
                variant="outlined"
                value={url}
                onChange={(event) => SetUrl(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Acessado em"
                variant="outlined"
                value={acesso}
                onChange={(event) => setAcesso(event.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Autocomplete
                value={obraId}
                onChange={(event: any, newValue) => {
                  setObraId(newValue);
                }}
                disablePortal
                id="combo-box-demo"
                options={obraOptions}
                renderInput={(params) => <TextField {...params} label="Contido em" fullWidth />}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" marginBottom="1rem">
              <Button fullWidth variant="contained" onClick={handleCreate}>
                Inserir
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
