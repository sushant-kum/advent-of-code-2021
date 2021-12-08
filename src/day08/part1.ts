import fs from 'fs';

interface Display {
  patterns: string[];
  outputs: string[];
}

const input = JSON.parse(fs.readFileSync('./src/day08/data/input.json', 'utf8'));
const displays: Display[] = input.displays;
const easyOutputs: string[] = displays
  .map((display: Display) => display.outputs)
  .flat()
  .filter((pattern: string) => [2, 3, 4, 7].includes(pattern.length));

console.log('🚀 ~ file: part1.ts ~ line 15 ~ easyOutputs', easyOutputs);
console.log('🚀 ~ file: part1.ts ~ line 16 ~ easyOutputs.length', easyOutputs.length);
