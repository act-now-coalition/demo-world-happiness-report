import { Box } from "@mui/material";

import { styled } from "../../styles";

export const width = 1200;
export const height = 630;

export const ShareImageContainer = styled(Box)`
  padding: ${({ theme }) => theme.spacing(4, 5)};
  width: ${width}px;
  height: ${height}px;
`;
