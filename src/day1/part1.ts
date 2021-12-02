import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./src/day1/input.json', 'utf8'));
const depths: number[] = input.depths;

let depthIncreases = 0;

depths.forEach((depth, index) => {
  if (index !== depths.length && depth < depths[index + 1]) {
    depthIncreases++;
  }
});

console.log('🚀 ~ file: index.ts ~ line 24 ~ depthIncreases', depthIncreases);
