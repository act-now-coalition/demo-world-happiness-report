import React from "react";

import FacebookIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  ButtonGroup,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { StyledFooter, StyledLink } from "./Footer.style";

const Footer = () => {
  const theme = useTheme();
  return (
    <StyledFooter>
      <Stack spacing={3} maxWidth="md" margin="auto">
        <Box>
          <img
            width="120px"
            src="/logo.png"
            alt="World Happiness Report logo"
          />
        </Box>
        <Typography variant="paragraphLarge" color={theme.palette.common.white}>
          The World Happiness Report is a publication of the Sustainable
          Development Solutions Network, powered by the Gallup World Poll data.
          <br />
          <br />
          The Report is supported by The Ernesto Illy Foundation, illycaffè,
          Davines Group, Unilever’s largest ice cream brand Wall’s, The Blue
          Chip Foundation, The William, Jeff, and Jennifer Gross Family
          Foundation, The Happier Way Foundation, and The Regenerative Society
          Foundation.
          <br />
          <br />
          The World Happiness Report was written by a group of independent
          experts acting in their personal capacities. Any views expressed in
          this report do not necessarily reflect the views of any organization,
          agency or program of the United Nations.
          <br />
          <br />
          For general inquiries on the World Happiness Report please reach out
          to info@worldhappiness.report. For media inquiries please reach out to
          media@worldhappiness.report.
        </Typography>
        <Box sx={{ color: theme.palette.common.white }}>
          <StyledLink
            href="https://worldhappiness.report/"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </StyledLink>
          &nbsp;·&nbsp;
          <StyledLink href="mailto:info@worldhappiness.report">
            Contact
          </StyledLink>
        </Box>
        <ButtonGroup disableRipple>
          <IconButton
            edge="start"
            rel="noopener noreferrer"
            href="https://www.facebook.com/HappinessRPT/"
            target="_blank"
            sx={{ color: theme.palette.common.white }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            rel="noopener noreferrer"
            href="https://twitter.com/happinessrpt"
            target="_blank"
            sx={{ color: theme.palette.common.white }}
          >
            <TwitterIcon />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </StyledFooter>
  );
};

export default Footer;
