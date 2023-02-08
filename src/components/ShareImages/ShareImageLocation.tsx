import React from "react";

import { Box, Stack, Typography } from "@mui/material";

import { MetricWorldMap, Region } from "@actnowcoalition/actnow.js";

import { MetricId } from "../../utils/metrics";
import { regions } from "../../utils/regions";
import { ShareImageContainer } from "./ShareImage.styles";

export const ShareImageLocation = ({ region }: { region: Region }) => (
  <ShareImageContainer sx={{ background: "linear-gradient(#00bfa5, #0091ea)" }}>
    <Stack spacing={2} alignItems="center">
      <Typography variant="h1" sx={{ mt: 0 }} color="white">
        {`Happiness in ${region.shortName}`}
      </Typography>
      <Box
        sx={{
          width: 1000,
          backgroundColor: (theme) => theme.palette.common.white,
          borderRadius: 2,
        }}
      >
        <MetricWorldMap regionDB={regions} metric={MetricId.HAPPINESS} />
      </Box>
      <Typography variant="labelLarge" color="white">
        By Act Now Coalition
      </Typography>
    </Stack>
  </ShareImageContainer>
);
