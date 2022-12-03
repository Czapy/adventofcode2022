const input = Deno.readTextFileSync("./input.txt");

const data = input.split("\r\n\r\n").map((row) =>
  row
    .split("\r\n")
    .map((v) => Number.parseInt(v))
    .filter((v) => isFinite(v))
);

const answer = data
  .map((elf) => elf.reduce((prev, curr) => prev + curr))
  .sort((a, b) => b - a);

console.log(answer);
console.log(answer[0] + answer[1] + answer[2]);
