import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Button, Grid, Paper, Typography } from "@mui/material";

import {
  AutoWidth,
  MetricCompareTable,
  MetricWorldMap,
  MultiRegionMultiMetricChart,
  RegionSearch,
} from "@actnowcoalition/ui-components";

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
          <Typography variant="h1" sx={{ mt: { md: 8, xs: 3 } }}>
            {microcopy.get("title")}
          </Typography>
          <Typography
            variant="paragraphLarge"
            sx={{ display: "block", my: 2, maxWidth: "sm" }}
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
                endIcon={<CloudDownloadIcon />}
              >
                Download full report
              </Button>
            </Grid>
          </Grid>
        </PageSection>
        {/* Replace the placeholders with real content */}
        <PageSection>
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
