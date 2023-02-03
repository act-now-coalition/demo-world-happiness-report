/**
 * Plop is a tool that saves time and helps scaffolding code with consistency.
 *
 * See https://plopjs.com/documentation/ for more details.
 */
import _ from "lodash";

const templateComponentMain = prepareTemplate(`
import React from "react";

export interface {{pascalCase name}}Props {

}

export const {{pascalCase name}} = (props: {{pascalCase name}}Props) => {
  return <>{{pascalCase name}}</>;
};`);

const templateComponentStories = prepareTemplate(`
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { {{pascalCase name}} } from ".";

export default {
  title: "Components/{{pascalCase name}}",
  component: {{pascalCase name}},
} as ComponentMeta<typeof {{pascalCase name}}>;

const Template: ComponentStory<typeof {{pascalCase name}}> = (args) => (
  <{{pascalCase name}} {...args} />
);

export const Example = Template.bind({});
Example.args = {};
`);

const templateComponentIndex = prepareTemplate(`
export * from "./{{pascalCase name}}";
`);

const componentBasePath = "src/components";

const templateSharePage = prepareTemplate(`
import { useRef, useState } from "react";

import { Box } from "@mui/system";
import isEmpty from "lodash/isEmpty";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { useMutationObserver } from "@actnowcoalition/actnow.js";

import { ScreenshotWrapper } from "components/Containers";
import { searchDomForClass } from "src/utils/share-pages";

const {{pascalCase name}}SharePage: NextPage = () => {
  const router = useRouter();
  const ref = useRef<Element>(null);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const handleMutations: MutationCallback = (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        searchDomForClass(mutation.target as Element, setIsLoaded);
      }
    }
  };
  useMutationObserver(ref, handleMutations, { childList: true, subtree: true });

  if (isEmpty(router.query)) {
    return <span>Page loading or no query params were provided. Expects params: {{queryParams}}</span>;
  }
  const { {{queryParams}} } = router.query;
  // Add an assertion that expected URL query params exist here.

  return (
    <ScreenshotWrapper className="screenshot">
      <Box ref={ref} className={isLoaded ? "screenshot-ready" : undefined}>
        {/* Place slowest-to-load Metric-aware component here (like MetricUSNationalMap
            below). The mutation observer will detect when the component is loaded
            and signal that the screenshot is ready to be taken. If not using
            any Metric-aware components, you can remove the mutation observer
            logic and just set the parent className to screenshot-ready.*/}
      </Box>
    </ScreenshotWrapper>
  );
};
export default {{pascalCase name}}SharePage;
`);

const templateSharePageListItem = prepareTemplate(`
          <ListItem>
            <Link href="/internal/share-image/{{name}}-share-page?">{{name}}</Link>
          </ListItem>
          $1`);

function plopConfig(/** @type {import('plop').NodePlopAPI} */ plop) {
  const internalPagePath = "src/pages/internal";
  plop.setGenerator("share-page", {
    description:
      "Creates a share page with given name and URL query parameters.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Share page name in kebab-case.",
        example: "us-map",
      },
      {
        type: "input",
        name: "queryParams",
        message: "Expected URL query params (comma separated).",
        example: "metric, showCounties",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${internalPagePath}/share-image/{{name}}-share-page.tsx`,
        template: templateSharePage,
      },
      {
        path: `${internalPagePath}/index.tsx`,
        pattern: /({\/\* ADD SHARE PAGES HERE \*\/})/g,
        template: templateSharePageListItem,
        type: "modify",
      },
    ],
  });
  plop.setGenerator("component", {
    description: "Creates a component module with stories, styles and index.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${componentBasePath}/{{pascalCase name}}/index.ts`,
        template: templateComponentIndex,
      },
      {
        type: "add",
        path: `${componentBasePath}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
        template: templateComponentMain,
      },
      {
        type: "add",
        path: `${componentBasePath}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx`,
        template: templateComponentStories,
      },
    ],
  });
}

export default plopConfig;

function prepareTemplate(srcTemplate) {
  return _.trimStart(srcTemplate);
}
