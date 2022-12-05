const input = Deno.readTextFileSync("./input.txt").trim();

/*
 *     [S] [C]         [Z]
 * [F] [J] [P]         [T]     [N]
 * [G] [H] [G] [Q]     [G]     [D]
 * [V] [V] [D] [G] [F] [D]     [V]
 * [R] [B] [F] [N] [N] [Q] [L] [S]
 * [J] [M] [M] [P] [H] [V] [B] [B] [D]
 * [L] [P] [H] [D] [L] [F] [D] [J] [L]
 * [D] [T] [V] [M] [J] [N] [F] [M] [G]
 *  1   2   3   4   5   6   7   8   9
 */

const stacks = [
  ["F", "G", "V", "R", "J", "L", "D"],
  ["S", "J", "H", "V", "B", "M", "P", "T"],
  ["C", "P", "G", "D", "F", "M", "H", "V"],
  ["Q", "G", "N", "P", "D", "M"],
  ["F", "N", "H", "L", "J"],
  ["Z", "T", "G", "D", "Q", "V", "F", "N"],
  ["L", "B", "D", "F"],
  ["N", "D", "V", "S", "B", "J", "M"],
  ["D", "L", "G"],
];

const move = (count: number, from: string[], to: string[]) => {
  const elements = from.splice(0, count);
  elements.forEach((el) => to.unshift(el));
};

const data: [number, string[], string[]][] = input.split("\r\n").map((row) => {
  const a = row.split("move ")[1].split(/( from | to )/gi);
  return [
    parseInt(a[0]),
    stacks[parseInt(a[2]) - 1],
    stacks[parseInt(a[4]) - 1],
  ];
});

data.forEach((m) => move(...m));

console.log(stacks.map((row) => row[0]).join(""));
