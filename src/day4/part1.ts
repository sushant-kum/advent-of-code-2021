import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./src/day4/data/input.json', 'utf8'));
const draws: number[] = input.draws;
const boards: number[][][] = input.boards;
const boardSize = 5;

const emptyMarkedBoardRow: boolean[] = new Array(boardSize).fill(false);
const emptyMarkedBoard: boolean[][] = new Array(boardSize).fill([...emptyMarkedBoardRow]);
const markedBoards: boolean[][][] = JSON.parse(
  JSON.stringify(new Array(boards.length).fill(JSON.parse(JSON.stringify(emptyMarkedBoard))))
);

let lastDraw = 0;
let winnerBoardIndex = -1;
let winnerBoard: number[][] | undefined = undefined;

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

    if (boardWon(boardIndex)) {
      lastDraw = draw;
      winnerBoardIndex = boardIndex;
      winnerBoard = JSON.parse(JSON.stringify(boards[boardIndex]));
      break;
    }
  }

  if (winnerBoard !== undefined) {
    break;
  }
}

console.log('🚀 ~ file: index.ts ~ line 100 ~ lastDraw', lastDraw);
console.log('🚀 ~ file: part1.ts ~ line 101 ~ winnerBoardIndex', winnerBoardIndex);
console.log('🚀 ~ file: index.ts ~ line 102 ~ winnerBoard', winnerBoard);

const winnerScore: number = boardScore(winnerBoard as number[][], winnerBoardIndex as number);

console.log('🚀 ~ file: part1.ts ~ line 106 ~ winnerScore', winnerScore);
console.log('🚀 ~ file: index.ts ~ line 107 ~ winnerScore * lastDraw', winnerScore * lastDraw);
