import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTitle } from '#shared/hooks/title';

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
        <Box sx={{ display: 'flex', flexWrap: 'no-wrap' }}>
          <Box
            sx={{
              borderRadius: '10px',
              background: '#F4F4F4',
              mt: '1rem',
              width: '300px',
              mr: '1rem',
            }}
          >
            <Box sx={{ padding: '1rem' }}>
              <Box sx={{ mt: '0.5rem' }}>
                <Typography
                  sx={{ color: 'rgba(2, 5, 96, 0.85)', fontSize: '18px', fontWeight: 'bold' }}
                >
                  Cursos
                </Typography>
              </Box>
              <Box sx={{ mt: '0.5rem', marginRight: '0.5rem' }}>
                <Typography sx={{ color: '#9697B9', fontSize: '12px', textAlign: 'justify' }}>
                  Possibilita o cadastramento e acesso os cursos ativos e inativos da instituição de
                  ensino, além da relação e comparação dos PPCs que as representam.
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
                onClick={() => navigate('/cursos')}
              >
                Acessar
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: '10px',
              background: '#F4F4F4',
              mt: '1rem',
              width: '300px',
              mr: '1rem',
            }}
          >
            <Box sx={{ padding: '1rem' }}>
              <Box sx={{ mt: '0.5rem' }}>
                <Typography
                  sx={{
                    color: 'rgba(2, 5, 96, 0.85)',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  Área do Conhecimento
                </Typography>
              </Box>
              <Box sx={{ mt: '0.5rem', marginRight: '0.5rem' }}>
                <Typography sx={{ color: '#9697B9', fontSize: '12px', textAlign: 'justify' }}>
                  Apresenta o campo de cadastramento e acesso as áreas de conhecimento da
                  instituição de ensino, além da relação de disciplinas e versões ligadas a ela.
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
                onClick={() => navigate('/areas')}
              >
                Acessar
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: '10px',
              background: '#F4F4F4',
              mt: '1rem',
              width: '300px',
              mr: '1rem',
            }}
          >
            <Box sx={{ padding: '1rem' }}>
              <Box sx={{ mt: '0.5rem' }}>
                <Typography
                  sx={{
                    color: 'rgba(2, 5, 96, 0.85)',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  Disciplina
                </Typography>
              </Box>
              <Box sx={{ mt: '0.5rem', marginRight: '0.5rem' }}>
                <Typography sx={{ color: '#9697B9', fontSize: '12px', textAlign: 'justify' }}>
                  Possibilita o cadastramento e acesso as Disciplinas com suas respectivas versões,
                  além do detalhamento do PPC em que a versão está inserida.
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
                onClick={() => navigate('/disciplinas')}
              >
                Acessar
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: '10px',
              background: '#F4F4F4',
              mt: '1rem',
              width: '300px',
              mr: '1rem',
            }}
          >
            <Box sx={{ padding: '1rem' }}>
              <Box sx={{ mt: '0.5rem' }}>
                <Typography
                  sx={{
                    color: 'rgba(2, 5, 96, 0.85)',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  Versão da Disciplina
                </Typography>
              </Box>
              <Box sx={{ mt: '0.5rem', marginRight: '0.5rem' }}>
                <Typography sx={{ color: '#9697B9', fontSize: '12px', textAlign: 'justify' }}>
                  Encontramos nesse campo a possiblidade de cadastramento e acesso a todas as
                  versões de todas as diciplinas da instituição de ensino, além de compara-las entre
                  si.
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
                onClick={() => navigate('/versoes')}
              >
                Acessar
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: '10px',
              background: '#F4F4F4',
              mt: '1rem',
              width: '300px',
              mr: '1rem',
            }}
          >
            <Box sx={{ padding: '1rem' }}>
              <Box sx={{ mt: '0.5rem' }}>
                <Typography
                  sx={{
                    color: 'rgba(2, 5, 96, 0.85)',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  Autores
                </Typography>
              </Box>
              <Box sx={{ mt: '0.5rem', marginRight: '0.5rem' }}>
                <Typography sx={{ color: '#9697B9', fontSize: '15.4px', textAlign: 'justify' }}>
                  Aqui encontramos a possibilidade de cadastramento e acesso de autores que contém
                  obras nos PPCS.
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
                onClick={() => navigate('/autores')}
              >
                Acessar
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: '10px',
              background: '#F4F4F4',
              mt: '1rem',
              width: '300px',
              mr: '1rem',
            }}
          >
            <Box sx={{ padding: '1rem' }}>
              <Box sx={{ mt: '0.5rem' }}>
                <Typography
                  sx={{
                    color: 'rgba(2, 5, 96, 0.85)',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  Obras
                </Typography>
              </Box>
              <Box sx={{ mt: '0.5rem', marginRight: '0.5rem' }}>
                <Typography sx={{ color: '#9697B9', fontSize: '15.4px', textAlign: 'justify' }}>
                  Apresenta o cadastramaneto e acesso as obras relacionadas ao curso e disciplina
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
                onClick={() => navigate('/obras')}
              >
                Acessar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
