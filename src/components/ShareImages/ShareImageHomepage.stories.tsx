import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShareImageHomepage } from ".";

export default {
  title: "Components/ShareImageHomepage",
  component: ShareImageHomepage,
} as ComponentMeta<typeof ShareImageHomepage>;

const Template: ComponentStory<typeof ShareImageHomepage> = () => (
  <ShareImageHomepage />
);

export const Home = Template.bind({});
Home.args = {};
