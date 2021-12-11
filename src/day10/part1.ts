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

const bracketErrorScores: Map<BracketType, number> = new Map<BracketType, number>([
  ['CIRCLE', 3],
  ['SQUARE', 57],
  ['FLOWER', 1197],
  ['ANGLE', 25137],
]);

const input = JSON.parse(fs.readFileSync('./src/day10/data/input.json', 'utf8'));
const codeLines: string[] = input.code_lines;

let errorScore = 0;

codeLines.forEach((codeLine: string) => {
  const brackets: Bracket[] = codeLine.split('') as Bracket[];
  const stack: BracketData[] = [];

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
          errorScore += bracketErrorScores.get(bracketData.type) ?? 0;
          break;
        }
      }
    }
  }
});

console.log('🚀 ~ file: index.ts ~ line 60 ~ codeLines.forEach ~ errorScore', errorScore);
