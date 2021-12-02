import fs from 'fs';

enum TravelDirection {
  FORWARD = 'forward',
  UP = 'up',
  DOWN = 'down',
}

const input = JSON.parse(fs.readFileSync('./src/day2/input.json', 'utf8'));
const travels: [TravelDirection, number][] = input.travels;

let depth = 0;
let horizontal = 0;

travels.forEach((travel) => {
  switch (travel[0]) {
    case TravelDirection.FORWARD:
      horizontal += travel[1];
      break;

    case TravelDirection.UP:
      depth -= travel[1];
      break;

    case TravelDirection.DOWN:
      depth += travel[1];
      break;

    default:
      break;
  }
});

console.log('🚀 ~ file: index.ts ~ line 34 ~ horizontal', horizontal);
console.log('🚀 ~ file: index.ts ~ line 35 ~ depth', depth);
console.log('🚀 ~ file: index.ts ~ line 36 ~ horizontal * depth', horizontal * depth);
