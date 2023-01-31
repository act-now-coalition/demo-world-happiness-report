import { RegionDB, nations } from "@actnowcoalition/actnow.js";

import { getRegionRelativeUrl } from "./routing";

// TODO: Customize the set of regions your Act Now site supports here.
// You can import additional predefined regions from @actnowcoalition/regions above.
export const regions = new RegionDB(nations.all, {
  getRegionUrl: getRegionRelativeUrl,
});
