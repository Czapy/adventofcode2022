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

const decryptMap: { [key: string]: { [key: string]: string } } = {
  X: {
    [Shape.ROCK]: Shape.SCISSORS,
    [Shape.PAPER]: Shape.ROCK,
    [Shape.SCISSORS]: Shape.PAPER,
  },
  Y: {
    [Shape.ROCK]: Shape.ROCK,
    [Shape.PAPER]: Shape.PAPER,
    [Shape.SCISSORS]: Shape.SCISSORS,
  },
  Z: {
    [Shape.ROCK]: Shape.PAPER,
    [Shape.PAPER]: Shape.SCISSORS,
    [Shape.SCISSORS]: Shape.ROCK,
  },
};

const data = input
  .split("\r\n")
  .map((row) => row.split(" "))
  .map(([opp, me]) => opponentMap[opp] + decryptMap[me][opponentMap[opp]])
  .map((key) => scoreMap[key])
  .reduce((prev, curr) => prev + curr);

console.log(data);
