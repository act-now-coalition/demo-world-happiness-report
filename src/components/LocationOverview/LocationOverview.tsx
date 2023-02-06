import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  MetricScoreOverview,
  MetricValue,
  Region,
} from "@actnowcoalition/actnow.js";

import { MetricId, subMetrics } from "src/utils/metrics";

export interface LocationOverviewProps {
  region: Region;
}

const LocationOverview = ({ region }: LocationOverviewProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={4}
      justifyContent="space-between"
    >
      <Box flex={1}>
        <MetricScoreOverview region={region} metric={MetricId.HAPPINESS} />
        <Box mt={4}>
          <Typography variant="paragraphLarge">
            [PLACEHOLDER] See recommendations to improve happiness through
            social support and more
          </Typography>
        </Box>
      </Box>
      <Box flex="0 0">
        <Divider
          orientation={isMobile ? "horizontal" : "vertical"}
          variant={isMobile ? undefined : "middle"}
        />
      </Box>
      <Box flex={1}>
        <Box mb={3}>
          <Typography variant="paragraphSmall">
            Factors and their values
          </Typography>
        </Box>
        <Box>
          {subMetrics.map((metric) => (
            <Grid key={metric.id} container marginBottom={1}>
              <Grid item xs={8}>
                <Typography variant="paragraphLarge">{metric.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <MetricValue
                  region={region}
                  metric={metric.id}
                  variant="dataEmphasizedSmall"
                />
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default LocationOverview;
