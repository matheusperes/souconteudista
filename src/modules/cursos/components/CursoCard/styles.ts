import { Card, styled, Box } from '@mui/material';

export const CardStyled = styled(Card)`
  border-left: 11px solid #9b9eec;

  border-radius: 11px;
  /* margin: 1rem; */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #9b9eec;
  height: 165px;

  transition: 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const BoxBruna = styled(Box)`
  background-color: #fff;
  border-radius: 10px;
  height: 165px;
`;

export const CardContent = styled(Box)`
  /* padding: 13px; */
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  h3 {
    font-size: 18px;
    font-family: 'Poppins', sans-serif;
    color: rgba(2, 5, 96, 0.85);
    font-weight: bold;
    line-height: 27px;
  }

  span {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 12px;
    color: #9697b9;
    display: block;
  }
`;
