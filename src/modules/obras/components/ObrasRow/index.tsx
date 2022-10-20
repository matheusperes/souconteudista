import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Grid,
  Divider,
  ButtonGroup,
  IconButton,
} from '@mui/material';
import { useState } from 'react';

import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';

import { IObras } from '#modules/obras/pages/ListObras';

import { DeleteObra } from '../DeleteObra';
import { UpdateObraModal } from '../UpdateObraModal';

type ObrasRowProps = {
  obra123: IObras;
  reloadPage: () => void;
};

export function ObrasRow({ obra123, reloadPage }: ObrasRowProps) {
  const [ObraCollapse, setObraCollapse] = useState(false);
  const [autorCollapse, setAutorCollapse] = useState(false);
  const [resumoCollapse, setResumoCollapse] = useState(false);
  const [dadosCollapse, setDadosCollapse] = useState(false);

  const [openUpdate, setOpenUpdate] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState<any>(null);

  return (
    <>
      {!!openUpdate && (
        <UpdateObraModal
          open={!!openUpdate}
          onClose={() => setOpenUpdate(null)}
          obra_id={openUpdate}
          reloadList={() => reloadPage()}
        />
      )}

      {!!openDelete && (
        <DeleteObra
          open={!!openDelete}
          onClose={() => setOpenDelete(null)}
          obra_id={openDelete}
          reloadList={() => reloadPage()}
        />
      )}
      <TableRow
        onClick={() => {
          setObraCollapse(!ObraCollapse);
        }}
        sx={{
          boxShadow: '0px 0px 0px 8px #EFEFEF',
          borderRadius: '10px 10px 0 0',
          cursor: 'pointer',
        }}
      >
        <TableCell align="center">{obra123?.obra_nome}</TableCell>
        <TableCell align="center">{obra123?.item_tipo}</TableCell>
        <TableCell align="center">{obra123?.ano}</TableCell>
        <TableCell align="center" sx={{ borderRadius: '0 10px 10px 0 !important' }}>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <IconButton
              color="primary"
              onClick={async (e) => {
                e.stopPropagation();

                setOpenDelete(obra123?.id);
              }}
            >
              <img src={Delete} alt="Delete" />
            </IconButton>
            <IconButton
              color="primary"
              onClick={async (e) => {
                e.stopPropagation();

                setOpenUpdate(obra123?.id);
              }}
            >
              <img src={Edit} alt="Edit" />
            </IconButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={6}
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            borderRadius: '10px 0 0 10px !important',
          }}
        >
          <Collapse in={ObraCollapse}>
            <Box sx={{ padding: '1rem' }}>
              {/* Dados Gerais */}
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    mb: '0.5rem',
                  }}
                  onClick={() => {
                    setDadosCollapse(!dadosCollapse);
                  }}
                >
                  {dadosCollapse ? (
                    <ArrowDropDown sx={{ color: '#7678D7' }} />
                  ) : (
                    <ArrowRight sx={{ color: '#7678D7' }} />
                  )}
                  <Typography sx={{ fontWeight: 'bold' }}>Dados Gerais</Typography>
                </Box>
                {/* Fim Dados Gerais */}
                {/* Collapse Dados Gerais */}
                <Box>
                  <Collapse in={dadosCollapse}>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: 0, padding: '0.5rem' }}>
                      <Grid item xs={3}>
                        <Box>
                          <Typography sx={{ fontWeight: 'bold' }}>Tipo da Obra</Typography>

                          <Typography>{obra123.item_tipo}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box>
                          <Typography sx={{ fontWeight: 'bold' }}>Ano</Typography>

                          <Typography>{obra123.ano}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box>
                          <Typography sx={{ fontWeight: 'bold' }}>Nome</Typography>

                          <Typography>{obra123.obra_nome}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box>
                          <Typography sx={{ fontWeight: 'bold' }}>Editora</Typography>

                          <Typography>{obra123.editora}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box>
                          <Typography sx={{ fontWeight: 'bold' }}>ISSN / ISBN</Typography>

                          <Typography>{`${obra123.issn} / ${obra123.isbn}`}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Collapse>
                </Box>
                {/* Fim Collapse Dados Gerais */}
              </Box>

              {/* Autores */}
              <Box>
                {/* Autores */}
                <Box
                  onClick={() => {
                    setAutorCollapse(!autorCollapse);
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {autorCollapse ? (
                    <ArrowDropDown sx={{ color: '#7678D7' }} />
                  ) : (
                    <ArrowRight sx={{ color: '#7678D7' }} />
                  )}
                  <Typography sx={{ fontWeight: 'bold' }}>Autores</Typography>
                </Box>
                {/* Fim Autores */}
                {/* Autores Collapse */}
                <Box>
                  <Collapse in={autorCollapse}>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: 0, padding: '0.5rem' }}>
                      <Grid item xs={6}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                          }}
                        >
                          Autor
                        </Typography>

                        {obra123.obraAutores?.map((autores) => (
                          <Typography
                            key={autores.autor_id}
                          >{`${autores?.autor.first_name} ${autores?.autor.middle_name} ${autores?.autor.last_name}`}</Typography>
                        ))}
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ fontWeight: 'bold' }}>Função</Typography>

                        {obra123.obraAutores?.map((autores) => (
                          <Typography key={autores.autor.quote}>{autores?.funcao}</Typography>
                        ))}
                      </Grid>
                    </Grid>
                  </Collapse>
                </Box>
                {/* Fim Autores Collapse */}
              </Box>

              {/* Resumo */}
              <Box sx={{ mt: '0.5rem' }}>
                <Box
                  onClick={() => {
                    setResumoCollapse(!resumoCollapse);
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    mb: '0.5rem',
                  }}
                >
                  {resumoCollapse ? (
                    <ArrowDropDown sx={{ color: '#7678D7' }} />
                  ) : (
                    <ArrowRight sx={{ color: '#7678D7' }} />
                  )}
                  <Typography sx={{ fontWeight: 'bold' }}>Resumo</Typography>
                </Box>
                {/* Resumo Collapse */}
                <Box>
                  <Collapse in={resumoCollapse}>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: 0, padding: '0.5rem' }}>
                      <Grid item xs={12}>
                        <Typography>{obra123.resumo}</Typography>
                      </Grid>
                    </Grid>
                  </Collapse>
                </Box>
                {/* Fim Resumo Collapse */}
              </Box>
              {/* Fim Resumo */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
