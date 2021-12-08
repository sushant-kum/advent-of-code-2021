import fs from 'fs';

/*******************
  Signal Positions
        0000
       1    2
       1    2
        3333
       4    5
       4    5
        6666
*******************/

interface Display {
  patterns: string[];
  outputs: string[];
}

const input = JSON.parse(fs.readFileSync('./src/day8/data/input.json', 'utf8'));
const displays: Display[] = input.displays;

let sum = 0;

for (let i = 0; i < displays.length; i++) {
  const display: Display = displays[i];
  const possibleSignalsMappings: string[][] = new Array(7).fill([]);
  const sortedPatterns: string[] = display.patterns.sort((a, b) =>
    a.length === b.length ? 0 : a.length < b.length ? -1 : 1
  );
  const easyPatterns: string[] = sortedPatterns.filter(
    (pattern) => pattern.length === 2 || pattern.length === 3 || pattern.length === 4 || pattern.length === 7
  );
  const hardPatterns: string[] = sortedPatterns.filter((pattern) => !easyPatterns.includes(pattern));
  const signalsFor: string[][] = new Array(10).fill(undefined);

  display.patterns = easyPatterns.concat(hardPatterns);

  easyPatterns.forEach((pattern: string) => {
    const signals: string[] = pattern.split('');

    switch (signals.length) {
      case 2:
        signalsFor[1] = [...signals];
        possibleSignalsMappings[2] = [...signals];
        possibleSignalsMappings[5] = [...signals];
        break;

      case 3:
        signalsFor[7] = [...signals];
        possibleSignalsMappings[0] = signals.filter(
          (signal) => !possibleSignalsMappings[2].includes(signal) && !possibleSignalsMappings[5].includes(signal)
        );
        break;

      case 4:
        signalsFor[4] = [...signals];
        possibleSignalsMappings[1] = signals.filter(
          (signal) => !possibleSignalsMappings[2].includes(signal) && !possibleSignalsMappings[5].includes(signal)
        );
        possibleSignalsMappings[3] = signals.filter(
          (signal) => !possibleSignalsMappings[2].includes(signal) && !possibleSignalsMappings[5].includes(signal)
        );
        break;

      case 7:
        signalsFor[8] = [...signals];
        possibleSignalsMappings[4] = signals.filter(
          (signal) =>
            !possibleSignalsMappings[0].includes(signal) &&
            !possibleSignalsMappings[1].includes(signal) &&
            !possibleSignalsMappings[2].includes(signal) &&
            !possibleSignalsMappings[3].includes(signal) &&
            !possibleSignalsMappings[5].includes(signal)
        );
        possibleSignalsMappings[6] = signals.filter(
          (signal) =>
            !possibleSignalsMappings[0].includes(signal) &&
            !possibleSignalsMappings[1].includes(signal) &&
            !possibleSignalsMappings[2].includes(signal) &&
            !possibleSignalsMappings[3].includes(signal) &&
            !possibleSignalsMappings[5].includes(signal)
        );
        break;

      default:
        break;
    }
  });

  hardPatterns.forEach((pattern: string) => {
    const signals: string[] = pattern.split('');

    switch (signals.length) {
      case 5:
        if (signals.includes(possibleSignalsMappings[2][0]) && signals.includes(possibleSignalsMappings[2][1])) {
          signalsFor[3] = [...signals];
        } else {
          if (
            (signals.includes(possibleSignalsMappings[1][0]) && !signals.includes(possibleSignalsMappings[1][1])) ||
            (signals.includes(possibleSignalsMappings[1][1]) && !signals.includes(possibleSignalsMappings[1][0]))
          ) {
            signalsFor[2] = [...signals];
          }
          if (
            (signals.includes(possibleSignalsMappings[4][0]) && !signals.includes(possibleSignalsMappings[4][1])) ||
            (signals.includes(possibleSignalsMappings[4][1]) && !signals.includes(possibleSignalsMappings[4][0]))
          ) {
            signalsFor[5] = [...signals];
          }
        }
        break;

      case 6:
        if (
          (signals.includes(possibleSignalsMappings[1][0]) && !signals.includes(possibleSignalsMappings[1][1])) ||
          (signals.includes(possibleSignalsMappings[1][1]) && !signals.includes(possibleSignalsMappings[1][0]))
        ) {
          signalsFor[0] = [...signals];
        }
        if (
          (signals.includes(possibleSignalsMappings[2][0]) && !signals.includes(possibleSignalsMappings[2][1])) ||
          (signals.includes(possibleSignalsMappings[2][1]) && !signals.includes(possibleSignalsMappings[2][0]))
        ) {
          signalsFor[6] = [...signals];
        }
        if (
          (signals.includes(possibleSignalsMappings[4][0]) && !signals.includes(possibleSignalsMappings[4][1])) ||
          (signals.includes(possibleSignalsMappings[4][1]) && !signals.includes(possibleSignalsMappings[4][0]))
        ) {
          signalsFor[9] = [...signals];
        }
        break;

      default:
        break;
    }
  });

  const sortedSignalsForAsStrings: string[] = signalsFor.map((signals) =>
    signals.sort((a, b) => (a < b ? -1 : 1)).join('')
  );

  let outputNum = 0;

  display.outputs.forEach((output: string) => {
    const signals: string[] = output.split('');
    const sortedOutput: string = signals.sort((a, b) => (a < b ? -1 : 1)).join('');

    outputNum =
      outputNum * 10 +
      sortedSignalsForAsStrings
        .map((signalsAsString: string, index: number) => (signalsAsString === sortedOutput ? index : -1))
        .filter((num) => num !== -1)[0];
  });

  sum += outputNum;
}

console.log('🚀 ~ file: index.ts ~ line 137 ~ sum', sum);
