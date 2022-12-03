const input = Deno.readTextFileSync("./input.txt");

const data = input
  .split("\r\n")
  .map((row) =>
    row
      .split("")
      .map((char) => char.charCodeAt(0))
      .map((code) => (code < 97 ? code - 65 + 27 : code - 96))
  )
  .map((row) => new Set(row));

let sum = 0;
for (let i = 0; i < data.length; i += 3) {
  sum += [...data[i]].filter(
    (v) => new Set(data[i + 1]).has(v) && new Set(data[i + 2]).has(v)
  )[0];
}

console.log(sum);
