import { useRef, useState } from "react";

import { Box } from "@mui/material";
import { NextPage } from "next";

import { useMutationObserver } from "@actnowcoalition/actnow.js";

import { ScreenshotWrapper } from "components/Containers";
import { ShareImageHomepage } from "components/ShareImages";
import { searchDomForClass } from "src/utils/share-pages";

const HomeSharePage: NextPage = () => {
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

  return (
    <ScreenshotWrapper className="screenshot">
      <Box ref={ref} className={isLoaded ? "screenshot-ready" : undefined}>
        <ShareImageHomepage />
      </Box>
    </ScreenshotWrapper>
  );
};
export default HomeSharePage;
