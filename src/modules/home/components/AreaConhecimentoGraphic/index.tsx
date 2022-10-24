import { ArrowDropDownCircleOutlined } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';

const data = [
  {
    name: 'Economia',
    sub: 'ECON',
    porcentagem: '100%',
    numero: '03',
    versoes: [
      {
        sigla: 'ECON2-1',
      },
      {
        sigla: 'ECON2-2',
      },
      {
        sigla: 'ECON2-3',
      },
    ],
  },
  {
    name: 'Gestão de Custos ',
    sub: 'GESTC',
    porcentagem: '100%',
    numero: '02',
    versoes: [
      {
        sigla: 'GESTC2-1',
      },
      {
        sigla: 'GESTC2-2',
      },
    ],
  },
  {
    name: 'Finanças Corporativas',
    porcentagem: '100%',
    sub: 'FINC',
    numero: '04',
    versoes: [
      {
        sigla: 'FINC2-1',
      },
      {
        sigla: 'FINC2-2',
      },
      {
        sigla: 'FINC2-3',
      },
      {
        sigla: 'FINC2-4',
      },
    ],
  },
  {
    name: 'Matemática Financeira ',
    porcentagem: '100%',
    sub: 'MAFT',
    numero: '03',
    versoes: [
      {
        sigla: 'MAFT2-1',
      },
      {
        sigla: 'MAFT2-2',
      },
      {
        sigla: 'MAFT2-3',
      },
    ],
  },
  {
    name: 'Matemática Aplicada',
    porcentagem: '100%',
    sub: 'MATAP',
    numero: '04',
    versoes: [
      {
        sigla: 'MATAP2-1',
      },
      {
        sigla: 'MATAP2-2',
      },
      {
        sigla: 'MATAP2-3',
      },
      {
        sigla: 'MATAP2-4',
      },
    ],
  },
];

export function AreaConhecimentoGraphic() {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            ml: '52px',
            color: '#020560',
            fontSize: '20px',
          }}
        >
          Área do Conhecimeto
        </Typography>
        <Box
          sx={{
            ml: '50px',
            background: '#E4E4EA',
            borderRadius: '12px',
            alignItems: 'center',
            padding: '0.3rem',
            display: 'flex',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#E4E4EA',
                padding: '0.3rem',
              }}
            >
              <Typography sx={{ fontSize: '12px' }}>Área</Typography>
              <ArrowDropDownCircleOutlined sx={{ width: '15px', ml: '5px' }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography sx={{ fontSize: '13px', ml: '52px', color: '#5A5151' }}>Exatas</Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: '0.1rem' }}>
        <Grid item xs={12}>
          <Paper
            elevation={1}
            sx={{
              background: '#EFEFEF',
              padding: '1rem',
            }}
          >
            {data.map((dado) => (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: '1.1rem' }} key={dado.name}>
                <Box sx={{ minWidth: '33%' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontSize: '14px',
                      color: '#5A5151',
                      fontWeight: 'bold',
                    }}
                  >
                    {dado.name}
                  </Typography>
                  <Typography sx={{ fontSize: '13px' }}>{dado.sub}</Typography>
                </Box>

                <Box
                  sx={{
                    maxWidth: '50%',
                    height: '20px',
                    width: '100%',
                    mr: '1rem',
                    ml: '1rem',
                    border: '1px solid #333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: dado.porcentagem,
                      height: '100%',
                      borderRadius: '5px',
                      padding: '2px',
                      display: 'flex',
                    }}
                  >
                    {dado.versoes.map((dados3) => (
                      <Box
                        key={dados3.sigla}
                        sx={{
                          display: 'flex',
                          width: '5px',
                          height: '100%',
                          background: '#E8923D',
                          ml: '2px',
                        }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ mt: '2px', mr: '3px' }}>
                    <Typography>{dado.numero}</Typography>
                  </Box>
                </Box>
                <Box>
                  {dado.versoes?.map((dad) => (
                    <Box key={dad.sigla}>
                      <Typography
                        sx={{ fontFamily: 'Poppins', fontSize: '10px', color: '#5A5151' }}
                      >
                        {dad.sigla}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
