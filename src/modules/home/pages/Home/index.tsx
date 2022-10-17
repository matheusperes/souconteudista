import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import React from 'react';
import Carousel from 'react-grid-carousel';
import { useNavigate } from 'react-router-dom';

import { useTitle } from '#shared/hooks/title';
import Lupa from '#shared/images/GenerateLead.svg';

import { itensNav } from './data';

export function Home() {
  const { setTitle } = useTitle();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle('Home');
  }, [setTitle]);

  return (
    <Box className="Pagina">
      <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
        <Box sx={{ marginTop: '0.25rem' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            Principais Serviços
          </Typography>
        </Box>

        <Carousel cols={4} rows={1} gap={40} loop>
          {itensNav.map((item) => (
            <Carousel.Item>
              <Box
                sx={{
                  borderRadius: '10px',
                  background: '#F4F4F4',
                  mt: '1.5rem',
                }}
              >
                <Box sx={{ padding: '1rem' }}>
                  <Box sx={{ mt: '0.5rem' }}>
                    <Typography
                      sx={{ color: 'rgba(2, 5, 96, 0.85)', fontSize: '18px', fontWeight: 'bold' }}
                    >
                      {item.titulo}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: '0.5rem', marginRight: '0.5rem' }}>
                    <Typography sx={{ color: '#9697B9', fontSize: '12px', textAlign: 'justify' }}>
                      {item.descricao}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: '#ECECEC',
                      borderRadius: '0px 0px 10px 10px',
                      color: '#020560',
                      fontWeight: 'bold',
                      '&:hover': { background: 'rgba(2, 5, 96, 0.8)', color: 'white' },
                    }}
                    onClick={() => navigate(item.link)}
                  >
                    Acessar
                  </Button>
                </Box>
              </Box>
            </Carousel.Item>
          ))}
        </Carousel>

        <Box sx={{ marginTop: '1.5rem' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            Principais Serviços
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper
              elevation={3}
              // sx={{ width: '70%' }}
              sx={{
                height: '450px',
                background: '#E5E5E5',
                border: '1px solid #31337C',
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ marginTop: '3rem' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box
                  sx={{
                    background: '#f4f4f47f',
                    padding: '1rem',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box>
                    <img src={Lupa} alt="lupa" />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
                    Meus Cenários
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    background: '#F4F4F4',
                    padding: '1rem',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box>
                    <img src={Lupa} alt="lupa" />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
                    Meus Cenários
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    background: '#f4f4f47f',
                    padding: '1rem',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box>
                    <img src={Lupa} alt="lupa" />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
                    Meus Cenários
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    background: '#F4F4F4',
                    padding: '1rem',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box>
                    <img src={Lupa} alt="lupa" />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
                    Meus Cenários
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    background: '#f4f4f47f',
                    padding: '1rem',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box>
                    <img src={Lupa} alt="lupa" />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
                    Meus Cenários
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    background: '#F4F4F4',
                    padding: '1rem',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box>
                    <img src={Lupa} alt="lupa" />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
                    Meus Cenários
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ mt: '1rem' }}>
                <Button fullWidth variant="outlined">
                  Acessar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
