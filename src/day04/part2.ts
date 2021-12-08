import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./src/day04/data/input.json', 'utf8'));
const draws: number[] = input.draws;
const boards: number[][][] = input.boards;
const boardSize = 5;

const emptyMarkedBoardRow: boolean[] = new Array(boardSize).fill(false);
const emptyMarkedBoard: boolean[][] = new Array(boardSize).fill([...emptyMarkedBoardRow]);
const markedBoards: boolean[][][] = JSON.parse(
  JSON.stringify(new Array(boards.length).fill(JSON.parse(JSON.stringify(emptyMarkedBoard))))
);

let lastDraw = 0;
let looserBoardIndex = -1;
const wonBoardIndices: number[] = [];
let looserBoard: number[][] | undefined = undefined;

function numberPositionInBoard(board: number[][], num: number): { rowIndex: number; colIndex: number } | undefined {
  for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
    for (let colIndex = 0; colIndex < boardSize; colIndex++) {
      if (board[rowIndex][colIndex] === num) {
        return { rowIndex, colIndex };
      }
    }
  }

  return undefined;
}

function boardWon(boardIndex: number): boolean {
  for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
    let rowMarked = true;

    for (let colIndex = 0; colIndex < boardSize; colIndex++) {
      if (!markedBoards[boardIndex][rowIndex][colIndex]) {
        rowMarked = false;
        break;
      }
    }

    if (rowMarked) {
      return true;
    }
  }

  for (let colIndex = 0; colIndex < boardSize; colIndex++) {
    let colMarked = true;

    for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
      if (!markedBoards[boardIndex][rowIndex][colIndex]) {
        colMarked = false;
        break;
      }
    }

    if (colMarked) {
      return true;
    }
  }

  return false;
}

function boardScore(board: number[][], boardIndex: number): number {
  let sumUnmarkedNums = 0;

  board.forEach((row: number[], rowIndex) => {
    row.forEach((element: number, colIndex: number) => {
      if (!markedBoards[boardIndex][rowIndex][colIndex]) {
        sumUnmarkedNums += element;
      }
    });
  });

  return sumUnmarkedNums;
}

for (const draw of draws) {
  for (const board of boards) {
    const boardIndex: number = boards.indexOf(board);
    const drawPositionInBoard: { rowIndex: number; colIndex: number } | undefined = numberPositionInBoard(board, draw);

    if (drawPositionInBoard !== undefined) {
      markedBoards[boardIndex][drawPositionInBoard.rowIndex][drawPositionInBoard.colIndex] = true;
    }

    if (boardWon(boardIndex) && !wonBoardIndices.includes(boardIndex)) {
      wonBoardIndices.push(boardIndex);
      lastDraw = draw;

      if (wonBoardIndices.length === boards.length) {
        looserBoardIndex = boardIndex;
        looserBoard = JSON.parse(JSON.stringify(boards[boardIndex]));
        break;
      }
    }
  }

  if (looserBoard !== undefined) {
    break;
  }
}
console.log('🚀 ~ file: index.ts ~ line 104 ~ lastDraw', lastDraw);
console.log('🚀 ~ file: part2.ts ~ line 105 ~ looserBoardIndex', looserBoardIndex);
console.log('🚀 ~ file: index.ts ~ line 106 ~ looserBoard', looserBoard);

const looserScore: number = boardScore(looserBoard as number[][], looserBoardIndex as number);

console.log('🚀 ~ file: index.ts ~ line 110 ~ looserScore', looserScore);
console.log('🚀 ~ file: index.ts ~ line 111 ~ looserScore * lastDraw', looserScore * lastDraw);
