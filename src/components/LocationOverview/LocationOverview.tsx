import { Box, Grid, Typography, useTheme } from "@mui/material";

import { Region } from "@actnowcoalition/regions";
import {
  MetricScoreOverview,
  MetricValue,
} from "@actnowcoalition/ui-components";

import { MetricId, metrics } from "src/utils/metrics";

const LocationOverview: React.FC<{ region: Region }> = ({ region }) => {
  const theme = useTheme();
  return (
    <Box display="flex">
      <Box
        flex={1}
        pr={8}
        borderRight={`1px solid ${theme.palette.chart.axis}`}
      >
        <MetricScoreOverview region={region} metric={MetricId.LIFE_LADDER} />
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
      <Box flex={1} pl={8}>
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
