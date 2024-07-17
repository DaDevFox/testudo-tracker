const levenshtein = require("js-levenshtein");

export function fuzzyCompare(a, b) {
  return levenshtein(a, b);
}
