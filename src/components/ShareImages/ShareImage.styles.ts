import { Box } from "@mui/material";

import { styled } from "../../styles";

export const ratio = 16 / 9;
export const width = 900;
export const height = width / ratio;

export const ShareImageContainer = styled(Box)`
  padding: ${({ theme }) => theme.spacing(4, 5)};
  width: ${width}px;
  height: ${height}px;
`;
