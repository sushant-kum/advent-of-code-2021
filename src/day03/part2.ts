import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./src/day03/data/input.json', 'utf8'));
const diagnostics: string[] = input.diagnostics;
const diagnosticReportLength: number = diagnostics[0].length;

let oxygenGenRatingPossibleValues: string[] = [...diagnostics];
let co2ScrubberRatingPossibleValues: string[] = [...diagnostics];

for (let bit = 0; oxygenGenRatingPossibleValues.length > 1; bit++) {
  let oxygenGenRatingGamma = '';

  for (let i = 0; i < diagnosticReportLength; i++) {
    let countZero = 0;
    let countOne = 0;

    oxygenGenRatingPossibleValues.forEach((diagnostic) => {
      if (diagnostic[i] === '0') {
        countZero++;
      } else {
        countOne++;
      }
    });

    oxygenGenRatingGamma += countZero > countOne ? '0' : '1';
  }

  oxygenGenRatingPossibleValues = oxygenGenRatingPossibleValues.filter(
    (diagnostic) => diagnostic[bit] === oxygenGenRatingGamma[bit]
  );
}

for (let bit = 0; co2ScrubberRatingPossibleValues.length > 1; bit++) {
  let co2ScrubberRatingEpsilon = '';

  for (let i = 0; i < diagnosticReportLength; i++) {
    let countZero = 0;
    let countOne = 0;

    co2ScrubberRatingPossibleValues.forEach((diagnostic) => {
      if (diagnostic[i] === '0') {
        countZero++;
      } else {
        countOne++;
      }
    });

    co2ScrubberRatingEpsilon += countZero <= countOne ? '0' : '1';
  }

  co2ScrubberRatingPossibleValues = co2ScrubberRatingPossibleValues.filter(
    (diagnostic) => diagnostic[bit] === co2ScrubberRatingEpsilon[bit]
  );
}

console.log('🚀 ~ file: index.ts ~ line 56 ~ oxygenGenRatingPossibleValues', oxygenGenRatingPossibleValues);
console.log('🚀 ~ file: index.ts ~ line 57 ~ co2ScrubberRatingPossibleValues', co2ScrubberRatingPossibleValues);

const oxygenGenRating: number = parseInt(oxygenGenRatingPossibleValues[0], 2);
const co2ScrubberRating: number = parseInt(co2ScrubberRatingPossibleValues[0], 2);

console.log('🚀 ~ file: part2.ts ~ line 62 ~ oxygenGenRating', oxygenGenRating);
console.log('🚀 ~ file: part2.ts ~ line 63 ~ co2ScrubberRating', co2ScrubberRating);
console.log('🚀 ~ file: part2.ts ~ line 64 ~ oxygenGenRating * co2ScrubberRating', oxygenGenRating * co2ScrubberRating);
