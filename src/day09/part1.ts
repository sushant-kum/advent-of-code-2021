import fs from 'fs';

interface DepthAround {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const input = JSON.parse(fs.readFileSync('./src/day09/data/input.json', 'utf8'));
const heightMatrix: number[][] = input.height_matrix;
const heightMatrixRows: number = heightMatrix.length;
const heightMatrixCols: number = heightMatrix[0].length;

let riskLevel = 0;

for (let row = 0; row < heightMatrixRows; row++) {
  for (let col = 0; col < heightMatrixCols; col++) {
    const depthAround: DepthAround = {
      top: heightMatrix[row - 1] ? heightMatrix[row - 1][col] : Number.MAX_SAFE_INTEGER,
      right: heightMatrix[row][col + 1] ?? Number.MAX_SAFE_INTEGER,
      bottom: heightMatrix[row + 1] ? heightMatrix[row + 1][col] : Number.MAX_SAFE_INTEGER,
      left: heightMatrix[row][col - 1] ?? Number.MAX_SAFE_INTEGER,
    };

    if (
      heightMatrix[row][col] < depthAround.top &&
      heightMatrix[row][col] < depthAround.right &&
      heightMatrix[row][col] < depthAround.bottom &&
      heightMatrix[row][col] < depthAround.left
    ) {
      riskLevel += heightMatrix[row][col] + 1;
    }
  }
}

console.log('🚀 ~ file: part1.ts ~ line 37 ~ riskLevel', riskLevel);
