import fs from 'fs';

interface InsertionRule {
  pair: string;
  insert: string;
}

const input = JSON.parse(fs.readFileSync('./src/day14/data/input.json', 'utf8'));
const insertionRules: InsertionRule[] = input.insertion_rules;
const steps = 10;
const insertionRulesMap: Map<string, string> = new Map<string, string>();
const letterCountMap: Map<string, number> = new Map<string, number>();

let polymer: string = input.initial_polymer;

polymer.split('').forEach((polymerLetter: string) => {
  letterCountMap.set(polymerLetter, (letterCountMap.get(polymerLetter) ?? 0) + 1);
});

insertionRules.forEach((insertionRule: InsertionRule) => {
  insertionRulesMap.set(insertionRule.pair, insertionRule.insert);
});

for (let step = 1; step <= steps; step++) {
  for (let i = 0; i < polymer.length - 1; i++) {
    const pair: string = polymer[i] + polymer[i + 1];
    const insert: string | undefined = insertionRulesMap.get(pair);

    if (insert !== undefined) {
      polymer = polymer.slice(0, i + 1) + insert + polymer.slice(i + 1);
      letterCountMap.set(insert, (letterCountMap.get(insert) ?? 0) + 1);
      i++;
    }
  }
}

console.log('🚀 ~ file: index.ts ~ line 37 ~ letterCountMap', letterCountMap);

console.log('🚀 ~ file: index.ts ~ line 39 ~ polymer', polymer);

console.log(
  '🚀 ~ file: index.ts ~ line 41 ~ Math.max(...letterCountMap.values()) - Math.min(...letterCountMap.values())',
  Math.max(...letterCountMap.values()) - Math.min(...letterCountMap.values())
);
