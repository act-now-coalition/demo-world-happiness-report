import { Grid, Typography } from "@mui/material";

import { Region } from "@actnowcoalition/regions";
import {
  AutoWidth,
  MetricLineThresholdChart,
  MetricOverview,
} from "@actnowcoalition/ui-components";

import {
  BorderedPageSection,
  PageContainer,
  PageSection,
  Placeholder,
} from "components/Containers";
import { PageMetaTags } from "components/SocialMetaTags";
import { Page } from "src/cms";
import { MetricId } from "src/utils/metrics";

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
        <PageSection>
          <Placeholder />
        </PageSection>
      </PageContainer>
    </>
  );
};
