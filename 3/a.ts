const input = Deno.readTextFileSync("./input.txt");

const data = input
  .split("\r\n")
  .map((row) =>
    row
      .split("")
      .map((char) => char.charCodeAt(0))
      .map((code) => (code < 97 ? code - 65 + 27 : code - 96))
  )
  .map((row) => [
    new Set(row.slice(0, row.length / 2)),
    new Set(row.slice(row.length / 2, row.length)),
  ])
  .map((row) => [...row[0]].filter((v) => row[1].has(v))[0])
  .reduce((prev, curr) => prev + curr);

console.log(data);
