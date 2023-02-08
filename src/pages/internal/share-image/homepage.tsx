import { NextPage } from "next";

import { ScreenshotWrapper } from "components/Containers";
import { ShareImageHomepage } from "components/ShareImages";

// http://localhost:3000/internal/share-image/homepage
const HomeSharePage: NextPage = () => {
  return (
    <ScreenshotWrapper className="screenshot">
      <ShareImageHomepage />
    </ScreenshotWrapper>
  );
};
export default HomeSharePage;
