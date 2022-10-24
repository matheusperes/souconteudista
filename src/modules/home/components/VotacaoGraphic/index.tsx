import { ArrowDropDownCircleOutlined } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';

const data = [
  {
    name: 'Exatas',
    porcentagem: '10%',
  },
  {
    name: 'Biologicas',
    porcentagem: '20%',
  },
  {
    name: 'Humanas',
    porcentagem: '30%',
  },
  {
    name: 'Linguísticas',
    porcentagem: '40%',
  },
  {
    name: 'Engenharia',
    porcentagem: '50%',
  },
  {
    name: 'Saúde',
    porcentagem: '100%',
  },
];

export function VotacaoGraphic() {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          sx={{
            ml: '52px',
            color: '#020560',
            fontSize: '20px',
          }}
        >
          Votações
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
              <Typography sx={{ fontSize: '12px' }}>PPC</Typography>
              <ArrowDropDownCircleOutlined sx={{ width: '15px', ml: '5px' }} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', ml: '5px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#EFEFEF',
                padding: '0.3rem',
                borderRadius: '10px',
              }}
            >
              <Typography sx={{ fontSize: '12px' }}>Disciplina</Typography>
              <ArrowDropDownCircleOutlined sx={{ width: '15px', ml: '5px' }} />
            </Box>
          </Box>
        </Box>
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: '0.9rem' }} key={dado.name}>
                <Typography
                  sx={{
                    minWidth: '30%',
                    fontFamily: 'Poppins',
                    fontSize: '15px',
                    color: '#5A5151',
                  }}
                >
                  {dado.name}
                </Typography>
                <Box
                  sx={{
                    maxWidth: '50%',
                    height: '45px',
                    width: '100%',
                    mr: '1rem',
                    ml: '1rem',
                  }}
                >
                  <Box
                    sx={{
                      background: '#2E86AB',
                      width: dado.porcentagem,
                      height: '45px',
                      borderRadius: '5px',
                    }}
                  />
                </Box>
                <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
                  {dado.porcentagem}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
