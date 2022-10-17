import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { TableRow, TableCell, Collapse, Box, Typography, Grid, Divider } from '@mui/material';
import { useState } from 'react';

import { Area } from '#modules/areas/pages/FilteredDisciplinas';
import { toRoman } from '#modules/ppcs/pages/ListPpcInfo/roman';

type Competencia = {
  id: string;
  ppc_id: string;
  competencia: string;
  competenciaNumero: number;
};

type Perfis = {
  id: string;
  ppc_id: string;
  perfil: string;
  perfilNumero: number;
};

type ppc = {
  id: string;
  curso_id: string;
  anoVoto: number;
  dataInicio: string;
  dataFim: string;
  horaCredito: number;
  quantSemestres: number;
  ppc_ativo: true;
  competencias: Competencia[];
  perfis: Perfis[];
};

type PPCDisciplinaVersoes = {
  id: string;
  ppc_id: string;
  disciplina_versao_id: string;
  modulo: number;
  semestre: number;
  ppc: ppc;
};

type Disciplinas =
  | {
      id: string;
      name: string;
      area_id: string;
      sigla: string;
      area: Area;
    }
  | undefined;

type PPCRowProps = {
  ppcDisciplina: PPCDisciplinaVersoes;
  disciplina: Disciplinas;
};

export function PPCRow({ ppcDisciplina, disciplina }: PPCRowProps) {
  const [ppcsCollapseOne, setPpcsCollapseOne] = useState(false);
  const [ppcsCollapseOnePerfil, setPpcsCollapseOnePerfil] = useState(false);
  const [ppcsCollapseOneCompetencia, setPpcsCollapseOneCompetencia] = useState(false);

  return (
    <>
      <TableRow
        onClick={() => {
          setPpcsCollapseOne(!ppcsCollapseOne);
        }}
        sx={{
          cursor: 'pointer',
          background: '#fff',
          ...(ppcDisciplina.ppc.ppc_ativo && {
            borderRadius: '10px',
            boxShadow: '0px 5px rgba(237, 229, 41, 0.25)',
          }),
          ...(!ppcDisciplina.ppc.ppc_ativo === false && {
            borderRadius: '10px',
            boxShadow: '0px 5px rgba(216, 68, 68, 0.25)',
          }),
          // ...(ppcDisciplina.ppc.curso.ppc_ativo === ppcDisciplina.ppc.id && {
          //   borderRadius: '10px',
          //   boxShadow: '0px 5px rgba(67, 200, 104, 0.25)',
          // }),
        }}
      >
        <TableCell>{disciplina?.area.name}</TableCell>
        <TableCell align="center">{ppcDisciplina.ppc.anoVoto}</TableCell>
        <TableCell align="center">{ppcDisciplina.ppc.dataInicio}</TableCell>
        <TableCell align="center">{ppcDisciplina.ppc.dataFim}</TableCell>
        <TableCell align="center">{ppcDisciplina.ppc.horaCredito}</TableCell>
        <TableCell align="center">{ppcDisciplina.ppc.quantSemestres}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={6}
          sx={{
            padding: '0 !important',
            background: '#fff !important',
          }}
        >
          <Collapse in={ppcsCollapseOne}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                marginTop: '1rem',
                padding: '0.2rem',
              }}
              onClick={() => {
                setPpcsCollapseOnePerfil(!ppcsCollapseOnePerfil);
              }}
            >
              {ppcsCollapseOnePerfil ? (
                <ArrowDropDown sx={{ color: '#7678D7' }} />
              ) : (
                <ArrowRight sx={{ color: '#7678D7' }} />
              )}
              <Typography
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Perfis
              </Typography>
            </Box>
            <Collapse in={ppcsCollapseOnePerfil}>
              {ppcDisciplina.ppc.perfis.map((perfil) => (
                <Grid container spacing={0} key={perfil.id}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        padding: '0.2rem',
                        marginLeft: '0.2rem',
                      }}
                    >
                      <Divider />
                    </Box>
                    <Box
                      sx={{
                        padding: '0.2rem',
                        marginLeft: '0.2rem',
                        mt: '0.2rem',
                      }}
                    >
                      {toRoman(perfil.perfilNumero)} - {perfil.perfil}
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Collapse>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                marginTop: '1rem',
                padding: '0.2rem',
              }}
              onClick={() => {
                setPpcsCollapseOneCompetencia(!ppcsCollapseOneCompetencia);
              }}
            >
              {ppcsCollapseOneCompetencia ? (
                <ArrowDropDown sx={{ color: '#7678D7' }} />
              ) : (
                <ArrowRight sx={{ color: '#7678D7' }} />
              )}
              <Typography
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setPpcsCollapseOneCompetencia(!ppcsCollapseOneCompetencia);
                }}
              >
                Competências
              </Typography>
            </Box>
            <Collapse in={ppcsCollapseOneCompetencia}>
              {ppcDisciplina.ppc.competencias.map((comp) => (
                <Grid container spacing={0} key={comp.id}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        padding: '0.2rem',
                        marginLeft: '0.2rem',
                      }}
                    >
                      <Divider />
                    </Box>
                    <Box
                      sx={{
                        padding: '0.2rem',
                        marginLeft: '0.2rem',
                        mt: '0.2rem',
                      }}
                    >
                      {toRoman(comp.competenciaNumero)} - {comp.competencia}
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Collapse>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
