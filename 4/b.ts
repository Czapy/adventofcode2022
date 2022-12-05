const input = Deno.readTextFileSync("./input.txt").trim();

const data = input
  .split("\r\n")
  .map((row) =>
    row.split(",").map((col) => col.split("-").map((n) => Number.parseInt(n)))
  )
  .filter(([[a0, a1], [b0, b1]]) => {
    return (
      (a0 <= b0 && a1 >= b1) ||
      (a0 >= b0 && a1 <= b1) ||
      (a0 <= b0 && a1 >= b0) ||
      (a0 <= b1 && a1 >= b1)
    );
  }).length;

console.log(data);
