import fs from 'fs';

type Axis = 'x' | 'y';

interface Point {
  x: number;
  y: number;
}

interface Fold {
  axis: Axis;
  line: number;
}

const input = JSON.parse(fs.readFileSync('./src/day13/data/input.json', 'utf8'));
const dots: Point[] = input.dots;
const folds: Fold[] = input.folds;
const foldsToConsider = 1;
const maxX: number = Math.max(...dots.map((dot: Point) => dot.x));
const maxY: number = Math.max(...dots.map((dot: Point) => dot.y));

let sheet: boolean[][] = JSON.parse(JSON.stringify(new Array(maxY + 1).fill(new Array(maxX + 1).fill(false))));
let visibleDotsCount = 0;

function foldAlongXLine(currentSheet: boolean[][], line: number): boolean[][] {
  const currentSheetMaxX: number = currentSheet[0].length;
  const currentSheetMaxY: number = currentSheet.length;
  const lineAfterMiddle: boolean = line >= Math.ceil(currentSheetMaxX / 2) - 1;
  const newSheetMaxX: number = lineAfterMiddle ? line : currentSheetMaxX - line;
  const newSheet: boolean[][] = JSON.parse(
    JSON.stringify(new Array(currentSheetMaxY).fill(new Array(newSheetMaxX).fill(false)))
  );

  if (newSheetMaxX === currentSheetMaxX) {
    return JSON.parse(JSON.stringify(currentSheet));
  }

  for (let y = 0; y < currentSheetMaxY; y++) {
    for (let x = 0; x < currentSheetMaxX; x++) {
      if (x < newSheetMaxX) {
        newSheet[y][lineAfterMiddle ? x : newSheetMaxX - line + x] = currentSheet[y][x];
      } else if (x > newSheetMaxX) {
        newSheet[y][lineAfterMiddle ? 2 * newSheetMaxX - x : currentSheetMaxY - x] =
          currentSheet[y][x] || newSheet[y][lineAfterMiddle ? 2 * newSheetMaxX - x : currentSheetMaxY - x];
      }
    }
  }

  return newSheet;
}

function foldAlongYLine(currentSheet: boolean[][], line: number): boolean[][] {
  const currentSheetMaxX: number = currentSheet[0].length;
  const currentSheetMaxY: number = currentSheet.length;
  const lineBelowMiddle: boolean = line >= Math.ceil(currentSheetMaxY / 2) - 1;
  const newSheetMaxY: number = lineBelowMiddle ? line : currentSheetMaxY - line;
  const newSheet: boolean[][] = JSON.parse(
    JSON.stringify(new Array(newSheetMaxY).fill(new Array(currentSheetMaxX).fill(false)))
  );

  if (newSheetMaxY === currentSheetMaxY) {
    return JSON.parse(JSON.stringify(currentSheet));
  }

  for (let x = 0; x < currentSheetMaxX; x++) {
    for (let y = 0; y < currentSheetMaxY; y++) {
      if (y < newSheetMaxY) {
        newSheet[lineBelowMiddle ? y : newSheetMaxY - line + y][x] = currentSheet[y][x];
      } else if (y > newSheetMaxY) {
        newSheet[lineBelowMiddle ? 2 * newSheetMaxY - y : currentSheetMaxY - y][x] =
          currentSheet[y][x] || newSheet[lineBelowMiddle ? 2 * newSheetMaxY - y : currentSheetMaxY - y][x];
      }
    }
  }

  return newSheet;
}

function foldSheet(currentSheet: boolean[][], fold: Fold): boolean[][] | undefined {
  switch (fold.axis) {
    case 'x':
      return foldAlongXLine(currentSheet, fold.line);

    case 'y':
      return foldAlongYLine(currentSheet, fold.line);

    default:
      return undefined;
  }
}

function displayableSheet(sheet: boolean[][]): string[] {
  return sheet.map((sheetRow: boolean[]) => sheetRow.map((point: boolean) => (point ? '#' : '.')).join(' '));
}

dots.forEach((dot: Point) => {
  sheet[dot.y][dot.x] = true;
});

for (let foldIndex = 0; foldIndex < folds.length && foldIndex < foldsToConsider; foldIndex++) {
  const fold = folds[foldIndex];
  const newSheet = foldSheet(sheet, fold);

  if (newSheet !== undefined) {
    sheet = newSheet;
  }
}

console.log('🚀 ~ file: index.ts ~ line 109 ~ sheet', displayableSheet(sheet));

sheet.forEach((sheetRow: boolean[]) => {
  sheetRow.forEach((point: boolean) => {
    if (point) {
      visibleDotsCount++;
    }
  });
});

console.log('🚀 ~ file: index.ts ~ line 119 ~ sheetRow.forEach ~ visibleDotsCount', visibleDotsCount);
