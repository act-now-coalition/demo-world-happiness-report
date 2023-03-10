import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FacebookMetaTags, PageMetaTags, TwitterMetaTags } from ".";

export default {
  title: "Components/SocialMetaTags",
} as ComponentMeta<typeof PageMetaTags>;

const PageMetaTagsTemplate: ComponentStory<typeof PageMetaTags> = (args) => {
  return (
    <div>
      Inspect the page to see page meta tags
      <PageMetaTags {...args} />
    </div>
  );
};

export const PageMetaTagsExample = PageMetaTagsTemplate.bind({});
PageMetaTagsExample.args = {
  siteName: "Sample site name",
  url: "https://www.covidactnow.org",
  title: "Sample title",
  description: "Sample description",
  socialImg: "https://covidactnow-prod.web.app/share/3995-2743/home.png",
};

const FacebookMetaTagsTemplate: ComponentStory<typeof FacebookMetaTags> = (
  args
) => {
  return (
    <div>
      Inspect the page to see Facebook meta tags
      <FacebookMetaTags {...args} />
    </div>
  );
};

export const FacebookMetaTagsExample = FacebookMetaTagsTemplate.bind({});
FacebookMetaTagsExample.args = {
  fbAppId: "743805156345210",
};

const TwitterMetaTagsTemplate: ComponentStory<typeof TwitterMetaTags> = (
  args
) => {
  return (
    <div>
      Inspect the page to see Twitter meta tags
      <TwitterMetaTags {...args} />
    </div>
  );
};

export const TwitterMetaTagsExample = TwitterMetaTagsTemplate.bind({});
TwitterMetaTagsExample.args = {
  twitterImg: "https://covidactnow-prod.web.app/share/3995-2743/home.png",
};
