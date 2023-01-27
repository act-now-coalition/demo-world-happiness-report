import React from "react";

import FacebookIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
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
        <Box p={1}>
          <img
            width="120px"
            src="/logo.png"
            alt="World Happiness Report logo"
          />
        </Box>
        <Typography variant="paragraphLarge" color={theme.palette.common.white}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit
          amet imperdiet lectus.
        </Typography>
        <Box sx={{ color: theme.palette.common.white }}>
          <StyledLink href="https://covidactnow.org/about">About</StyledLink>
          &nbsp;·&nbsp;
          <StyledLink href="https://covidactnow.org/about#contact-us">
            Contact
          </StyledLink>
          &nbsp;·&nbsp;
          <StyledLink href="https://covidactnow.org/terms">Terms</StyledLink>
        </Box>
        <ButtonGroup disableRipple>
          <IconButton
            edge="start"
            rel="noopener noreferrer"
            href="https://www.facebook.com/covidactnow"
            target="_blank"
            sx={{ color: theme.palette.common.white }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            rel="noopener noreferrer"
            href="https://twitter.com/CovidActNow"
            target="_blank"
            sx={{ color: theme.palette.common.white }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            rel="noopener noreferrer"
            href="https://www.instagram.com/covidactnow"
            target="_blank"
            sx={{ color: theme.palette.common.white }}
          >
            <InstagramIcon />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </StyledFooter>
  );
};

export default Footer;
