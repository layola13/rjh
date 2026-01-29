import baseIsMatch from './baseIsMatch';
import getMatchData from './getMatchData';
import matchesStrictComparable from './matchesStrictComparable';

interface MatchData {
  [0]: string;
  [1]: unknown;
  [2]: boolean;
}

export default function baseMatches(source: object): (value: unknown) => boolean {
  const matchData: MatchData[] = getMatchData(source);
  
  if (matchData.length === 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  
  return (value: unknown): boolean => {
    return value === source || baseIsMatch(value, source, matchData);
  };
}