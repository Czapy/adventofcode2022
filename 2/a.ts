const input = Deno.readTextFileSync("./input.txt");

enum Shape {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

const scoreMap = {
  [Shape.ROCK + Shape.ROCK]: 4,
  [Shape.ROCK + Shape.PAPER]: 8,
  [Shape.ROCK + Shape.SCISSORS]: 3,
  [Shape.PAPER + Shape.ROCK]: 1,
  [Shape.PAPER + Shape.PAPER]: 5,
  [Shape.PAPER + Shape.SCISSORS]: 9,
  [Shape.SCISSORS + Shape.ROCK]: 7,
  [Shape.SCISSORS + Shape.PAPER]: 2,
  [Shape.SCISSORS + Shape.SCISSORS]: 6,
};

const opponentMap: { [key: string]: string } = {
  A: Shape.ROCK,
  B: Shape.PAPER,
  C: Shape.SCISSORS,
};

const myMap: { [key: string]: string } = {
  X: Shape.ROCK,
  Y: Shape.PAPER,
  Z: Shape.SCISSORS,
};

const data = input
  .split("\r\n")
  .map((row) => row.split(" "))
  .map(([opp, me]) => opponentMap[opp] + myMap[me])
  .map((key) => scoreMap[key])
  .reduce((prev, curr) => prev + curr);

console.log(data);
