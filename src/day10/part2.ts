import fs from 'fs';

type Bracket = '(' | '[' | '{' | '<' | ')' | ']' | '}' | '>';

type BracketType = 'CIRCLE' | 'SQUARE' | 'FLOWER' | 'ANGLE';

type BracketPosition = 'START' | 'END';

interface BracketData {
  type: BracketType;
  position: BracketPosition;
}

const bracketsMap: Map<Bracket, BracketData> = new Map<Bracket, BracketData>([
  ['(', { type: 'CIRCLE', position: 'START' }],
  ['[', { type: 'SQUARE', position: 'START' }],
  ['{', { type: 'FLOWER', position: 'START' }],
  ['<', { type: 'ANGLE', position: 'START' }],
  [')', { type: 'CIRCLE', position: 'END' }],
  [']', { type: 'SQUARE', position: 'END' }],
  ['}', { type: 'FLOWER', position: 'END' }],
  ['>', { type: 'ANGLE', position: 'END' }],
]);

const bracketCompletionScores: Map<BracketType, number> = new Map<BracketType, number>([
  ['CIRCLE', 1],
  ['SQUARE', 2],
  ['FLOWER', 3],
  ['ANGLE', 4],
]);

const input = JSON.parse(fs.readFileSync('./src/day10/data/input.json', 'utf8'));
const codeLines: string[] = input.code_lines;
const completionScores: number[] = [];

codeLines.forEach((codeLine: string) => {
  const brackets: Bracket[] = codeLine.split('') as Bracket[];
  const stack: BracketData[] = [];

  let corruptedStack = false;

  for (let i = 0; i < brackets.length; i++) {
    const bracket: Bracket = brackets[i];
    const bracketData: BracketData | undefined = bracketsMap.get(bracket);

    if (bracketData !== undefined) {
      if (bracketData.position === 'START') {
        stack.push(bracketData);
      } else {
        if (bracketData.type === stack[stack.length - 1].type) {
          stack.pop();
        } else {
          corruptedStack = true;
          break;
        }
      }
    }
  }

  if (!corruptedStack) {
    let completionScore = 0;

    stack.reverse();
    stack.forEach((bracketData: BracketData) => {
      completionScore = completionScore * 5 + (bracketCompletionScores.get(bracketData.type) ?? 0);
    });

    completionScores.push(completionScore);
  }
});

completionScores.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1));

console.log(
  '🚀 ~ file: index.ts ~ line 74 ~ completionScores[Math.floor(completionScores.length / 2)',
  completionScores[Math.floor(completionScores.length / 2)]
);
