import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./src/day7/data/input.json', 'utf8'));
const crabsHorizontalPositions: number[] = input.horizontal_positions;
const maxHorizontalPosition: number = Math.max(...crabsHorizontalPositions);
const energyExpenditurePerPosition: number[] = new Array(maxHorizontalPosition + 1).fill(0);

for (let position = 0; position <= maxHorizontalPosition; position++) {
  for (const crabsHorizontalPosition of crabsHorizontalPositions) {
    const moves: number = Math.abs(crabsHorizontalPosition - position);

    energyExpenditurePerPosition[position] += moves;
  }
}

const minEnergy: number = Math.min(...energyExpenditurePerPosition);

console.log('🚀 ~ file: part1.ts ~ line 18 ~ minEnergy', minEnergy);
