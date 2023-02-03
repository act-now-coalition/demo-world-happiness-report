import { useRef, useState } from "react";

import { Box } from "@mui/material";
import isEmpty from "lodash/isEmpty";
import { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Region,
  assert,
  useMutationObserver,
} from "@actnowcoalition/actnow.js";

import { regions } from "../../../utils/regions";
import { ScreenshotWrapper } from "components/Containers";
import { ShareImageLocation } from "components/ShareImages";
import { searchDomForClass } from "src/utils/share-pages";

// http://localhost:3000/internal/share-image/location?regionId=CAN
const LocationSharePage: NextPage = () => {
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
    return (
      <span>
        Page loading or no query params were provided. Expects params: regionId
      </span>
    );
  }

  const { regionId } = router.query;
  const region = regions.findByRegionIdStrict(regionId as string);
  assert(region instanceof Region, `Region with ID ${regionId} not found`);

  return (
    <ScreenshotWrapper className="screenshot">
      <Box ref={ref} className={isLoaded ? "screenshot-ready" : undefined}>
        <ShareImageLocation region={region} />
      </Box>
    </ScreenshotWrapper>
  );
};
export default LocationSharePage;
