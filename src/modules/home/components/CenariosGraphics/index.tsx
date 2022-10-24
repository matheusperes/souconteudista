import { ArrowDropDownCircleOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  {
    name: 'jan',
    total1: 20,
    total12: 20,
    total: 8,
    total3: 6,
  },
  {
    name: 'fev',
    total1: 17,
    total12: 17,
    total: 8,
    total3: 6,
  },
  {
    name: 'mar',
    total1: 15,
    total12: 15,
    total: 8,
    total3: 6,
  },
  {
    name: 'abr',
    total1: 11,
    total12: 11,
    total: 8,
    total3: 6,
  },
  {
    name: 'mai',
    total1: 7,
    total12: 7,
    total: 8,
    total3: 6,
  },
  {
    name: 'ju',
    total1: 5,
    total12: 5,
    total: 8,
    total3: 6,
  },
];

export function CenariosGraphic() {
  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            sx={{
              ml: '52px',
              color: '#020560',
              fontSize: '20px',
            }}
          >
            Meus Cenários
          </Typography>
          <Box
            sx={{
              ml: '50px',
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
                  borderRadius: '10px',
                }}
              >
                <Typography sx={{ fontSize: '12px', color: '#020560' }}>Ano</Typography>
                <ArrowDropDownCircleOutlined sx={{ width: '15px', ml: '5px' }} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', ml: '5px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#E4E4EA',
                  padding: '0.3rem',
                  borderRadius: '10px',
                }}
              >
                <Typography sx={{ fontSize: '12px', color: '#020560' }}>Semestre</Typography>
                <ArrowDropDownCircleOutlined sx={{ width: '15px', ml: '5px' }} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', mt: '0.5rem' }}>
          <Box sx={{ ml: 'auto', display: 'flex' }}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ background: '#2E86AB', borderRadius: '25%', width: '15px' }} />
              <Typography sx={{ fontSize: '10px', ml: '5px' }}>Sugestões submetidas</Typography>
            </Box>
            <Box sx={{ display: 'flex', ml: '10px', mr: '10px' }}>
              <Box sx={{ background: '#A23B72', borderRadius: '25%', width: '15px' }} />
              <Typography sx={{ fontSize: '10px', ml: '5px' }}>Sugestões salvas</Typography>
            </Box>
            <Box sx={{ display: 'flex', mr: '10px' }}>
              <Box sx={{ background: '#F18F01', borderRadius: '25%', width: '15px' }} />
              <Typography sx={{ fontSize: '10px', ml: '5px' }}>Votado</Typography>
            </Box>
            <Box sx={{ display: 'flex', mr: '10px' }}>
              <Box sx={{ background: '#C73E1D', borderRadius: '25%', width: '15px' }} />
              <Typography sx={{ fontSize: '10px', ml: '5px' }}>Em votação</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <BarChart
        width={520}
        height={385}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total1" stackId="a" fill="#F0BA6C" />
        <Bar dataKey="total12" stackId="a" fill="rgba(46, 134, 171, 0.55)" />
        <Bar dataKey="total" stackId="a" fill="rgba(162, 59, 114, 0.55)" />
        <Bar dataKey="total3" fill="#D98E7C" />
      </BarChart>
    </>
  );
}
