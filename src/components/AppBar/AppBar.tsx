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
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  useTheme,
} from "@mui/material";

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
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const openDrawer = () => setMobileOpen(true);
  const closeDrawer = () => setMobileOpen(false);

  const logo = (
    <Link href="/" sx={{ display: "block", flexGrow: 1 }}>
      <img src="/logo-color.svg" height={32} alt="World Happiness Report" />
    </Link>
  );

  // NOTE: If you change the height of the AppBar you should adjust the scroll
  // padding set in src/styles/globalStyles.ts to make sure that anchor links
  // are still scrolled into view.
  return (
    <MuiAppBar position="sticky" component="nav" {...props}>
      <Toolbar>
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
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
        ModalProps={{ keepMounted: true }}
        onClose={closeDrawer}
      >
        <List sx={{ py: 0 }}>
          <ListItem sx={{ minHeight: theme.mixins.toolbar.minHeight }}>
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
    </MuiAppBar>
  );
};

export default AppBar;
