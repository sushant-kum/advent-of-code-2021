import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./src/day11/data/input.json', 'utf8'));
const energiesMatrix: number[][] = input.energies_matrix;
const energyThreshold = 9;
const steps = 100;
const alreadyFlashedInStep: { [key: string]: boolean[][] } = {};
const flashesPerStep: { [key: string]: number } = {};

let flashes = 0;

function isSafeCoordinate(row: number, col: number): boolean {
  return row >= 0 && col >= 0 && row < energiesMatrix.length && col < energiesMatrix[0].length;
}

function updateAdjacentEnergies(row: number, col: number, step: number): void {
  const directionsRow: number[] = [-1, -1, 0, 1, 1, 1, 0, -1];
  const directionsCol: number[] = [0, 1, 1, 1, 0, -1, -1, -1];

  for (let i = 0; i < directionsRow.length; i++) {
    if (
      isSafeCoordinate(row + directionsRow[i], col + directionsCol[i]) &&
      !alreadyFlashedInStep[step][row + directionsRow[i]][col + directionsCol[i]]
    ) {
      energiesMatrix[row + directionsRow[i]][col + directionsCol[i]]++;
    }
  }
}

function updateEnergies(row: number, col: number, step: number): void {
  const directionsRow: number[] = [-1, -1, 0, 1, 1, 1, 0, -1];
  const directionsCol: number[] = [0, 1, 1, 1, 0, -1, -1, -1];

  for (let i = 0; i < directionsRow.length; i++) {
    if (
      isSafeCoordinate(row + directionsRow[i], col + directionsCol[i]) &&
      energiesMatrix[row + directionsRow[i]][col + directionsCol[i]] > energyThreshold &&
      !alreadyFlashedInStep[step][row + directionsRow[i]][col + directionsCol[i]]
    ) {
      alreadyFlashedInStep[step][row + directionsRow[i]][col + directionsCol[i]] = true;
      updateAdjacentEnergies(row + directionsRow[i], col + directionsCol[i], step);
      energiesMatrix[row + directionsRow[i]][col + directionsCol[i]] = 0;
      updateEnergies(row + directionsRow[i], col + directionsCol[i], step);
    }
  }
}

for (let step = 1; step <= steps; step++) {
  alreadyFlashedInStep[step] = JSON.parse(
    JSON.stringify(new Array(energiesMatrix.length).fill(new Array(energiesMatrix[0].length).fill(false)))
  );
  flashesPerStep[step] = 0;

  energiesMatrix.forEach((energiesRow: number[], row: number) => {
    energiesRow.forEach((energy: number, col: number) => {
      energiesMatrix[row][col]++;

      if (energiesMatrix[row][col] > energyThreshold) {
        alreadyFlashedInStep[step][row][col] = true;
        updateAdjacentEnergies(row, col, step);
        energiesMatrix[row][col] = 0;
        updateEnergies(row, col, step);
      }
    });
  });

  energiesMatrix.forEach((energiesRow: number[], row: number) => {
    energiesRow.forEach((energy: number, col: number) => {
      if (alreadyFlashedInStep[step][row][col]) {
        energiesMatrix[row][col] = 0;
      }
      if (energiesMatrix[row][col] === 0) {
        flashesPerStep[step]++;
      }
    });
  });

  flashes += flashesPerStep[step];
}

console.log('🚀 ~ file: index.ts ~ line 49 ~ flashesPerStep', flashesPerStep);
console.log('🚀 ~ file: index.ts ~ line 9 ~ flashes', flashes);
