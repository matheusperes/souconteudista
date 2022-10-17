import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import Carousel from 'react-grid-carousel';
import { useNavigate } from 'react-router-dom';

import { useTitle } from '#shared/hooks/title';
import Lupa3 from '#shared/images/arcticons_voteinfo.svg';
import Lupa from '#shared/images/GenerateLead.svg';
import Lupa2 from '#shared/images/Group1043.svg';
import Lupa6 from '#shared/images/KnowledgeIdea.svg';
import Lupa5 from '#shared/images/Papers.svg';
import Lupa4 from '#shared/images/pasta.svg';

import { itensNav } from './data';

const graphics = {
  primeiro: <Typography>Seja Bem-Vindo</Typography>,
  segundo: <Typography>Minhas Sugestões</Typography>,
  terceiro: <Typography>Votações</Typography>,
  quarto: <Typography>A Fazer</Typography>,
  quinto: <Typography>PPC</Typography>,
  sexto: <Typography>Área do Conhecimento</Typography>,
};

export function Home() {
  const { setTitle } = useTitle();
  const navigate = useNavigate();

  const [storageGrap, setStorageGrap] = useState('primeiro');

  useEffect(() => {
    setTitle('Home');
  }, [setTitle]);

  return (
    <Box className="Pagina">
      <Box sx={{ padding: '1.5rem', width: '100%' }}>
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
                      boxShadow: 'none',
                      background: '#ECECEC',
                      borderRadius: '0px 0px 10px 10px',
                      color: '#020560',
                      fontWeight: 'bold',
                      '&:hover': {
                        background: 'rgba(2, 5, 96, 0.8)',
                        color: 'white',
                        boxShadow: 'none',
                      },
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

        <Grid container spacing={2} sx={{ mt: '1rem' }}>
          <Grid item xs={6}>
            <Paper
              elevation={3}
              // sx={{ width: '70%' }}
              sx={{
                height: '450px',
                background: '#E5E5E5',
                border: '1px solid #31337C',
                padding: '1rem',
              }}
            >
              {graphics[storageGrap]}
            </Paper>
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
                    cursor: 'pointer',
                    transition: 'transform .2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setStorageGrap('primeiro')}
                >
                  <Box>
                    <img src={Lupa} alt="lupa" width={80} />
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
                    cursor: 'pointer',
                    transition: 'transform .2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setStorageGrap('segundo')}
                >
                  <Box>
                    <img src={Lupa2} alt="lupa" width={80} />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
                    Minhas Sugestões
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
                    cursor: 'pointer',
                    transition: 'transform .2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setStorageGrap('terceiro')}
                >
                  <Box>
                    <img src={Lupa3} alt="lupa" />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>Votações</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    background: '#F4F4F4',
                    padding: '1rem',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform .2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setStorageGrap('quarto')}
                >
                  <Box>
                    <img src={Lupa4} alt="lupa" width={47} />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>A Fazer</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    background: '#f4f4f47f',
                    padding: '1rem',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform .2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setStorageGrap('quinto')}
                >
                  <Box>
                    <img src={Lupa5} alt="lupa" width={68} />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>PPC</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    background: '#F4F4F4',
                    padding: '1rem',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform .2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => setStorageGrap('sexto')}
                >
                  <Box>
                    <img src={Lupa6} alt="lupa" />
                  </Box>
                  <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
                    Área do Conhecimento
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
