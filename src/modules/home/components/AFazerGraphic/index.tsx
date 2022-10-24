import { ArrowDropDownCircleOutlined } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';

const data = [
  {
    id: '1',
    name: 'Participação de uma votação',
    data: '20/10/2022',
    color: '#F60E0E',
  },
  {
    id: '2',
    name: 'Elaborar um conteúdo',
    data: '20/10/2022',
    color: '#DF5A35',
  },
  {
    id: '23',
    name: 'Validar um conteúdo',
    data: '20/10/2022',
    color: '#DF5A35',
  },
  {
    id: '4',
    name: 'Aprovar um conteúdo',
    data: '20/10/2022',
    color: '#DF5A35',
  },
  {
    id: '5',
    name: 'Aprovar um conteúdo',
    data: '20/10/2022',
    color: '#38A34F',
  },
  {
    id: '6',
    name: 'Ajustar texto',
    data: '20/10/2022',
    color: '#38A34F',
  },
];

export function AFazerGraphic() {
  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              ml: '52px',
              color: '#020560',
              fontSize: '20px',
            }}
          >
            Atividades a Fazer
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
                <Typography sx={{ fontSize: '12px' }}>Lista de Afazeres</Typography>
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
                <Typography sx={{ fontSize: '12px' }}>Resumo</Typography>
                <ArrowDropDownCircleOutlined sx={{ width: '15px', ml: '5px' }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Paper
          elevation={1}
          sx={{
            background: '#EFEFEF',
            padding: '1rem',
            mt: '1rem',
          }}
        >
          <Box>
            {data.map((data1) => (
              <Box
                key={data1.id}
                sx={{
                  background: '#E4E4EA',
                  mt: '0.6rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography sx={{ color: data1.color, fontSize: '12px' }}>
                      {data1.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: data1.color, fontSize: '12px' }}
                    >{`Data Limite ${data1.data}`}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </>
  );
}
