import fs from 'fs';

enum TravelDirection {
  FORWARD = 'forward',
  UP = 'up',
  DOWN = 'down',
}

const input = JSON.parse(fs.readFileSync('./input.json', 'utf8'));
const travels: [TravelDirection, number][] = input.travels;

let aim = 0;
let depth = 0;
let horizontal = 0;

travels.forEach((travel) => {
  switch (travel[0]) {
    case TravelDirection.FORWARD:
      horizontal += travel[1];
      depth += travel[1] * aim;
      break;

    case TravelDirection.UP:
      aim -= travel[1];
      break;

    case TravelDirection.DOWN:
      aim += travel[1];
      break;

    default:
      break;
  }
});

console.log('🚀 ~ file: index.ts ~ line 36 ~ aim', aim);
console.log('🚀 ~ file: index.ts ~ line 37 ~ horizontal', horizontal);
console.log('🚀 ~ file: index.ts ~ line 38 ~ depth', depth);
console.log('🚀 ~ file: index.ts ~ line 39 ~ horizontal * depth', horizontal * depth);
