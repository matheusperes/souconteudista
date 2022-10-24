import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Carousel from 'react-grid-carousel';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
// import React from 'react';

import { useInstitution } from '#shared/hooks/institution';
import { useLoading } from '#shared/hooks/loading';
import { useTitle } from '#shared/hooks/title';
import { useToast } from '#shared/hooks/toast';
import Lupa3 from '#shared/images/arcticons_voteinfo.svg';
import Lupa2 from '#shared/images/Books.svg';
import Lupa from '#shared/images/GenerateLead.svg';
import Lupa6 from '#shared/images/KnowledgeIdea.svg';
import Lupa5 from '#shared/images/Papers.svg';
import Lupa4 from '#shared/images/pasta.svg';
import img from '#shared/images/websitedesigning.png';
import { api } from '#shared/services/axios';

import { AFazerGraphic } from '#modules/home/components/AFazerGraphic';
import { AreaConhecimentoGraphic } from '#modules/home/components/AreaConhecimentoGraphic';
import { CardCard } from '#modules/home/components/CardCard';
import { CenariosGraphic } from '#modules/home/components/CenariosGraphics';
import { PPCGraphic } from '#modules/home/components/PPCGraphic';
import { VotacaoGraphic } from '#modules/home/components/VotacaoGraphic';
import { IInstituicoes } from '#modules/instituicoes/pages/ListInstituicoes';

import { CursoGraphic } from '../../components/CursoGraphic';
import { itensNav } from './data';

const graphics = {
  primeiro: <PPCGraphic />,
  segundo: <AreaConhecimentoGraphic />,
  terceiro: <CursoGraphic />,
  quarto: <CenariosGraphic />,
  quinto: <VotacaoGraphic />,
  sexto: <AFazerGraphic />,
};

const SELECT_VALUE_KEY = '@MycomParator:instituicao';

type Option = {
  id: string;
  name: string;
};

