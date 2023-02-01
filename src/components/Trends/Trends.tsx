import React, { useState } from "react";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Chip, Grid, Skeleton, Stack } from "@mui/material";
import sortBy from "lodash/sortBy";
import take from "lodash/take";
import takeRight from "lodash/takeRight";

import {
  AutoWidth,
  MultiRegionMultiMetricChart,
  useDataForRegionsAndMetrics,
} from "@actnowcoalition/actnow.js";

import { ALL_METRICS, MetricId } from "src/utils/metrics";
import { regions } from "src/utils/regions";

enum CountryGroup {
  MOST_HAPPY = "MOST_HAPPY",
  LEAST_HAPPY = "LEAST_HAPPY",
}

export const Trends = () => {
  const [selectedOption, setSelectedOption] = useState<CountryGroup>(
    CountryGroup.MOST_HAPPY
  );

  const { error, data } = useDataForRegionsAndMetrics(regions.all, [
    MetricId.LIFE_LADDER,
  ]);

  if (error || !data) {
    return <Skeleton width="100%" height={600} />;
  }

  // Sort countries by happiness score, low to high
  const countriesByHappiness = sortBy(regions.all, (region) => {
    const d = data.metricData(region, MetricId.LIFE_LADDER);
    return d.currentValue as number;
  });

  const options = [
    {
      label: "Most happy",
      group: CountryGroup.MOST_HAPPY,
      icon: <SentimentSatisfiedAltIcon />,
      countries: takeRight(countriesByHappiness, 5),
    },
    {
      label: "Least happy",
      group: CountryGroup.LEAST_HAPPY,
      icon: <SentimentVeryDissatisfiedIcon />,
      countries: take(countriesByHappiness, 5),
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1}>
          {options.map((option) => (
            <Chip
              key={`option-${option.group}`}
              onClick={() => setSelectedOption(option.group)}
              label={option.label}
              icon={option.icon}
              variant="outlined"
            />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {options.map(
          (option) =>
            option.group === selectedOption && (
              <AutoWidth key={`item-${option.group}`}>
                <MultiRegionMultiMetricChart
                  metrics={ALL_METRICS}
                  regions={regions.all}
                  initialMetric={MetricId.LIFE_LADDER}
                  initialRegions={option.countries}
                  height={600}
                  width={0}
                />
              </AutoWidth>
            )
        )}
      </Grid>
    </Grid>
  );
};
