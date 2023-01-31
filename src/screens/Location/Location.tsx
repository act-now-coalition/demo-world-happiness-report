import { Grid, Stack, Typography } from "@mui/material";

import { Region } from "@actnowcoalition/regions";
import {
  AutoWidth,
  MetricLineThresholdChart,
  MetricOverview,
  MultiRegionMultiMetricChart,
} from "@actnowcoalition/ui-components";

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
          <Typography variant="h1" color="white">
            {region.shortName}
          </Typography>
          <Typography color="white">
            {microcopy.get("heading.updated")}
          </Typography>
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
