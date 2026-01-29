import baseIsMatch from './baseIsMatch';
import getMatchData from './getMatchData';
import matchesStrictComparable from './matchesStrictComparable';

export default function baseMatches(source: unknown): (value: unknown) => boolean {
  const matchData = getMatchData(source);
  
  if (matchData.length === 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  
  return function(value: unknown): boolean {
    return value === source || baseIsMatch(value, source, matchData);
  };
}