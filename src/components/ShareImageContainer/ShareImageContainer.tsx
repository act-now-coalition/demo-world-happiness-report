import React from "react";

import { Box, BoxProps } from "@mui/material";

export interface ShareImageContainerProps extends BoxProps {
  children: React.ReactNode;
}

const ratio = 16 / 9;
const width = 900;
const height = width / ratio;

export const defaultStyling = {
  p: 5,
  width,
  height,
  background: "linear-gradient(#00bfa5, #0091ea)",
};

export const ShareImageContainer = ({
  children,
  ...otherBoxProps
}: ShareImageContainerProps) => {
  return (
    <Box sx={defaultStyling} {...otherBoxProps}>
      {children}
    </Box>
  );
};
