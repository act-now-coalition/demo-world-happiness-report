import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShareImageLocation } from ".";
import { regions } from "../../utils/regions";

export default {
  title: "Components/ShareImageLocation",
  component: ShareImageLocation,
} as ComponentMeta<typeof ShareImageLocation>;

const Template: ComponentStory<typeof ShareImageLocation> = () => (
  <ShareImageLocation region={regions.findByRegionIdStrict("NOR")} />
);

export const Home = Template.bind({});
Home.args = {};
