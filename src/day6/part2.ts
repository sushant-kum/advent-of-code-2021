import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./src/day6/data/input.json', 'utf8'));
const daysToReproduce: number[] = input.days_to_reproduce;
const reproductionCycleDays = 6;
const firstCycleDelay = 2;
const newFishDaysToReproduce: number = firstCycleDelay + reproductionCycleDays;
const numOfDays = 256;

let daysToReproduceToNumFishesMappings: number[] = new Array(newFishDaysToReproduce + 1).fill(0);

daysToReproduce.forEach((days: number) => {
  daysToReproduceToNumFishesMappings[days]++;
});

function progressDay(): void {
  let newFishesBorn = 0;

  daysToReproduceToNumFishesMappings = daysToReproduceToNumFishesMappings.map(
    (daysToReproduceToNumFishesMapping: number, age: number) => {
      if (age === 0) {
        newFishesBorn += daysToReproduceToNumFishesMapping;
      }

      if (age === newFishDaysToReproduce) {
        return 0;
      }

      return daysToReproduceToNumFishesMappings[age + 1];
    }
  );

  daysToReproduceToNumFishesMappings[reproductionCycleDays] += newFishesBorn;
  daysToReproduceToNumFishesMappings[newFishDaysToReproduce] = newFishesBorn;
}

for (let day = 1; day <= numOfDays; day++) {
  progressDay();
}

let numOfFishes = 0;

daysToReproduceToNumFishesMappings.forEach((daysToReproduceToNumFishesMapping: number) => {
  numOfFishes += daysToReproduceToNumFishesMapping;
});
console.log('🚀 ~ file: index.ts ~ line 51 ~ numOfFishes', numOfFishes);
