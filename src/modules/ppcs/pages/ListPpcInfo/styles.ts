import { Box, styled } from '@mui/material';

export const BoxStyled = styled(Box)`
  display: flex;
  align-items: center;
  min-height: 36px;

  svg {
    display: none;
  }

  &:hover svg {
    display: block;
  }
`;
