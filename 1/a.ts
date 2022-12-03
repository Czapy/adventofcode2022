const input = Deno.readTextFileSync("./input.txt");

const data = input.split("\r\n\r\n").map((row) =>
  row
    .split("\r\n")
    .map((v) => Number.parseInt(v))
    .filter((v) => isFinite(v))
);

const answer = Math.max(
  ...data.map((elf) => elf.reduce((prev, curr) => prev + curr))
);

console.log(answer);
