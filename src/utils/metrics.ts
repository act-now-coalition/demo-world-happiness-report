import { MetricCatalog, MetricDefinition } from "@actnowcoalition/metrics";
import { CsvDataProvider } from "@actnowcoalition/metrics";

import DataSnapshotJSON from "../assets/data/data-snapshot.json";
import { regions } from "./regions";
import { theme } from "src/styles";

export enum MetricId {
  LIFE_LADDER = "Life Ladder",
}

export const dataProviders = [
  // To import CSV data, copy the CSV file to `public/data`, modify the
  // following lines, and uncomment / modify the example MetricId.CSV_METRIC
  // definition below.
  new CsvDataProvider(/*id=*/ "world-happiness", {
    url: "/data/world-happiness.csv",
    regionDb: regions,
    regionColumn: "regionId",
    dateColumn: "date",
  }),
];

export const metrics: MetricDefinition[] = [
  {
    id: MetricId.LIFE_LADDER,
    name: "Happiness",
    extendedName: "Living best possible life (X/10)",
    dataReference: {
      providerId: "world-happiness",
      column: "Life Ladder",
    },
    categoryThresholds: [5, 7],
    categorySetId: "happiness-levels",
    formatOptions: {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
    minValue: 0,
    maxValue: 10,
  },
];

export const categorySets = [
  {
    id: "happiness-levels",
    categories: [
      { id: "low", name: "Low", color: theme.palette.severity[500] },
      { id: "medium", name: "Medium", color: theme.palette.severity[300] },
      { id: "high", name: "High", color: theme.palette.severity[100] },
    ],
    defaultCategory: {
      color: "grey",
      id: "unknown",
      name: "Unknown",
    },
  },
];

export const metricCatalog = new MetricCatalog(metrics, dataProviders, {
  categorySets,
  snapshot: DataSnapshotJSON,
});
