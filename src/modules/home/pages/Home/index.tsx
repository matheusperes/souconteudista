import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
// import React from 'react';
// import Carousel from 'react-grid-carousel';
// import { useNavigate } from 'react-router-dom';

import { useTitle } from '#shared/hooks/title';
// import img from '#shared/images/websitedesigning.svg';
// import Lupa7 from '#shared/images/Afazer.png';
// import Lupa3 from '#shared/images/arcticons_voteinfo.svg';
// import Lupa from '#shared/images/GenerateLead.svg';
// import Lupa2 from '#shared/images/Group1043.svg';
// import Lupa6 from '#shared/images/KnowledgeIdea.svg';
// import Lupa5 from '#shared/images/Papers.svg';
// import Lupa4 from '#shared/images/pasta.svg';

// import { itensNav } from './data';

// const graphics = {
//   primeiro: <Typography>Seja Bem-Vindo</Typography>,
//   segundo: <Typography>Minhas Sugestões</Typography>,
//   terceiro: <Typography>Votações</Typography>,
//   quarto: (
//     <Box>
//       <img src={Lupa7} alt="lupa" width={500} />
//     </Box>
//   ),
//   quinto: <Typography>PPC</Typography>,
//   sexto: <Typography>Área do Conhecimento</Typography>,
// };

export function Home() {
  const { setTitle } = useTitle();
  // const navigate = useNavigate();

  // const [storageGrap, setStorageGrap] = useState('primeiro');

  useEffect(() => {
    setTitle('Home');
  }, [setTitle]);

  return (
    <Box sx={{ marginTop: '1rem', padding: '1rem' }}>
      <Typography>Seja Bem Vindo!</Typography>
      {/* <Grid container spacing={8}>
        <Grid item xs={10}>
          <Box
            sx={{ background: '#E8923D', borderRadius: '20px', boxShadow: '0px 4px 4px #B5A8AE' }}
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
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Typography sx={{ color: 'white', fontSize: '23px', fontWeight: 'bold' }}>
              Olá, Marcelo Barros!
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ color: 'white', fontSize: '18px' }}>
              Estamos felizes por tê-lo novamente em nosso sistema!!
            </Typography>
          </Box>
        </Grid>
      </Grid> */}
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
