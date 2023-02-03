import React from "react";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  AutoWidth,
  InfoTooltip,
  MetricCompareTable,
  MetricLegendThreshold,
  MetricWorldMap,
  RegionSearch,
  ShareButton,
} from "@actnowcoalition/actnow.js";

import { styled } from "../../styles";
import { PageContainer, PageSection } from "components/Containers";
import { PageMetaTags } from "components/SocialMetaTags";
import { Page, cms } from "src/cms";
import { Microcopy } from "src/cms/models/Microcopy";
import { Trends } from "src/components/Trends";
import { ALL_METRICS, MetricId } from "src/utils/metrics";
import { regions } from "src/utils/regions";

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
              <InputLabel
                htmlFor="region-search"
                sx={{ color: "white", mb: "4px" }}
              >
                Search for your country
              </InputLabel>
              <StyledRegionSearch
                id="region-search"
                options={regions.all}
                regionDB={regions}
                inputLabel=""
              />
            </Grid>
            <Grid item xs={12} md display="flex" alignItems="flex-end">
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
          sx={{
            backgroundColor: (theme) => theme.palette.common.white,
            padding: { xs: 0.5, sm: 5 },
            borderRadius: 2,
          }}
        >
          <AutoWidth>
            <MetricWorldMap regionDB={regions} metric={MetricId.HAPPINESS} />
          </AutoWidth>
          <MetricLegendThreshold
            orientation="horizontal"
            height={8}
            borderRadius={4}
            width={240}
            metric={MetricId.HAPPINESS}
          />
        </PageSection>

        <PageSection>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Compare
          </Typography>
          <Paper style={{ height: 500, overflow: "auto" }}>
            <MetricCompareTable
              regionDB={regions}
              regions={regions.all}
              metrics={ALL_METRICS}
            />
          </Paper>
          <ShareBlock microcopy={microcopy} />
        </PageSection>

        <PageSection>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Explore
          </Typography>
          <Trends />
          <ShareBlock microcopy={microcopy} />
        </PageSection>
      </PageContainer>
    </>
  );
};

export default Homepage;

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

const StyledRegionSearch = styled(RegionSearch)`
  & .MuiFormControl-root {
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  }
`;
