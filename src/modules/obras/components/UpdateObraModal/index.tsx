import { yupResolver } from '@hookform/resolvers/yup';
import { Add, Clear } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  Box,
  DialogTitle,
  IconButton,
  Grid,
  Button,
  Autocomplete,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormSelect } from '#shared/components/Form/FormSelect';
import { MyTextField } from '#shared/components/Form/TextField';
import { useLoading } from '#shared/hooks/loading';
import { useToast } from '#shared/hooks/toast';
import { api } from '#shared/services/axios';

import { IObras } from '../../pages/ListObras';
import { IAutores } from '../CreateObraAutorModal';

type IUpdateObraModal = {
  open: boolean;
  onClose: () => void;
  obra_id: string;
  reloadList?: () => void;
};

type ObrasOpions = {
  id: string;
  label: string;
};

type IForm = {
  item_tipo: string;
  obra_nome: string;
  serie_nome: string;
  colecao_nome: string;
  cidade: string;
  editora: string;
  dia: number;
  mes: string;
  ano: number;
  volume: string;
  edicao: string;
  resumo: string;
  periodico_nome: string;
  periodico_abreviacao: string;
  numero: string;
  paginas: string;
  idioma: string;
  doi: string;
  isbn: string | null;
  issn: string | null;
  url: string;
  acesso_em: string;
  contido_em: ObrasOpions;
};

const validateForm = yup.object().shape({
  item_tipo: yup.string().required('Obra precisa ter um tipo'),
  obra_nome: yup.string().required('Obra precisa ter um nome'),
  serie_nome: yup.string().required('Obra precisa ter uma série'),
  colecao_nome: yup.string().required('Obra precisa ter uma coleção'),
  cidade: yup.string().required('Obra precisa ter uma cidade'),
  editora: yup.string().required('Obra precisa ter uma editora'),
  dia: yup.number().required('Obra precisa ter um dia'),
  mes: yup.string().required('Obra precisa ter um mês'),
  ano: yup.number().required('Obra precisa ter um ano'),
  volume: yup.string().required('Obra precisa ter um volume'),
  edicao: yup.string().required('Obra precisa ter uma edição'),
  resumo: yup.string().required('Obra precisa ter um resumo'),
  periodico_nome: yup.string().required('Obra precisa ter um periodico'),
  periodico_abreviacao: yup.string().required('periodico precisa ter uma abreviação'),
  numero: yup.string().required('Obra precisa ter um número'),
  paginas: yup.string().required('Obra precisa ter páginas'),
  idioma: yup.string().required('Obra precisa ter um idioma'),
  doi: yup.string().required('Obra precisa ter um doi'),
  url: yup.string().required('Obra precisa ter uma url'),
  acesso_em: yup.string().required('Obra precisa ter uma data de acesso'),
});

type IAutoresMaluco = {
  id_autor: string;
  id: string;
  name: string;
  funcao: string;
};

type IAutoresFuncaoMap = {
  [key: string]: IAutoresMaluco;
};

type AutorOption1 = {
  id: string;
  label: string;
};

type IAutor = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  quote: string;
  nationality: string;
};

type IObraAutores = {
  id: string;
  autor: IAutor;
  autor_id: string;
  funcao: string;
  obra_id: string;
};

type ObrasApi = {
  id: string;
  item_tipo: string;
  obra_nome: string;
  serie_nome: string;
  colecao_nome: string;
  cidade: string;
  editora: string;
  dia: number;
  mes: string;
  ano: number;
  volume: string;
  edicao: string;
  resumo: string;
  periodico_nome: string;
  periodico_abreviacao: string;
  numero: string;
  paginas: string;
  idioma: string;
  doi: string;
  isbn: string;
  issn: string | null;
  url: string;
  acesso_em: string;
  contido_em: string;
  obraParent: IObras | null;
  obraAutores: IObraAutores[];
};

