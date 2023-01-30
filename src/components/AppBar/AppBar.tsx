import AssessmentIcon from "@mui/icons-material/Assessment";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Link,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
} from "@mui/material";

const AppBar: React.FC<MuiAppBarProps> = (props) => {
  // NOTE: If you change the height of the AppBar you should adjust the scroll
  // padding set in src/styles/globalStyles.ts to make sure that anchor links
  // are still scrolled into view.
  return (
    <MuiAppBar position="sticky" component="nav" {...props}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Link href="/" sx={{ display: "block", flexGrow: 1 }}>
            <img
              src="/logo-color.svg"
              height={32}
              alt="World Happiness Report"
            />
          </Link>
          <Button
            href="https://worldhappiness.report/faq/"
            variant="text"
            size="small"
            endIcon={<InfoIcon />}
          >
            FAQs
          </Button>
          <Button
            href="https://worldhappiness.report/ed/2022/"
            variant="outlined"
            size="small"
            endIcon={<AssessmentIcon />}
          >
            See Full Report
          </Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
