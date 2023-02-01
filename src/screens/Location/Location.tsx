import PeopleIcon from "@mui/icons-material/People";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";

import {
  AutoWidth,
  MetricLineThresholdChart,
  MetricOverview,
  MultiRegionMultiMetricChart,
  Region,
} from "@actnowcoalition/actnow.js";

import {
  BorderedPageSection,
  PageContainer,
  PageSection,
  Placeholder,
} from "components/Containers";
import LocationOverview from "components/LocationOverview";
import { PageMetaTags } from "components/SocialMetaTags";
import { Page } from "src/cms";
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
                size="large"
                endIcon={<PeopleIcon />}
                sx={{
                  color: theme.palette.common.white,
                  borderColor: "#F2F3F440",
                  "&:hover": {
                    borderColor: "#F2F3F440",
                  },
                }}
              >
                Share
              </Button>
            </Box>
          </Stack>
        </PageSection>
        <BorderedPageSection sx={{ backgroundColor: "white" }}>
          <LocationOverview region={region} />
        </BorderedPageSection>
        <BorderedPageSection sx={{ backgroundColor: "white" }}>
          {/* Example of a responsive layout */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <MetricOverview region={region} metric={MetricId.LIFE_LADDER} />
            </Grid>
            <Grid item xs={12} md>
              <AutoWidth>
                <MetricLineThresholdChart
                  region={region}
                  metric={MetricId.LIFE_LADDER}
                  height={250}
                  width={0}
                />
              </AutoWidth>
            </Grid>
          </Grid>
          <Placeholder sx={{ mt: 3, minHeight: 180 }} />
        </BorderedPageSection>
        <PageSection>
          <Stack spacing={2}>
            <Typography variant="h2">Explore</Typography>
            <AutoWidth>
              <MultiRegionMultiMetricChart
                metrics={ALL_METRICS}
                regions={regions.all}
                initialMetric={MetricId.LIFE_LADDER}
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
          </Stack>
        </PageSection>
        {/* Replace the placeholder with real content */}
        <PageSection>
          <Placeholder />
        </PageSection>
        <PageSection>
          <Placeholder />
        </PageSection>
        <PageSection>
          <Placeholder />
        </PageSection>
      </PageContainer>
    </>
  );
};
