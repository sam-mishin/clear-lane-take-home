// Educational coverage examples for the homepage explorer. Not actual policies.
// Situations first, then the term (see docs/style-guide.md, Coverage explorer).

export type CoverageExample = {
  id: string;
  name: string;
  summary: string;
  helpsWith: string[];
  doesNotHelpWith: string[];
  terms: { term: string; definition: string }[];
};

// TODO: three examples.
export const coverageExamples: CoverageExample[] = [];
