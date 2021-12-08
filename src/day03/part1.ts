import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./src/day03/data/input.json', 'utf8'));
const diagnostics: string[] = input.diagnostics;
const diagnosticReportLength: number = diagnostics[0].length;

let gammaBin = '';
let epsilonBin = '';

for (let i = 0; i < diagnosticReportLength; i++) {
  let countZero = 0;
  let countOne = 0;

  diagnostics.forEach((diagnostic) => {
    if (diagnostic[i] === '0') {
      countZero++;
    } else {
      countOne++;
    }
  });

  gammaBin += countZero >= countOne ? '0' : '1';
  epsilonBin += countZero <= countOne ? '0' : '1';
}

console.log('🚀 ~ file: index.ts ~ line 26 ~ gammaBin', gammaBin);
console.log('🚀 ~ file: index.ts ~ line 27 ~ epsilonBin', epsilonBin);

const gamma: number = parseInt(gammaBin, 2);
const epsilon: number = parseInt(epsilonBin, 2);

console.log('🚀 ~ file: part1.ts ~ line 32 ~ gamma', gamma);
console.log('🚀 ~ file: part1.ts ~ line 33 ~ epsilon', epsilon);
console.log('🚀 ~ file: part1.ts ~ line 34 ~ gamma * epsilon', gamma * epsilon);
