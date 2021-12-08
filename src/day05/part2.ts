import fs from 'fs';

interface Point {
  x: number;
  y: number;
}

interface Line {
  from: Point;
  to: Point;
}

const input = JSON.parse(fs.readFileSync('./src/day05/data/input.json', 'utf8'));
const ventLines: Line[] = input.vent_lines;
const endCoordinate: Point = {
  x: Math.max(...ventLines.map((ventLine: Line) => Math.max(ventLine.from.x, ventLine.to.x))),
  y: Math.max(...ventLines.map((ventLine: Line) => Math.max(ventLine.from.y, ventLine.to.y))),
};

const ventLayout: number[][] = JSON.parse(
  JSON.stringify(new Array(endCoordinate.y + 1).fill(new Array(endCoordinate.x + 1).fill(0)))
);

function getPointsOnLine(line: Line): Point[] {
  const points: Point[] = [];

  const directionX: number = line.from.x === line.to.x ? 0 : line.from.x < line.to.x ? 1 : -1;
  const directionY: number = line.from.y === line.to.y ? 0 : line.from.y < line.to.y ? 1 : -1;
  const numOfPoints: number = Math.max(Math.abs(line.to.x - line.from.x), Math.abs(line.to.y - line.from.y)) + 1;

  for (let i = 0; i < numOfPoints; i++) {
    points.push({ x: line.from.x + directionX * i, y: line.from.y + directionY * i });
  }

  return points;
}

ventLines.forEach((ventLine: Line) => {
  const pointsOnLine: Point[] = getPointsOnLine(ventLine);

  pointsOnLine.forEach((pointOnLine: Point) => {
    ventLayout[pointOnLine.y][pointOnLine.x]++;
  });
});

let multiVentPoints = 0;

ventLayout.forEach((ventRow: number[]) => {
  ventRow.forEach((ventPoint: number) => {
    if (ventPoint >= 2) {
      multiVentPoints++;
    }
  });
});
console.log('🚀 ~ file: index.ts ~ line 56 ~ ventLayout.forEach ~ multiVentPoints', multiVentPoints);
