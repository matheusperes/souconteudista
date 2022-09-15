// import { yupResolver } from '@hookform/resolvers/yup';
// import CloseIcon from '@mui/icons-material/Close';
// import {
//   Grid,
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   IconButton,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
// } from '@mui/material';
// import { useState, useCallback, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';

// import { useToast } from '../../../../hooks/toast';
// import { api } from '../../../../services/axios';
// import { MyTextField } from '../../../Form/TextField';

// export type ICurso = {
//   id: string;
//   name: string;
// };

// type UpdateCursoModal = {
//   open: boolean;
//   onClose: () => void;
//   curso_id: string;
//   reloadList?: () => void;
// };

// type IForm = {
//   name: string;
// };

// const validateForm = yup.object().shape({
//   name: yup.string().required('Nome Obrigatório'),
// });

// export function UpdateCursoModal({ open, onClose, curso_id, reloadList }: UpdateCursoModal) {
//   const [name, setName] = useState('');
//   const { message } = useToast();
//   const [ativo, setAtivo] = useState(true);

//   const {
//     handleSubmit,
//     formState: { errors },
//     control,
//     reset,
//   } = useForm<IForm>({
//     resolver: yupResolver(validateForm),
//   });

//   useEffect(() => {
//     async function getCurso() {
//       const response = await api.get(`/curso/${curso_id}`);

//       setName(response.data.name);
//     }

//     getCurso();
//   }, [curso_id]);

//   const handleUpdate = useCallback(
//     async (form: IForm) => {
//       try {
//         await api.put(`/cursos/${curso_id}`, { name: form.name });

//         if (reloadList) {
//           reloadList();
//         }

//         message({ mensagem: 'Curso Cadastrado', tipo: 'success' });

//         reset();

//         onClose();
//       } catch (error: any) {
//         message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
//       }
//     },
//     [curso_id, reloadList, message, reset, onClose],
//   );
//   return (
//     <Dialog onClose={onClose} open={open}>
//       <Box
//         sx={{
//           display: 'flex',
//           align: 'center',
//           borderBottom: '1px solid #333',
//           background: '#020560',
//         }}
//       >
//         <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Atualizar Curso</DialogTitle>
//         <IconButton
//           sx={{ marginLeft: 'auto', padding: '1rem', background: '#020560', color: '#E5E5E5' }}
//           onClick={onClose}
//         >
//           <CloseIcon />
//         </IconButton>
//       </Box>
//       <Box sx={{ padding: '1rem', background: '#E5E5E5' }}>
//         <form onSubmit={handleSubmit(handleUpdate)} noValidate>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Box display="flex" alignItems="center" sx={{ border: 'none' }}>
//                 <MyTextField
//                   name="name"
//                   control={control}
//                   errors={errors.name}
//                   label="Curso"
//                   defaultValue={name}
//                 />
//               </Box>
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//               <FormGroup>
//                 <FormControlLabel
//                   control={<Checkbox defaultChecked />}
//                   label="Curso Ativo"
//                   checked={ativo}
//                   onChange={() => setAtivo(!ativo)}
//                 />
//               </FormGroup>
//             </Grid>

//             <Grid item xs={12}>
//               <Box display="flex" alignItems="center" marginBottom="1rem">
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{
//                     background: '#0b0f79',
//                     color: '#E5E5E5',
//                   }}
//                 >
//                   Atualizar
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Dialog>
//   );
// }

import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Box, DialogTitle, IconButton, Grid, TextField, Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

import { api } from '#shared/services/axios';

type UpdateCursoModal = {
  open: boolean;
  onClose: () => void;
  curso_id: string;
  reloadList?: () => void;
};

export function UpdateCursoModal({ open, onClose, curso_id, reloadList }: UpdateCursoModal) {
  const [name, setName] = useState('');

  useEffect(() => {
    async function getArea() {
      const response = await api.get(`/curso/${curso_id}`);

      setName(response.data.name);
    }

    getArea();
  }, [curso_id]);

  const handleUpdate = useCallback(async () => {
    try {
      await api.put(`/cursos/${curso_id}`, { name });

      if (reloadList) {
        reloadList();
      }
      onClose();
    } catch {
      alert('Isso não deu certo');
    }
  }, [curso_id, name, reloadList, onClose]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs" fullWidth>
      <Box
        sx={{
          display: 'flex',
          align: 'center',
          borderBottom: '1px solid #333',
          background: '#020560',
        }}
      >
        <DialogTitle sx={{ background: '#020560', color: '#E5E5E5' }}>Editar Curso</DialogTitle>
        <IconButton
          color="primary"
          sx={{ marginLeft: 'auto', padding: '1rem', color: '#E5E5E5' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome do Curso"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Button
                fullWidth
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  background: '#0b0f79',
                  color: '#E5E5E5',
                  '&:hover': { background: '#020560' },
                }}
              >
                Atualizar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