export function Home() {
  const { setTitle } = useTitle();
  const { message } = useToast();
  const { startLoading, stopLoading } = useLoading();
  const { instituicao, updateInstitution } = useInstitution();
  const navigate = useNavigate();

  const card = [
    {
      id: '1',
      titulo: 'Rodada de Aprovação 01',
      name: 'Voto dos Professores',
      description: 'Curso: Publicidade e Propaganda',
      descriptionGreen: 'Recebeu mais 1 voto',
      cor: 'rgba(150, 151, 185, 0.58)',
    },
    {
      id: '2',
      titulo: 'Rodada de Aprovação 01',
      name: 'Voto dos Professores',
      description: 'Curso: Publicidade e Propaganda',
      descriptionGreen: 'Recebeu mais 1 voto',
      cor: 'rgba(150, 151, 185, 0.58)',
    },
    {
      id: '3',
      titulo: 'Rodada de Aprovação 01',
      name: 'Voto dos Professores',
      description: 'Curso: Publicidade e Propaganda',
      descriptionGreen: 'Recebeu mais 1 voto',
      cor: '#FDBF5F',
    },
    {
      id: '4',
      titulo: 'Rodada de Aprovação 01',
      name: 'Voto dos Professores',
      description: 'Curso: Publicidade e Propaganda',
      descriptionGreen: 'Recebeu mais 1 voto',
      cor: '#FDBF5F',
    },
    {
      id: '5',
      titulo: 'Rodada de Aprovação 01',
      name: 'Voto dos Professores',
      description: 'Curso: Publicidade e Propaganda',
      descriptionGreen: 'Recebeu mais 1 voto',
      cor: '#FDBF5F',
    },
    {
      id: '6',
      titulo: 'Rodada de Aprovação 01',
      name: 'Voto dos Professores',
      description: 'Curso: Publicidade e Propaganda',
      descriptionGreen: 'Recebeu mais 1 voto',
      cor: 'rgba(150, 151, 185, 0.58)',
    },
  ];

  const [selected, setSelected] = useState<Option | null>(null);

  const [instuicoes, setInstituicoes] = useState<IInstituicoes[]>([]);

  const [storageGrap, setStorageGrap] = useState('primeiro');

  useEffect(() => {
    setTitle('Home');
  }, [setTitle]);

  const getInstituicoes = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get('/instituicoes');
      setInstituicoes(response.data);
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, startLoading, stopLoading]);

  useEffect(() => {
    getInstituicoes();
  }, [getInstituicoes]);

  useEffect(() => {
    setSelected(instituicao);
  }, [instituicao]);

  const handleChange = (s: any) => {
    updateInstitution(s);
    navigate('/');
  };

  useEffect(() => {
    const lastSelected = JSON.parse(localStorage.getItem(SELECT_VALUE_KEY) ?? '[]');
    getInstituicoes();
    setSelected(lastSelected);
  }, [getInstituicoes]);

  return (
    <Box sx={{ padding: '1rem', background: '#EFEFEF' }}>
      <Grid container spacing={4}>
        <Grid item xs={9} sx={{ borderLeft: '12px solid #E7E7E7', padding: '1rem 2rem 1rem 1rem' }}>
          <Box>
            <Box
              sx={{
                background: '#E8923D',
                borderRadius: '20px',
                boxShadow: '0px 4px 4px #B5A8AE',
                mt: '1rem',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ padding: '7rem' }}>
                  <Box>
                    <Typography sx={{ color: 'white', fontSize: '29px', fontWeight: 'bold' }}>
                      Olá, Marcelo Barros!
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: 'white', fontSize: '18px' }}>
                      Estamos felizes por tê-lo novamente em nosso sistema!!
                    </Typography>
                  </Box>
                </Box>

                <img src={img} alt="img" width={300} />
              </Box>
            </Box>
            <Box sx={{ marginTop: '2rem' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                Principais Serviços
              </Typography>
            </Box>
            <Carousel cols={4} rows={1} gap={30} loop>
              {itensNav.map((item) => (
                <Carousel.Item key={item.titulo}>
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
                          sx={{
                            color: 'rgba(2, 5, 96, 0.85)',
                            fontSize: '18px',
                            fontWeight: 'bold',
                          }}
                        >
                          {item.titulo}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: '0.5rem', marginRight: '0.5rem' }}>
                        <Typography
                          sx={{ color: '#9697B9', fontSize: '12px', textAlign: 'justify' }}
                        >
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
                          background: 'rgba(2, 5, 96, 0.8)',
                          borderRadius: '0px 0px 10px 10px',
                          color: 'white',
                          fontWeight: 'bold',
                          '&:hover': {
                            background: '#ECECEC',
                            color: 'rgba(2, 5, 96, 0.8)',
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
            <Box sx={{ marginTop: '2rem' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Dashboard</Typography>
            </Box>
            <Grid container spacing={2} sx={{ mt: '1rem' }}>
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    background: '#EFEFEF',
                    border: '1px solid #31337C',
                    padding: '1rem',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {graphics[storageGrap]}
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              background: '#f4f4f47f',
                              height: '225px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'transform .2s',
                              borderRadius: '20px',
                              boxShadow:
                                '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.04)',
                              filter: 'blur(0.4px)',
                              backdropFilter: 'blur(0.4px)',
                              '&:hover': {
                                filter: 'none',
                                backdropFilter: 'none',
                                transform: 'scale(1.05)',
                                opacity: 0.8,
                              },
                            }}
                            onClick={() => setStorageGrap('primeiro')}
                          >
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '45%',
                                left: '50%',
                                margin: '0',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <Box>
                                <img src={Lupa5} alt="lupa" width={60} />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '65%',
                                left: '50%',
                                margin: '0',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <Typography
                                sx={{ color: '#9697B9', textAlign: 'center', fontSize: '14px' }}
                              >
                                PPCs
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              background: '#F4F4F4',
                              height: '225px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'transform .2s',
                              borderRadius: '20px',
                              boxShadow:
                                '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.04)',
                              filter: 'blur(0.4px)',
                              backdropFilter: 'blur(0.4px)',
                              '&:hover': {
                                filter: 'none',
                                backdropFilter: 'none',
                                transform: 'scale(1.05)',
                                opacity: 0.8,
                              },
                            }}
                            onClick={() => setStorageGrap('segundo')}
                          >
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '45%',
                                left: '50%',
                                margin: '0',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <Box>
                                <img src={Lupa6} alt="lupa" width={60} />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '65%',
                                left: '50%',
                                margin: '0',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <Typography
                                sx={{ color: '#9697B9', textAlign: 'center', fontSize: '14px' }}
                              >
                                Áreas do Conhecimento
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              background: '#f4f4f47f',
                              height: '225px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'transform .2s',
                              borderRadius: '20px',
                              boxShadow:
                                '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.04)',
                              filter: 'blur(0.4px)',
                              backdropFilter: 'blur(0.4px)',
                              '&:hover': {
                                filter: 'none',
                                backdropFilter: 'none',
                                transform: 'scale(1.05)',
                                opacity: 0.8,
                              },
                            }}
                            onClick={() => setStorageGrap('terceiro')}
                          >
                            <Box>
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: '45%',
                                  left: '50%',
                                  margin: '0',
                                  marginRight: '-50%',
                                  transform: 'translate(-50%, -50%)',
                                }}
                              >
                                <img src={Lupa2} alt="lupa" width={60} />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '65%',
                                left: '50%',
                                margin: '0',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <Typography
                                sx={{ color: '#9697B9', textAlign: 'center', fontSize: '14px' }}
                              >
                                Curso
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              background: '#F4F4F4',
                              height: '210px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'transform .2s',
                              borderRadius: '20px',
                              boxShadow:
                                '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.04)',
                              filter: 'blur(0.4px)',
                              backdropFilter: 'blur(0.4px)',
                              '&:hover': {
                                filter: 'none',
                                backdropFilter: 'none',
                                transform: 'scale(1.05)',
                                opacity: 0.8,
                              },
                            }}
                            onClick={() => setStorageGrap('quarto')}
                          >
                            <Box>
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: '45%',
                                  left: '50%',
                                  margin: '0',
                                  marginRight: '-50%',
                                  transform: 'translate(-50%, -50%)',
                                }}
                              >
                                <img src={Lupa} alt="lupa" width={60} />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '65%',
                                left: '50%',
                                margin: '0',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <Typography
                                sx={{ color: '#9697B9', textAlign: 'center', fontSize: '14px' }}
                              >
                                Meus Cenários
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              background: '#f4f4f47f',
                              height: '210px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'transform .2s',
                              borderRadius: '20px',
                              boxShadow:
                                '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.04)',
                              filter: 'blur(0.4px)',
                              backdropFilter: 'blur(0.4px)',
                              '&:hover': {
                                filter: 'none',
                                backdropFilter: 'none',
                                transform: 'scale(1.05)',
                                opacity: 0.8,
                              },
                            }}
                            onClick={() => setStorageGrap('quinto')}
                          >
                            <Box>
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: '45%',
                                  left: '50%',
                                  margin: '0',
                                  marginRight: '-50%',
                                  transform: 'translate(-50%, -50%)',
                                }}
                              >
                                <img src={Lupa3} alt="lupa" width={60} />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '65%',
                                left: '50%',
                                margin: '0',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <Typography
                                sx={{ color: '#9697B9', textAlign: 'center', fontSize: '14px' }}
                              >
                                Votação
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              background: '#F4F4F4',
                              height: '210px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'transform .2s',
                              borderRadius: '20px',
                              boxShadow:
                                '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.04)',
                              filter: 'blur(0.4px)',
                              backdropFilter: 'blur(0.4px)',
                              '&:hover': {
                                filter: 'none',
                                backdropFilter: 'none',
                                transform: 'scale(1.05)',
                                opacity: 0.8,
                              },
                            }}
                            onClick={() => setStorageGrap('sexto')}
                          >
                            <Box>
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: '45%',
                                  left: '50%',
                                  margin: '0',
                                  marginRight: '-50%',
                                  transform: 'translate(-50%, -50%)',
                                }}
                              >
                                <img src={Lupa4} alt="lupa" width={60} />
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '65%',
                                left: '50%',
                                margin: '0',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <Typography
                                sx={{ color: '#9697B9', textAlign: 'center', fontSize: '14px' }}
                              >
                                A Fazer
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={3} sx={{ borderLeft: '12px solid #E7E7E7' }}>
          <Box sx={{ width: '170px', marginLeft: 'auto' }}>
            <Select
              value={selected}
              onChange={handleChange}
              options={instuicoes}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              menuPlacement="auto"
              menuPosition="fixed"
            />
          </Box>
          <Divider sx={{ mt: '1rem' }} />
          <Box sx={{ mt: '1rem' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              Atividades Recentes
            </Typography>
            {card.map((dados) => (
              <Box sx={{ mt: '1rem' }} key={dados.id}>
                <CardCard card={dados} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
    // <Box className="Pagina">
    //   <Box sx={{ padding: '1.5rem', width: '100%' }}>
    //     <Box sx={{ marginTop: '0.25rem' }}>
    //       <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
    //         Principais Serviços
    //       </Typography>
    //     </Box>

    //     <Carousel cols={5} rows={1} gap={30} loop>
    //       {itensNav.map((item) => (
    //         <Carousel.Item>
    //           <Box
    //             sx={{
    //               borderRadius: '10px',
    //               background: '#F4F4F4',
    //               mt: '1.5rem',
    //             }}
    //           >
    //             <Box sx={{ padding: '1rem' }}>
    //               <Box sx={{ mt: '0.5rem' }}>
    //                 <Typography
    //                   sx={{ color: 'rgba(2, 5, 96, 0.85)', fontSize: '18px', fontWeight: 'bold' }}
    //                 >
    //                   {item.titulo}
    //                 </Typography>
    //               </Box>
    //               <Box sx={{ mt: '0.5rem', marginRight: '0.5rem' }}>
    //                 <Typography sx={{ color: '#9697B9', fontSize: '12px', textAlign: 'justify' }}>
    //                   {item.descricao}
    //                 </Typography>
    //               </Box>
    //             </Box>

    //             <Box>
    //               <Button
    //                 fullWidth
    //                 variant="contained"
    //                 sx={{
    //                   boxShadow: 'none',
    //                   background: 'rgba(2, 5, 96, 0.8)',
    //                   borderRadius: '0px 0px 10px 10px',
    //                   color: 'white',
    //                   fontWeight: 'bold',
    //                   '&:hover': {
    //                     background: '#ECECEC',
    //                     color: 'rgba(2, 5, 96, 0.8)',
    //                     boxShadow: 'none',
    //                   },
    //                 }}
    //                 onClick={() => navigate(item.link)}
    //               >
    //                 Acessar
    //               </Button>
    //             </Box>
    //           </Box>
    //         </Carousel.Item>
    //       ))}
    //     </Carousel>

    //     <Box sx={{ marginTop: '1.5rem' }}>
    //       <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Dashboard</Typography>
    //     </Box>

    //     <Grid container spacing={2} sx={{ mt: '1rem' }}>
    //       <Grid item xs={6}>
    //         <Paper
    //           elevation={3}
    //           // sx={{ width: '70%' }}
    //           sx={{
    //             height: '450px',
    //             background: '#E5E5E5',
    //             border: '1px solid #31337C',
    //             padding: '1rem',
    //           }}
    //         >
    //           {graphics[storageGrap]}
    //         </Paper>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={4}>
    //             <Box
    //               sx={{
    //                 background: '#f4f4f47f',
    //                 height: '225px',
    //                 cursor: 'pointer',
    //                 position: 'relative',
    //                 transition: 'transform .2s',
    //                 '&:hover': {
    //                   transform: 'scale(1.05)',
    //                   opacity: 0.8,
    //                 },
    //               }}
    //               onClick={() => setStorageGrap('primeiro')}
    //             >
    //               <Box
    //                 sx={{
    //                   position: 'absolute',
    //                   top: '50%',
    //                   left: '50%',
    //                   margin: '0',
    //                   marginRight: '-50%',
    //                   transform: 'translate(-50%, -50%)',
    //                 }}
    //               >
    //                 <Box>
    //                   <img src={Lupa} alt="lupa" width={100} />
    //                 </Box>
    //               </Box>
    //               <Box
    //                 sx={{
    //                   position: 'absolute',
    //                   top: '80%',
    //                   left: '50%',
    //                   margin: '0',
    //                   marginRight: '-50%',
    //                   transform: 'translate(-50%, -50%)',
    //                 }}
    //               >
    //                 <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
    //                   Meus Cenários
    //                 </Typography>
    //               </Box>
    //             </Box>
    //           </Grid>
    //           <Grid item xs={4}>
    //             <Box
    //               sx={{
    //                 background: '#F4F4F4',
    //                 height: '225px',
    //                 cursor: 'pointer',
    //                 position: 'relative',
    //                 transition: 'transform .2s',
    //                 '&:hover': {
    //                   transform: 'scale(1.05)',
    //                   opacity: 0.8,
    //                 },
    //               }}
    //               onClick={() => setStorageGrap('segundo')}
    //             >
    //               <Box
    //                 sx={{
    //                   position: 'absolute',
    //                   top: '50%',
    //                   left: '50%',
    //                   margin: '0',
    //                   marginRight: '-50%',
    //                   transform: 'translate(-50%, -50%)',
    //                 }}
    //               >
    //                 <Box>
    //                   <img src={Lupa2} alt="lupa" width={100} />
    //                 </Box>
    //               </Box>
    //               <Box
    //                 sx={{
    //                   position: 'absolute',
    //                   top: '80%',
    //                   left: '50%',
    //                   margin: '0',
    //                   marginRight: '-50%',
    //                   transform: 'translate(-50%, -50%)',
    //                 }}
    //               >
    //                 <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
    //                   Minhas Sugestões
    //                 </Typography>
    //               </Box>
    //             </Box>
    //           </Grid>
    //           <Grid item xs={4}>
    //             <Box
    //               sx={{
    //                 background: '#f4f4f47f',
    //                 height: '225px',
    //                 cursor: 'pointer',
    //                 position: 'relative',
    //                 transition: 'transform .2s',
    //                 '&:hover': {
    //                   transform: 'scale(1.05)',
    //                   opacity: 0.8,
    //                 },
    //               }}
    //               onClick={() => setStorageGrap('terceiro')}
    //             >
    //               <Box>
    //                 <Box
    //                   sx={{
    //                     position: 'absolute',
    //                     top: '50%',
    //                     left: '50%',
    //                     margin: '0',
    //                     marginRight: '-50%',
    //                     transform: 'translate(-50%, -50%)',
    //                   }}
    //                 >
    //                   <img src={Lupa3} alt="lupa" width={100} />
    //                 </Box>
    //               </Box>
    //               <Box
    //                 sx={{
    //                   position: 'absolute',
    //                   top: '80%',
    //                   left: '50%',
    //                   margin: '0',
    //                   marginRight: '-50%',
    //                   transform: 'translate(-50%, -50%)',
    //                 }}
    //               >
    //                 <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>Votações</Typography>
    //               </Box>
    //             </Box>
    //           </Grid>
    //           <Grid item xs={4}>
    //             <Box
    //               sx={{
    //                 background: '#F4F4F4',
    //                 height: '210px',
    //                 cursor: 'pointer',
    //                 position: 'relative',
    //                 transition: 'transform .2s',
    //                 '&:hover': {
    //                   transform: 'scale(1.05)',
    //                   opacity: 0.8,
    //                 },
    //               }}
    //               onClick={() => setStorageGrap('quarto')}
    //             >
    //               <Box>
    //                 <Box
    //                   sx={{
    //                     position: 'absolute',
    //                     top: '50%',
    //                     left: '50%',
    //                     margin: '0',
    //                     marginRight: '-50%',
    //                     transform: 'translate(-50%, -50%)',
    //                   }}
    //                 >
    //                   <img src={Lupa4} alt="lupa" width={60} />
    //                 </Box>
    //               </Box>
    //               <Box
    //                 sx={{
    //                   position: 'absolute',
    //                   top: '80%',
    //                   left: '50%',
    //                   margin: '0',
    //                   marginRight: '-50%',
    //                   transform: 'translate(-50%, -50%)',
    //                 }}
    //               >
    //                 <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>A Fazer</Typography>
    //               </Box>
    //             </Box>
    //           </Grid>
    //           <Grid item xs={4}>
    //             <Box
    //               sx={{
    //                 background: '#f4f4f47f',
    //                 height: '210px',
    //                 cursor: 'pointer',
    //                 position: 'relative',
    //                 transition: 'transform .2s',
    //                 '&:hover': {
    //                   transform: 'scale(1.05)',
    //                   opacity: 0.8,
    //                 },
    //               }}
    //               onClick={() => setStorageGrap('quinto')}
    //             >
    //               <Box>
    //                 <Box
    //                   sx={{
    //                     position: 'absolute',
    //                     top: '50%',
    //                     left: '50%',
    //                     margin: '0',
    //                     marginRight: '-50%',
    //                     transform: 'translate(-50%, -50%)',
    //                   }}
    //                 >
    //                   <img src={Lupa5} alt="lupa" width={80} />
    //                 </Box>
    //               </Box>
    //               <Box
    //                 sx={{
    //                   position: 'absolute',
    //                   top: '80%',
    //                   left: '50%',
    //                   margin: '0',
    //                   marginRight: '-50%',
    //                   transform: 'translate(-50%, -50%)',
    //                 }}
    //               >
    //                 <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>PPC</Typography>
    //               </Box>
    //             </Box>
    //           </Grid>
    //           <Grid item xs={4}>
    //             <Box
    //               sx={{
    //                 background: '#F4F4F4',
    //                 height: '210px',
    //                 cursor: 'pointer',
    //                 position: 'relative',
    //                 transition: 'transform .2s',
    //                 '&:hover': {
    //                   transform: 'scale(1.05)',
    //                   opacity: 0.8,
    //                 },
    //               }}
    //               onClick={() => setStorageGrap('sexto')}
    //             >
    //               <Box>
    //                 <Box
    //                   sx={{
    //                     position: 'absolute',
    //                     top: '50%',
    //                     left: '50%',
    //                     margin: '0',
    //                     marginRight: '-50%',
    //                     transform: 'translate(-50%, -50%)',
    //                   }}
    //                 >
    //                   <img src={Lupa6} alt="lupa" width={100} />
    //                 </Box>
    //               </Box>
    //               <Box
    //                 sx={{
    //                   position: 'absolute',
    //                   top: '80%',
    //                   left: '50%',
    //                   margin: '0',
    //                   marginRight: '-50%',
    //                   transform: 'translate(-50%, -50%)',
    //                 }}
    //               >
    //                 <Typography sx={{ color: '#020560', fontWeight: 'bold' }}>
    //                   Área do Conhecimento
    //                 </Typography>
    //               </Box>
    //             </Box>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </Box>
  );
}
