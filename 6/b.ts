const input = Deno.readTextFileSync("./input.txt").trim();

const data = input.split("");

let answer = 14;
while (data.length) {
  if (new Set(data.slice(answer - 14, answer)).size === 14) {
    console.log(answer);
    break;
  }
  answer++;
}
