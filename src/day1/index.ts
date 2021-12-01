import fs from 'fs';

const depths: number[] = JSON.parse(fs.readFileSync('./input.json', 'utf8')).depths;

let depthIncreases = 0;
let groupDepthIncreases = 0;

depths.forEach((depth, index) => {
  if (index !== depths.length - 2) {
    const groupASum: number = depth + depths[index + 1] + depths[index + 2];
    const groupBSum: number = depths[index + 1] + depths[index + 2] + depths[index + 3];

    if (depth < depths[index + 1]) {
      depthIncreases++;
    }

    if (groupASum < groupBSum) {
      groupDepthIncreases++;
    }
  }
});

console.log('🚀 ~ file: index.ts ~ line 23 ~ depthIncreases', depthIncreases);
console.log('🚀 ~ file: index.ts ~ line 24 ~ groupDepthIncreases', groupDepthIncreases);
