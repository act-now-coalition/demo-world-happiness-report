import { useState } from "react";

import AssessmentIcon from "@mui/icons-material/Assessment";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Stack,
  Toolbar,
  ToolbarProps,
  useScrollTrigger,
} from "@mui/material";

import { RegionSearch } from "@actnowcoalition/actnow.js";

import { regions } from "../../utils/regions";

interface AppBarItem {
  href: string;
  text: string;
  variant: ButtonProps["variant"];
  endIcon?: JSX.Element;
}

const menuItems: AppBarItem[] = [
  {
    href: "https://worldhappiness.report/faq/",
    text: "FAQs",
    variant: "text",
    endIcon: <InfoIcon />,
  },
  {
    href: "https://worldhappiness.report/ed/2022/",
    text: "Full Report",
    variant: "outlined",
    endIcon: <AssessmentIcon />,
  },
];

const AppBar: React.FC<MuiAppBarProps> = (props) => {
  // Hide the RegionSearch until the user scrolls past 400px
  const showSearch = useScrollTrigger({ threshold: 400 });

  // NOTE: If you change the height of the AppBar you should adjust the scroll
  // padding set in src/styles/globalStyles.ts to make sure that anchor links
  // are still scrolled into view.
  return (
    <MuiAppBar position="sticky" component="nav" {...props}>
      <MobileAppBar sx={{ display: { md: "none" } }} />
      <Toolbar sx={{ display: { xs: "none", md: "flex" } }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            {logo}
          </Grid>
          <Grid item xs>
            <Box sx={{ display: showSearch ? "block" : "none" }}>
              <RegionSearch
                options={regions.all}
                regionDB={regions}
                inputLabel="Search for your country..."
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              {menuItems.map((item, itemIndex) => (
                <Button
                  key={`item-${itemIndex}`}
                  size="small"
                  href={item.href}
                  variant={item.variant}
                  endIcon={item.endIcon}
                >
                  {item.text}
                </Button>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
};

const MobileAppBar = (props: ToolbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Toolbar {...props}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
        >
          {logo}
          {menuItems.map((item, itemIndex) => (
            <Button
              key={`item-${itemIndex}`}
              href={item.href}
              variant={item.variant}
              size="small"
              endIcon={item.endIcon}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {item.text}
            </Button>
          ))}
          <IconButton
            aria-label="open menu"
            edge="end"
            sx={{ display: { sm: "none" } }}
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer
        anchor="right"
        open={isOpen}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
        ModalProps={{ keepMounted: true }}
        onClose={() => setIsOpen(false)}
      >
        <List sx={{ py: 0 }}>
          <ListItem
            sx={{ minHeight: (theme) => theme.mixins.toolbar.minHeight }}
          >
            {logo}
          </ListItem>
          <Divider />
          {menuItems.map((item, itemIndex) => (
            <ListItem key={`item-${itemIndex}`} sx={{ my: 1 }} disablePadding>
              <ListItemButton href={item.href}>{item.text}</ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

const logo = (
  <Link href="/" sx={{ display: "block", flexGrow: 1 }}>
    <img src="/logo-color.svg" height={32} alt="World Happiness Report" />
  </Link>
);

export default AppBar;
