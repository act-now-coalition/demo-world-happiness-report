import React, { useState } from "react";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
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
          <Typography variant="h2">Explore Countries</Typography>
          <Trends />
          <AutoWidth>
            <MultiRegionMultiMetricChart
              metrics={ALL_METRICS}
              regions={regions.all}
              initialMetric={MetricId.LIFE_LADDER}
              initialRegions={[
                regions.findByRegionIdStrict("AFG"),
                regions.findByRegionIdStrict("CAN"),
              ]}
              height={600}
              width={0}
            />
          </AutoWidth>
        </PageSection>
      </PageContainer>
    </>
  );
};

export default Homepage;

const Trends = () => {
  const [selectedOption, setSelectedOption] = useState("most-happy");

  const { error, data } = useDataForRegionsAndMetrics(regions.all, [
    MetricId.LIFE_LADDER,
  ]);

  if (error || !data) {
    return <Box>...</Box>;
  }

  // Sort countries by happiness score, low to high
  const countriesByHappiness = sortBy(regions.all, (region) => {
    const d = data.metricData(region, MetricId.LIFE_LADDER);
    return d.currentValue as number;
  });

  const mostHappy = takeRight(countriesByHappiness, 5);
  const lessHappy = take(countriesByHappiness, 5);

  return (
    <Box>
      <Box>
        <Chip
          onClick={() => setSelectedOption("most-happy")}
          label="Most happy"
          icon={<SentimentSatisfiedAltIcon />}
          variant={selectedOption === "most-happy" ? "filled" : "outlined"}
        />
        <Chip
          onClick={() => setSelectedOption("less-happy")}
          label="Least happy"
          icon={<SentimentVeryDissatisfiedIcon />}
          variant={selectedOption === "less-happy" ? "filled" : "outlined"}
        />
      </Box>
      <Box>
        {selectedOption === "most-happy" && (
          <AutoWidth>
            <MultiRegionMultiMetricChart
              metrics={ALL_METRICS}
              regions={regions.all}
              initialMetric={MetricId.LIFE_LADDER}
              initialRegions={mostHappy}
              height={600}
              width={0}
            />
          </AutoWidth>
        )}
        {selectedOption === "less-happy" && (
          <AutoWidth>
            <MultiRegionMultiMetricChart
              metrics={ALL_METRICS}
              regions={regions.all}
              initialMetric={MetricId.LIFE_LADDER}
              initialRegions={lessHappy}
              height={600}
              width={0}
            />
          </AutoWidth>
        )}
      </Box>
    </Box>
  );

  return <div>{lessHappy.map((item) => `${item.regionId} `)}</div>;
};
