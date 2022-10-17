import { styled, TableContainer } from '@mui/material';

export const StyledTableContainer2 = styled(TableContainer)`
  table {
    width: 100%;
    border-spacing: 0 0.4rem;
    background: #fff;
    border-collapse: separate;
    min-width: 650px;
    tr {
    }

    th {
      color: #000;
      font-weight: 400;
      line-height: 1.5rem;
      text-align: center;

      &:first-of-type {
        text-align: center;
      }
    }

    td {
      border: 0;
      background: #f4f4f4;
      color: #000;
      /* box-shadow: 0px 5px rgba(164, 163, 163, 0.45); */
      text-align: rigth;
    }

    &:first-of-type {
    }
  }
`;
