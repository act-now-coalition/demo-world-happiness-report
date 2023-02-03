import PeopleIcon from "@mui/icons-material/People";
import { Box, Button, Paper, Stack, Typography, useTheme } from "@mui/material";

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
import { Page } from "src/cms";
import { Microcopy } from "src/cms/models/Microcopy";
import { ALL_METRICS, MetricId } from "src/utils/metrics";
import { regions } from "src/utils/regions";

export const Location: React.FC<{ region: Region; page: Page }> = ({
  region,
  page,
}) => {
  const { microcopy, metaTags } = page;
  const theme = useTheme();
  return (
    <>
      <PageMetaTags
        siteName="Act Now Location Page"
        url={`/us/${region.shortName}`}
        title={metaTags.title}
        description={metaTags.description}
        socialImg={metaTags.socialImg}
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
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                endIcon={<PeopleIcon />}
                sx={{ color: theme.palette.common.white }}
              >
                Share
              </Button>
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
              <ShareBlock microcopy={microcopy} />
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                sit amet imperdiet lectus.
              </Typography>
              <ShareBlock microcopy={microcopy} />
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
              <ShareBlock microcopy={microcopy} />
            </Stack>
          </Stack>
        </PageSection>
      </PageContainer>
    </>
  );
};

const ShareBlock = ({ microcopy }: { microcopy: Microcopy }) => (
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
      url={microcopy.get("share.url")}
      quote={microcopy.get("share.quote")}
    />
  </Stack>
);
