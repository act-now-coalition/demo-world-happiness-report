import { Paper, Typography } from "@mui/material";

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
          <Typography variant="h1" align="center">
            {microcopy.get("title")}
          </Typography>
          <Typography variant="h2" align="center">
            {microcopy.get("heading.title")}
          </Typography>
          <Typography
            variant="paragraphLarge"
            align="center"
            sx={{ display: "block", my: 2 }}
          >
            {microcopy.get("heading.intro")}
          </Typography>
        </PageSection>
        <PageSection>
          <RegionSearch options={regions.all} regionDB={regions} />
        </PageSection>
        {/* Replace the placeholders with real content */}
        <PageSection>
          <AutoWidth>
            <MetricWorldMap
              regionDB={regions}
              metric={MetricId.LIFE_LADDER}
              getTooltip={(regionId) => {
                const region = regions.findByRegionId(regionId);
                return region ? <>{region.shortName}</> : "";
              }}
              getRegionUrl={(regionId) => {
                const region = regions.findByRegionId(regionId);
                return region ? regions.getRegionUrl(region) : "/";
              }}
            />
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
