import React, { useState } from "react";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Button,
  Chip,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import sortBy from "lodash/sortBy";
import take from "lodash/take";
import takeRight from "lodash/takeRight";

import {
  AutoWidth,
  MetricCompareTable,
  MetricWorldMap,
  MultiRegionMultiMetricChart,
  RegionSearch,
  useDataForRegionsAndMetrics,
} from "@actnowcoalition/actnow.js";

import { PageContainer, PageSection } from "components/Containers";
import { PageMetaTags } from "components/SocialMetaTags";
import { Page, cms } from "src/cms";
import { ALL_METRICS, MetricId } from "src/utils/metrics";
import { regions } from "src/utils/regions";

/**
 *
 * @param page - The page we are using
 * @defaultValue b
 * @returns
 */
const Homepage: React.FC<{ page: Page }> = ({ page }) => {
  const { microcopy, metaTags } = page;
  return (
    <>
      <PageMetaTags
        siteName={cms.settings.siteName}
        url={cms.settings.siteUrl}
        title={metaTags.title}
        description={metaTags.description}
        socialImg={metaTags.socialImg}
        socialImgWidth={metaTags.socialImgWidth}
        socialImgHeight={metaTags.socialImgHeight}
      />
      <PageContainer maxWidth="md">
        <PageSection>
          <Typography
            variant="h1"
            sx={{ mt: { md: 8, xs: 2 }, color: "white" }}
          >
            {microcopy.get("title")}
          </Typography>
          <Typography
            variant="paragraphLarge"
            sx={{ display: "block", my: 2, maxWidth: "sm", color: "white" }}
          >
            {microcopy.get("heading.intro")}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ mt: { md: 6, xs: 4 }, mb: { md: 16, xs: 8 } }}
          >
            <Grid item xs={12} md={6}>
              <RegionSearch
                options={regions.all}
                regionDB={regions}
                inputLabel="Search for your country..."
              />
            </Grid>
            <Grid item xs={12} md>
              <Button
                href="https://happiness-report.s3.amazonaws.com/2022/WHR+22.pdf"
                variant="text"
                sx={{ color: "white" }}
                endIcon={<CloudDownloadIcon />}
              >
                Download full report
              </Button>
            </Grid>
          </Grid>
        </PageSection>
        <PageSection
          sx={{ backgroundColor: "#fff", padding: 5, borderRadius: 2 }}
        >
          <AutoWidth>
            <MetricWorldMap regionDB={regions} metric={MetricId.LIFE_LADDER} />
          </AutoWidth>
        </PageSection>
        <PageSection>
          <Typography variant="h2">Compare</Typography>
          <Paper style={{ height: 500, overflow: "auto" }}>
            <MetricCompareTable
              regionDB={regions}
              regions={regions.all}
              metrics={ALL_METRICS}
            />
          </Paper>
        </PageSection>
        <PageSection>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Explore Countries
          </Typography>
          <Trends />
        </PageSection>
      </PageContainer>
    </>
  );
};

export default Homepage;

enum CountryGroup {
  MOST_HAPPY = "MOST_HAPPY",
  LEAST_HAPPY = "LEAST_HAPPY",
}

const Trends = () => {
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
