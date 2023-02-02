import React from "react";

import { Box, Stack, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MetricWorldMap } from "@actnowcoalition/actnow.js";

import { ShareImageContainer, defaultStyling } from ".";
import { MetricId } from "../../utils/metrics";
import { regions } from "../../utils/regions";

export default {
  title: "Components/ShareImageContainer",
  component: ShareImageContainer,
} as ComponentMeta<typeof ShareImageContainer>;

const Template: ComponentStory<typeof ShareImageContainer> = (args) => (
  <ShareImageContainer {...args} />
);

export const Example = Template.bind({});
Example.args = {
  sx: {
    ...defaultStyling,
    background: "linear-gradient(#00bfa5, #0091ea)",
    padding: 4,
  },
  children: (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h2" sx={{ mt: 0 }} color="white">
        World Happiness Report 2022
      </Typography>
      <Box sx={{ width: 700, backgroundColor: "#fff", borderRadius: 2 }}>
        <MetricWorldMap regionDB={regions} metric={MetricId.HAPPINESS} />
      </Box>
      <Typography variant="overline" color="white">
        By Act Now Coalition
      </Typography>
    </Stack>
  ),
};
