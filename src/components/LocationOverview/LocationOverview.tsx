import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";

import {
  MetricScoreOverview,
  MetricValue,
  Region,
} from "@actnowcoalition/actnow.js";

import { MetricId, metrics } from "src/utils/metrics";

export interface LocationOverviewProps {
  region: Region;
}

const LocationOverview = ({ region }: LocationOverviewProps) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
      <Box flex={1}>
        <MetricScoreOverview region={region} metric={MetricId.HAPPINESS} />
        <Box mt={4}>
          <Typography variant="paragraphLarge">
            <ul>
              <li>
                See recommendations to improve happiness through social support
                and more
              </li>
              <li>
                See recommendations to improve happiness through social support
                and more
              </li>
            </ul>
          </Typography>
        </Box>
      </Box>
      <Divider
        variant="middle"
        sx={{
          borderWidth: "1px",
          marginX: { xs: 0, sm: theme.spacing(8) },
          marginY: { xs: theme.spacing(3), sm: 0 },
        }}
      />
      <Box flex={1}>
        <Box mb={3}>
          <Typography variant="paragraphSmall">
            Factors and their values
          </Typography>
        </Box>
        <Box>
          {metrics.map((metric) => (
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
    </Box>
  );
};

export default LocationOverview;
