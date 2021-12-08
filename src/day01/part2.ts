import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./src/day01/data/input.json', 'utf8'));
const depths: number[] = input.depths;

let groupDepthIncreases = 0;

depths.forEach((depth, index) => {
  if (index !== depths.length - 2) {
    const groupASum: number = depth + depths[index + 1] + depths[index + 2];
    const groupBSum: number = depths[index + 1] + depths[index + 2] + depths[index + 3];

    if (groupASum < groupBSum) {
      groupDepthIncreases++;
    }
  }
});

console.log('🚀 ~ file: index.ts ~ line 19 ~ groupDepthIncreases', groupDepthIncreases);
