import isEmpty from "lodash/isEmpty";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Region, assert } from "@actnowcoalition/actnow.js";

import { regions } from "../../../utils/regions";
import { ScreenshotWrapper } from "components/Containers";
import { ShareImageLocation } from "components/ShareImages";

// http://localhost:3000/internal/share-image/location?regionId=CAN
const LocationSharePage: NextPage = () => {
  const router = useRouter();

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
      <ShareImageLocation region={region} />
    </ScreenshotWrapper>
  );
};
export default LocationSharePage;
