import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./src/day09/data/input.json', 'utf8'));
const heightMatrix: number[][] = input.height_matrix;
const heightMatrixRows: number = heightMatrix.length;
const heightMatrixCols: number = heightMatrix[0].length;
const basinMatrix: boolean[][] = JSON.parse(
  JSON.stringify(new Array(heightMatrixRows).fill(new Array(heightMatrixCols).fill(undefined)))
);
const basinSizes: number[] = [];
const largestBasinSizes: number[] = new Array(3).fill(0);
const basinSizeMapping: { [key: string]: number } = {};

function isValidPoint(row: number, col: number): boolean {
  return row >= 0 && col >= 0 && row < heightMatrixRows && col < heightMatrixCols && basinMatrix[row][col];
}

function calcBasinSize(originatingRow: number, originatingCol: number, row: number, col: number): void {
  const directionsRow: number[] = [-1, 0, 1, 0];
  const directionsCol: number[] = [0, 1, 0, -1];

  basinMatrix[row][col] = false;

  for (let i = 0; i < directionsRow.length; i++) {
    if (isValidPoint(row + directionsRow[i], col + directionsCol[i])) {
      basinSizeMapping[originatingRow.toString() + originatingCol.toString()]++;
      calcBasinSize(originatingRow, originatingCol, row + directionsRow[i], col + directionsCol[i]);
    }
  }
}

for (let row = 0; row < heightMatrixRows; row++) {
  for (let col = 0; col < heightMatrixCols; col++) {
    basinMatrix[row][col] = heightMatrix[row][col] === 9 ? false : true;
  }
}

for (let row = 0; row < heightMatrixRows; row++) {
  for (let col = 0; col < heightMatrixCols; col++) {
    if (basinMatrix[row][col]) {
      basinSizeMapping[row.toString() + col.toString()] = 1;
      calcBasinSize(row, col, row, col);

      const basinSize: number = basinSizeMapping[row.toString() + col.toString()];

      if (basinSize) {
        basinSizes.push(basinSize);
      }
    }
  }
}

const basinCounts: number = basinSizes.length;

for (let i = 0; i < largestBasinSizes.length && i < basinCounts; i++) {
  const largestSize: number = Math.max(...basinSizes);

  largestBasinSizes[i] = Math.max(largestSize);
  basinSizes.splice(basinSizes.indexOf(largestSize), 1);
}

console.log('🚀 ~ file: index.ts ~ line 62 ~ basinSizes', basinSizes);
console.log('🚀 ~ file: index.ts ~ line 63 ~ largestBasinSizes', largestBasinSizes);
console.log(
  '🚀 ~ file: index.ts ~ line 64 ~ largestBasinSizes.reduce((previousValue, currentValue) => previousValue * currentValue)',
  largestBasinSizes.reduce((previousValue, currentValue) => previousValue * currentValue)
);
