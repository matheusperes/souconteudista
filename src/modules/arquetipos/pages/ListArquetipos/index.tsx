import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Typography,
  Stack,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useTitle } from '#shared/hooks/title';
import Pedido4 from '#shared/images/Business.svg';
import Pedido2 from '#shared/images/Layer.svg';
import Pedido1 from '#shared/images/Pedido1.svg';
import Pedido3 from '#shared/images/service.svg';

export function ListArquetipos() {
  const { setTitle } = useTitle();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle('Pedidos');
  }, [setTitle]);

  return (
    <Box className="Pagina">
      <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
        <Box>
          <Breadcrumbs separator={<ArrowForward fontSize="small" />}>
            <Link to="/">Home</Link>
            <Typography>Pedidos</Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            marginTop: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              sx={{
                color: '#020560',
                fontWeight: 'bold',
                textDecoration: 'underline 2px',
                textUnderlineOffset: '10px',
                borderRadius: '50px',
                '&:hover': { textDecoration: 'underline 2px', background: '#E5E5E5' },
              }}
              onClick={() => navigate('/arquetipos')}
            >
              Arquétipos
            </Button>
            <Button sx={{ color: '#000', fontWeight: 'bold' }} onClick={() => navigate('#')}>
              Pedidos
            </Button>
            <Button sx={{ color: '#000', fontWeight: 'bold' }} onClick={() => navigate('#')}>
              Componentes de Pedidos
            </Button>
            <Button onClick={() => navigate('#')} sx={{ color: '#000', fontWeight: 'bold' }}>
              Versão de Componentes
            </Button>
            <Button sx={{ color: '#000', fontWeight: 'bold' }} onClick={() => navigate('#')}>
              Serviços
            </Button>
            <Button sx={{ color: '#000', fontWeight: 'bold' }} onClick={() => navigate('#')}>
              Profissionais
            </Button>
          </Stack>
        </Box>
        <Box>
          <Box sx={{ marginTop: '1.5rem' }}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <Card sx={{ width: '100%', background: '#F4F4F4' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2rem',
                    }}
                  >
                    <img src={Pedido1} alt="Pedido" />
                  </Box>

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{
                        color: 'rgba(2, 5, 96, 0.85)',
                        textAlign: 'center',
                      }}
                    >
                      Tipos de Solicitação
                    </Typography>
                    <Typography sx={{ color: '#9697B9', textAlign: 'justify', fontSize: '14px' }}>
                      Aqui estão contidos os principais tipos de solicitação com suas devidas
                      definições
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        background: 'rgba(2, 5, 96, 0.6)',
                        color: '#FFFFFF',
                        '&:hover': { background: 'rgba(2, 5, 96, 0.6)', color: '#FFFFFF' },
                      }}
                    >
                      Acessar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <Card sx={{ width: '100%', Height: '245', background: '#F4F4F4' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2rem',
                    }}
                  >
                    <img src={Pedido2} alt="Pedido" />
                  </Box>

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{
                        color: 'rgba(2, 5, 96, 0.85)',
                        textAlign: 'center',
                      }}
                    >
                      Tipos de Componentes
                    </Typography>
                    <Typography sx={{ color: '#9697B9', textAlign: 'justify', fontSize: '14px' }}>
                      Aqui estão contidos os principais tipos de componentes com suas devidas
                      definições
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        background: 'rgba(2, 5, 96, 0.6)',
                        color: '#FFFFFF',
                        '&:hover': { background: 'rgba(2, 5, 96, 0.6)', color: '#FFFFFF' },
                      }}
                    >
                      Acessar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <Card sx={{ width: '100%', background: '#F4F4F4' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2rem',
                    }}
                  >
                    <img src={Pedido3} alt="Pedido" />
                  </Box>

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{
                        color: 'rgba(2, 5, 96, 0.85)',
                        textAlign: 'center',
                      }}
                    >
                      Tipos de Serviços
                    </Typography>
                    <Typography sx={{ color: '#9697B9', textAlign: 'justify', fontSize: '14px' }}>
                      Aqui estão contidos os principais tipos de seviços com suas devidas definições
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        background: 'rgba(2, 5, 96, 0.6)',
                        color: '#FFFFFF',
                        '&:hover': { background: 'rgba(2, 5, 96, 0.6)', color: '#FFFFFF' },
                      }}
                    >
                      Acessar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <Card sx={{ width: '100%', background: '#F4F4F4' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2rem',
                    }}
                  >
                    <img src={Pedido4} alt="Pedido" />
                  </Box>

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{
                        color: 'rgba(2, 5, 96, 0.85)',
                        textAlign: 'center',
                      }}
                    >
                      Tipos de Função
                    </Typography>
                    <Typography sx={{ color: '#9697B9', textAlign: 'justify', fontSize: '14px' }}>
                      Aqui estão contidos os principais tipos de funções com suas devidas definições
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        background: 'rgba(2, 5, 96, 0.6)',
                        color: '#FFFFFF',
                        '&:hover': { background: 'rgba(2, 5, 96, 0.6)', color: '#FFFFFF' },
                      }}
                    >
                      Acessar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
