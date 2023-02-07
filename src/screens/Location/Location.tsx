import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";

import {
  AutoWidth,
  InfoTooltip,
  MetricCompareTable,
  MetricLineThresholdChart,
  MultiRegionMultiMetricChart,
  Region,
  ShareButton,
} from "@actnowcoalition/actnow.js";

import {
  BorderedPageSection,
  PageContainer,
  PageSection,
} from "components/Containers";
import LocationOverview from "components/LocationOverview";
import { PageMetaTags } from "components/SocialMetaTags";
import { Page, cms } from "src/cms";
import { Microcopy } from "src/cms/models/Microcopy";
import { ALL_METRICS, MetricId } from "src/utils/metrics";
import { regions } from "src/utils/regions";
import { getRegionUrl } from "src/utils/routing";

export const Location: React.FC<{ region: Region; page: Page }> = ({
  region,
  page,
}) => {
  const { microcopy, metaTags } = page;
  const theme = useTheme();
  return (
    <>
      <PageMetaTags
        siteName={`${cms.settings.siteName}`}
        url={getRegionUrl(region)}
        title={`${region.shortName} - World Happiness Report`}
        description={metaTags.description}
        socialImg={`${metaTags.socialImg?.replace(
          "[[regionId]]",
          region.regionId
        )}`}
        socialImgWidth={metaTags.socialImgWidth}
        socialImgHeight={metaTags.socialImgHeight}
      />
      <PageContainer maxWidth="md">
        {/* Above the fold */}
        <PageSection>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={3}
          >
            <Stack>
              <Typography variant="h1" color="white">
                {region.shortName}
              </Typography>
              <Typography color="white">
                {microcopy.get("heading.updated")}
              </Typography>
            </Stack>
            <Box
              display="flex"
              justifyContent={{ sm: "flex-end" }}
              alignItems="center"
            >
              <ShareButton
                variant="outlined"
                url={getRegionUrl(region)}
                quote={microcopy.get("share.quote")}
              />
            </Box>
          </Stack>
        </PageSection>
        <BorderedPageSection sx={{ backgroundColor: "white" }}>
          <LocationOverview region={region} />
        </BorderedPageSection>
        {/* Below the fold */}
        <PageSection
          sx={{
            backgroundColor: theme.palette.common.white,
            padding: 3,
            borderRadius: 3,
          }}
        >
          <Stack spacing={10}>
            {/* Compare Table */}
            <Stack spacing={3}>
              <Typography variant="h2">Compare</Typography>
              <Paper style={{ height: 500, overflow: "auto" }}>
                <MetricCompareTable
                  regionDB={regions}
                  regions={regions.all}
                  metrics={ALL_METRICS}
                />
              </Paper>
              <ShareBlock microcopy={microcopy} region={region} />
            </Stack>
            {/* Overall Score Chart */}
            <Stack spacing={3}>
              <Typography variant="h2">Overall Score</Typography>
              <AutoWidth>
                <MetricLineThresholdChart
                  region={region}
                  metric={MetricId.HAPPINESS}
                  height={400}
                  width={0}
                />
              </AutoWidth>
              <Typography variant="paragraphLarge">
                Life evaluations (answers to the Cantril ladder question) for{" "}
                {region.shortName}.
              </Typography>
              <ShareBlock microcopy={microcopy} region={region} />
            </Stack>
            {/* Explore Chart */}
            <Stack spacing={2}>
              <Typography variant="h2">Explore</Typography>
              <AutoWidth>
                <MultiRegionMultiMetricChart
                  metrics={ALL_METRICS}
                  regions={regions.all}
                  initialMetric={MetricId.HAPPINESS}
                  initialRegions={[
                    region,
                    regions.findByRegionIdStrict("LBN"),
                    regions.findByRegionIdStrict("NER"),
                    regions.findByRegionIdStrict("FIN"),
                  ]}
                  height={440}
                  width={0}
                />
              </AutoWidth>
              <ShareBlock microcopy={microcopy} region={region} />
            </Stack>
          </Stack>
        </PageSection>
      </PageContainer>
    </>
  );
};

const ShareBlock = ({
  microcopy,
  region,
}: {
  microcopy: Microcopy;
  region: Region;
}) => (
  <Stack
    alignItems="center"
    justifyContent="space-between"
    sx={{ mt: 3 }}
    direction="row"
    spacing={2}
  >
    <Box>
      <InfoTooltip title={<span>{microcopy.get("data.source.tooltip")}</span>}>
        <Typography variant="paragraphSmall">
          {microcopy.get("data.source.text")}
        </Typography>
      </InfoTooltip>
    </Box>
    <ShareButton
      url={getRegionUrl(region)}
      quote={microcopy.get("share.quote")}
    />
  </Stack>
);
