const input = Deno.readTextFileSync("./input.txt").trim();
// const input = Deno.readTextFileSync("./input-sample.txt").trim();

const moveMap = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

const moves = input.split("\r\n").map((row) => {
  const [dir, count] = row.split(" ") as ["U" | "D" | "L" | "R", string];

  return [moveMap[dir], parseInt(count)] as [number[], number];
});

const posH = [0, 0];
let posT = [0, 0];
const visitedSet = new Set<string>(["0-0"]);

moves.forEach((move) => {
  for (let i = 0; i < move[1]; i++) {
    const prevPos = [...posH];
    updatePos(posH, move[0]);
    if (isSeparated(posH, posT)) {
      posT = prevPos;
      visitedSet.add(posT.join("-"));
    }
  }
});

console.log(visitedSet.size);

function updatePos(pos: number[], dir: number[]) {
  pos[0] += dir[0];
  pos[1] += dir[1];
}

function isSeparated(a: number[], b: number[]) {
  return Math.abs(a[0] - b[0]) > 1 || Math.abs(a[1] - b[1]) > 1;
}
