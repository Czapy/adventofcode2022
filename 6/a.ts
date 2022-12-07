const input = Deno.readTextFileSync("./input.txt").trim();

const data = input.split("");

let answer = 4;
while (data.length) {
  if (new Set(data.slice(answer - 4, answer)).size === 4) {
    console.log(answer);
    break;
  }
  answer++;
}