export function UpdateObraModal({ open, onClose, obra_id, reloadList }: IUpdateObraModal) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(validateForm),
  });

  const [data, setData] = useState<ObrasApi | null>(null);
  const [obras, setObras] = useState<IObras[]>([]);

  const [autores, setAutores] = useState<IAutores[]>([]);
  const [autoresId, setAutoresId] = useState<AutorOption1 | null>(null);
  const [funcao, setFuncao] = useState('');
  const [autorFuncao, setAutorFuncao] = useState<IAutoresFuncaoMap>({});

  const handleCreateAutorFuncao = useCallback(() => {
    if (!autoresId || !funcao) {
      return;
    }

    const id = `${autoresId?.id}_${funcao}`;
    const Name = `${autoresId?.label}`;

    setAutoresId(null);
    setFuncao('');

    setAutorFuncao((old) => ({
      ...old,
      [id]: {
        ...autorFuncao,
        id,
        id_autor: autoresId.id,
        name: Name,
        funcao,
      },
    }));
  }, [autorFuncao, autoresId, funcao]);

  const removeAutorFuncao = useCallback((id: string) => {
    setAutorFuncao((old) => {
      const newData = { ...old };

      delete newData[id];

      return newData;
    });
  }, []);

  useEffect(() => {
    async function getAutores() {
      startLoading();
      try {
        const response = await api.get('/autores');

        setAutores(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getAutores();
  }, [message, startLoading, stopLoading]);

  const AutorOption = useMemo(() => {
    return autores.map((autor1) => {
      return {
        id: autor1.id,
        label: `${autor1.first_name} ${autor1.middle_name} ${autor1.last_name}`,
      };
    });
  }, [autores]);

  useEffect(() => {
    async function getObras() {
      startLoading();
      try {
        const response = await api.get('/obras');
        setObras(response.data);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getObras();
  }, [message, startLoading, stopLoading]);

  useEffect(() => {
    async function getObra() {
      startLoading();
      try {
        const response = await api.get<ObrasApi>(`/obra/${obra_id}`);
        setData(response.data);

        const dadosAutor: IAutoresFuncaoMap = {};

        response.data.obraAutores.forEach((oa) => {
          const id = `${oa.autor_id}_${oa.funcao}`;

          const name = `${oa.autor.first_name} ${oa.autor.middle_name} ${oa.autor.last_name}`;

          dadosAutor[id] = {
            id,
            id_autor: oa.autor_id,
            name,
            funcao: oa.funcao,
          };
        });

        setAutorFuncao(dadosAutor);
      } catch (error: any) {
        message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
      } finally {
        stopLoading();
      }
    }

    getObra();
  }, [message, obra_id, startLoading, stopLoading]);

  const ObraOption = useMemo(() => {
    return obras.map((Obra) => {
      return {
        id: Obra.id,
        label: Obra.obra_nome,
      };
    });
  }, [obras]);

  const ApiVar = useMemo(() => {
    if (!data?.obraParent) {
      return null;
    }

    return {
      id: data?.obraParent.id,
      label: data?.obraParent.obra_nome,
    };
  }, [data?.obraParent]);

  const handleUpdate = useCallback(
    async (form: IForm) => {
      try {
        await api.put(`/obras/${obra_id}`, {
          item_tipo: form.item_tipo,
          obra_nome: form.obra_nome,
          serie_nome: form.serie_nome,
          colecao_nome: form.colecao_nome,
          cidade: form.cidade,
          editora: form.editora,
          dia: form.dia,
          mes: form.mes,
          ano: form.ano,
          volume: form.volume,
          edicao: form.edicao,
          resumo: form.resumo,
          periodico_nome: form.periodico_nome,
          periodico_abreviacao: form.periodico_abreviacao,
          numero: form.numero,
          paginas: form.paginas,
          idioma: form.idioma,
          doi: form.doi,
          isbn: form.isbn,
          issn: form.issn,
          url: form.url,
          acesso_em: form.acesso_em,
          contido_em: form.contido_em?.id,
          obraAutores: Object.values(autorFuncao).map((autoresMaluco) => {
            return {
              autor_id: autoresMaluco.id_autor,
              funcao: autoresMaluco.funcao,
            };
          }),
        });
        if (reloadList) {
          reloadList();
        }
        message({ mensagem: 'Obra Atualizada', tipo: 'success' });
        reset();
        onClose();
      } catch (error: any) {
        message({ mensagem: error.response?.data || 'Erro interno do servidor', tipo: 'error' });
      }
    },
    [obra_id, autorFuncao, reloadList, message, reset, onClose],
  );

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
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Atualizar Obra</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        {data && (
          <form onSubmit={handleSubmit(handleUpdate)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.obra_nome}
                  name="obra_nome"
                  control={control}
                  errors={errors.obra_nome}
                  label="Nome da Obra"
                  multiline
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.item_tipo}
                  name="item_tipo"
                  control={control}
                  errors={errors.item_tipo}
                  label="Tipo da Obra"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.serie_nome}
                  name="serie_nome"
                  control={control}
                  errors={errors.serie_nome}
                  label="Nome da Série"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.colecao_nome}
                  name="colecao_nome"
                  control={control}
                  errors={errors.colecao_nome}
                  label="Nome da Coleção"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.cidade}
                  name="cidade"
                  control={control}
                  errors={errors.cidade}
                  label="Nome da Cidade"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.editora}
                  name="editora"
                  control={control}
                  errors={errors.editora}
                  label="Nome da Editora"
                />
              </Grid>
              <Grid item xs={4}>
                <MyTextField
                  defaultValue={data.dia}
                  name="dia"
                  control={control}
                  errors={errors.dia}
                  label="Dia"
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={4}>
                <MyTextField
                  defaultValue={data.mes}
                  name="mes"
                  control={control}
                  errors={errors.mes}
                  label="Mes"
                />
              </Grid>
              <Grid item xs={4}>
                <MyTextField
                  defaultValue={data.ano}
                  name="ano"
                  control={control}
                  errors={errors.ano}
                  label="Ano"
                  inputProps={{ inputMode: 'numeric' }}
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.volume}
                  name="volume"
                  control={control}
                  errors={errors.volume}
                  label="Volume"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.edicao}
                  name="edicao"
                  control={control}
                  errors={errors.edicao}
                  label="Edição"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.resumo}
                  name="resumo"
                  control={control}
                  errors={errors.resumo}
                  label="Resumo"
                  multiline
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.periodico_nome}
                  name="periodico_nome"
                  control={control}
                  errors={errors.periodico_nome}
                  label="Nome do Periodico"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.periodico_abreviacao}
                  name="periodico_abreviacao"
                  control={control}
                  errors={errors.periodico_abreviacao}
                  label="Abreviação do Periodico"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.numero}
                  name="numero"
                  control={control}
                  errors={errors.numero}
                  label="Número"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.paginas}
                  name="paginas"
                  control={control}
                  errors={errors.paginas}
                  label="Páginas"
                />
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={data.idioma}
                  name="idioma"
                  control={control}
                  errors={errors.idioma}
                  label="Idioma"
                />
              </Grid>
              <Grid item xs={4}>
                <MyTextField
                  defaultValue={data.doi}
                  name="doi"
                  control={control}
                  errors={errors.doi}
                  label="Doi"
                />
              </Grid>
              <Grid item xs={4}>
                <MyTextField defaultValue={data.isbn} name="isbn" control={control} label="ISBN" />
              </Grid>
              <Grid item xs={4}>
                <MyTextField defaultValue={data.issn} name="issn" control={control} label="ISSN" />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.url}
                  name="url"
                  control={control}
                  errors={errors.url}
                  label="URL"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextField
                  defaultValue={data.acesso_em}
                  name="acesso_em"
                  control={control}
                  errors={errors.acesso_em}
                  label="Acesso em"
                />
              </Grid>
              <Grid item xs={12}>
                <FormSelect
                  defaultValue={ApiVar}
                  control={control}
                  name="contido_em"
                  label="Contido em"
                  options={ObraOption}
                  optionLabel="label"
                  optionValue="id"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{
                    background: '#020560',
                    color: '#E5E5E5',
                    '&:hover': { background: '#020560', cursor: 'default' },
                  }}
                  fullWidth
                  variant="contained"
                >
                  Adicionar Autores
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  value={autoresId}
                  onChange={(event: any, newValue) => {
                    setAutoresId(newValue);
                  }}
                  disablePortal
                  id="combo-box-demo"
                  options={AutorOption}
                  renderInput={(params) => <TextField {...params} label="Autores" fullWidth />}
                />
                {/* <FormSelect
                control={control}
                name="autores"
                label="Autores"
                options={AutorOption}
                optionLabel="label"
                optionValue="id"
              /> */}
              </Grid>
              <Grid item xs={6}>
                <Box display="flex">
                  <TextField
                    fullWidth
                    label="Função"
                    variant="outlined"
                    value={funcao}
                    onChange={(event) => setFuncao(event.target.value)}
                  />
                  <IconButton
                    sx={{ width: '50px', marginLeft: '1rem' }}
                    onClick={handleCreateAutorFuncao}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {Object.values(autorFuncao).map((autfunc) => (
                    <Grid item xs={6} sm={6} key={autfunc.id}>
                      <Box
                        sx={{ background: '#f4f4f4f4', padding: '0.75rem', borderRadius: '1rem' }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography sx={{ padding: '0.1rem' }}>{autfunc.name}</Typography>
                          <IconButton
                            color="primary"
                            onClick={() => removeAutorFuncao(autfunc.id)}
                            sx={{ marginRight: '5px' }}
                          >
                            <Clear fontSize="small" sx={{ color: '#020560' }} />
                          </IconButton>
                        </Box>

                        <Typography sx={{ padding: '0.1rem' }}>{autfunc.funcao}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Button
                  sx={{
                    background: '#020560',
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
        )}
      </Box>
    </Dialog>
  );
}
