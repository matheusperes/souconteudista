import { ArrowDropDownCircleOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  {
    name: 'Exatas',
    total1: 20,
    total12: 20,
  },
  {
    name: 'Biologicas',
    total1: 17,
    total12: 17,
  },
  {
    name: 'Humanas',
    total1: 15,
    total12: 15,
  },
  {
    name: 'Linguísticas',
    total1: 11,
    total12: 11,
  },
  {
    name: 'Engenharia',
    total1: 7,
    total12: 7,
  },
  {
    name: 'Saúde',
    total1: 5,
    total12: 5,
  },
];

export function PPCGraphic() {
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
            PPCs
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
                <Typography sx={{ fontSize: '12px' }}>Perfil do Egresso</Typography>
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
                <Typography sx={{ fontSize: '12px' }}>Competências</Typography>
                <ArrowDropDownCircleOutlined sx={{ width: '15px', ml: '5px' }} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', mt: '0.5rem' }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ background: '#E78C78', borderRadius: '25%', width: '15px' }} />
            <Typography sx={{ fontSize: '10px', ml: '5px' }}>
              Porcentagem de Competëncia por Disciplina
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', ml: '10px' }}>
            <Box
              sx={{ background: 'rgba(231, 140, 120, 0.58)', borderRadius: '25%', width: '15px' }}
            />
            <Typography sx={{ fontSize: '10px', ml: '5px' }}>
              Porcentagem de Competência por Curso
            </Typography>
          </Box>
        </Box>
      </Box>
      <BarChart
        width={520}
        height={385}
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="8 8" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total1" fill="#E78C78" />
        <Bar dataKey="total12" fill="rgba(231, 140, 120, 0.58)" />
      </BarChart>
    </>
  );
}
