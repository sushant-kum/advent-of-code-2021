import fs from 'fs';

interface InsertionRule {
  pair: string;
  insert: string;
}

const input = JSON.parse(fs.readFileSync('./src/day14/data/input.json', 'utf8'));
const insertionRules: InsertionRule[] = input.insertion_rules;
const polymer: string = input.initial_polymer;
const steps = 40;
const insertionRulesMap: Map<string, string> = new Map<string, string>();
const letterCountMap: Map<string, number> = new Map<string, number>();

let polymerPairCountMap: Map<string, number> = new Map<string, number>();

for (let i = 0; i < polymer.length - 1; i++) {
  const pair: string = polymer[i] + polymer[i + 1];

  polymerPairCountMap.set(pair, (polymerPairCountMap.get(pair) ?? 0) + 1);
}

polymer.split('').forEach((polymerLetter: string) => {
  letterCountMap.set(polymerLetter, (letterCountMap.get(polymerLetter) ?? 0) + 1);
});

insertionRules.forEach((insertionRule: InsertionRule) => {
  insertionRulesMap.set(insertionRule.pair, insertionRule.insert);
});

for (let step = 1; step <= steps; step++) {
  const tempPolymerPairCountMap: Map<string, number> = new Map<string, number>([...polymerPairCountMap.entries()]);

  [...polymerPairCountMap.entries()].forEach(([pair, pairCount]: [string, number]) => {
    const insert: string | undefined = insertionRulesMap.get(pair);

    if (insert !== undefined) {
      const newPairs: [string, string] = [pair[0] + insert, insert + pair[1]];
      const tempPairCount: number = tempPolymerPairCountMap.get(pair) as number;

      if (tempPairCount === pairCount) {
        tempPolymerPairCountMap.delete(pair);
      } else {
        tempPolymerPairCountMap.set(pair, tempPairCount - pairCount);
      }

      newPairs.forEach((newPair) => {
        tempPolymerPairCountMap.set(newPair, (tempPolymerPairCountMap.get(newPair) ?? 0) + pairCount);
      });

      letterCountMap.set(insert, (letterCountMap.get(insert) ?? 0) + pairCount);
    }
  });

  polymerPairCountMap = new Map<string, number>([...tempPolymerPairCountMap.entries()]);
}

console.log('🚀 ~ file: index.ts ~ line 13 ~ polymerPairCountMap', polymerPairCountMap);

console.log('🚀 ~ file: index.ts ~ line 13 ~ letterCountMap', letterCountMap);

console.log(
  '🚀 ~ file: index.ts ~ line 46 ~ Math.max(...letterCountMap.values()) - Math.min(...letterCountMap.values())',
  Math.max(...letterCountMap.values()) - Math.min(...letterCountMap.values())
);
