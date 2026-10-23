/**
 * Presentation recipe for every inner page. The copy lives in
 * src/content/pages.ts; this decides how each page is *laid out*, so pages
 * with different jobs (explain, prove, reassure, convert, look up) no longer
 * share one template.
 */
export type HeroKind = "split" | "visual" | "statement" | "compact";
export type VisualKind = "frontdesk" | "intake" | "coverage" | "datapath" | "hub" | "gantt" | "quote";
/** list: ruled rows beside a sticky heading. index: numbered columns. matrix: bordered spec-sheet cells. stack: oversized statements. */
export type FeatureKind = "list" | "index" | "matrix" | "stack";
/** timeline: horizontal dots. spine: zig-zag flow. layers: architecture diagram. lanes: priority rows. */
export type StepKind = "timeline" | "spine" | "layers" | "lanes";

export type Layout = {
  hero: HeroKind;
  visual?: VisualKind;
  features?: FeatureKind[];
  steps?: StepKind;
};

export const layouts: Record<string, Layout> = {
  product: { hero: "visual", visual: "frontdesk", features: ["matrix"], steps: "timeline" },
  solutions: { hero: "statement", features: ["stack"] },
  "solutions/waitlist-automation": { hero: "visual", visual: "frontdesk", steps: "spine" },
  "solutions/medical-intake": { hero: "visual", visual: "intake", features: ["matrix"] },
  "solutions/insurance-intake": { hero: "visual", visual: "coverage", features: ["index"], steps: "spine" },
  security: { hero: "visual", visual: "datapath", features: ["matrix"] },
  technology: { hero: "split", features: ["matrix"], steps: "layers" },
  "case-studies": { hero: "statement", steps: "spine" },
  pricing: { hero: "visual", visual: "quote", features: ["index"] },
  faq: { hero: "compact" },
  support: { hero: "compact", features: ["index"], steps: "lanes" },
  about: { hero: "statement", features: ["stack"] },
  leadership: { hero: "statement", features: ["stack"] },
  implementation: { hero: "visual", visual: "gantt", steps: "spine" },
  integrations: { hero: "visual", visual: "hub", features: ["matrix"] },
  contact: { hero: "compact" },
  "privacy-policy": { hero: "compact" },
  "terms-of-service": { hero: "compact" },
};
