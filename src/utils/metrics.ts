import { MetricCatalog, MetricDefinition } from "@actnowcoalition/metrics";
import { CsvDataProvider } from "@actnowcoalition/metrics";

import DataSnapshotJSON from "../assets/data/data-snapshot.json";
import { regions } from "./regions";
import { theme } from "src/styles";

export enum MetricId {
  LIFE_LADDER = "Life Ladder",
  GDP = "gdp",
  SOCIAL = "social",
  HEALTH = "health",
  FREEDOM = "freedom",
  GENEROSITY = "generosity",
  CORRUPTION = "corruption",
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
  {
    id: MetricId.GDP,
    name: "GDP",
    extendedName: "GDP per capita (log)",
    dataReference: {
      providerId: "world-happiness",
      column: "Log GDP per capita",
    },
    categoryThresholds: [8.250254631, 10.58656406],
    categorySetId: "happiness-levels",
    formatOptions: {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
  },
  {
    id: MetricId.SOCIAL,
    name: "Social Support",
    extendedName: "% with reliable support",
    dataReference: {
      providerId: "world-happiness",
      column: "Social support",
    },
    categoryThresholds: [0.7214247584, 0.9172033668],
    categorySetId: "happiness-levels",
    formatOptions: {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  },
  {
    id: MetricId.HEALTH,
    name: "Health",
    extendedName: "Healthy life expectancy (yrs)",
    dataReference: {
      providerId: "world-happiness",
      column: "Healthy life expectancy at birth",
    },
    categoryThresholds: [57.04999924, 69.95999908],
    categorySetId: "happiness-levels",
    formatOptions: {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
  },
  {
    id: MetricId.FREEDOM,
    name: "Freedom",
    extendedName: "% satisfied with freedom",
    dataReference: {
      providerId: "world-happiness",
      column: "Freedom to make life choices",
    },
    categoryThresholds: [0.6301517487, 0.8844797611],
    categorySetId: "happiness-levels",
    formatOptions: {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  },
  {
    id: MetricId.GENEROSITY,
    name: "Generosity",
    extendedName: "GDP-adjusted likelihood to donate",
    dataReference: {
      providerId: "world-happiness",
      column: "Generosity",
    },
    categoryThresholds: [-0.1314028502, 0.1457333267],
    categorySetId: "happiness-levels",
    formatOptions: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  {
    id: MetricId.CORRUPTION,
    name: "Corruption",
    extendedName: "Prevalence of perceived corruption",
    dataReference: {
      providerId: "world-happiness",
      column: "Perceptions of corruption",
    },
    categoryThresholds: [0.9047068357, 0.6632885933],
    categorySetId: "happiness-levels",
    formatOptions: {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  },
];

export const ALL_METRICS = metrics.map((m) => m.id);

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
