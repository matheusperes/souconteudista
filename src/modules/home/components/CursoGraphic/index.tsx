import { ArrowDropDownCircleOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Ativo', value: 42 },
  { name: 'Inativo', value: 14 },
];

export function CursoGraphic() {
  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              sx={{
                ml: '52px',
                color: '#020560',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              Relação dos Cursos
            </Typography>
          </Box>

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
                <Typography sx={{ fontSize: '12px' }}>Curso</Typography>
                <ArrowDropDownCircleOutlined sx={{ width: '15px', ml: '5px' }} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              ml: '52px',
              color: '#5A5151',
              fontSize: '14px',
            }}
          >
            Administração
          </Typography>
        </Box>
      </Box>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
        >
          <Tooltip />
          <Legend />
          <Cell fill="#9697B9" />
          <Cell fill="#DBDBDB" />
        </Pie>
      </PieChart>
      <Box sx={{ display: 'flex', mt: '1.5rem', alignItems: 'center', ml: '160px' }}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ background: '#9697B9', borderRadius: '25%', width: '15px' }} />
          <Typography sx={{ fontSize: '10px', ml: '5px' }}>Ativo</Typography>
        </Box>
        <Box sx={{ display: 'flex', ml: '10px' }}>
          <Box sx={{ background: '#DBDBDB', borderRadius: '25%', width: '15px' }} />
          <Typography sx={{ fontSize: '10px', ml: '5px' }}>Inativo</Typography>
        </Box>
      </Box>
    </>
  );
}
