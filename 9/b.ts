const input = Deno.readTextFileSync("./input.txt").trim();
// const input = Deno.readTextFileSync("./input-sample-b.txt").trim();

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
const posT = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
const visitedSet = new Set<string>(["0-0"]);

moves.forEach((move) => {
  for (let i = 0; i < move[1]; i++) {
    updatePos(posH, move[0]);
    let newPos = [...posH];

    let moved = false;
    let j = 0;
    do {
      moved = isSeparated(newPos, posT[j]);
      if (moved) {
        const dir = normalizedMove(newPos, posT[j]);
        updatePos(posT[j], dir);
        if (j === posT.length - 1) {
          visitedSet.add(posT[j].join("-"));
          break;
        }
      }
      newPos = posT[j];
      j++;
    } while (moved);
    // moveRest(posT, prevPos, posH);
  }
  // drawRope([posH, ...posT]);
});

console.log(visitedSet.size);

function drawRope(arr: number[][]) {
  const xy = arr.map(([x, y], i) => ({
    i,
    x,
    y,
  }));
  const minX = Math.min(...arr.map((v) => v[0]));
  const minY = Math.min(...arr.map((v) => v[1]));
  const maxX = Math.max(...arr.map((v) => v[0]));
  const maxY = Math.max(...arr.map((v) => v[1]));

  const map = [];
  for (let i = maxY; i >= minY; i--) {
    const row = [];
    for (let j = minX; j <= maxX; j++) {
      const el = xy.find((v) => v.x === j && v.y === i);
      el ? row.push(el.i) : row.push(".");
    }
    map.push(row.join(""));
  }
  console.log(map.join(`\n`));
  console.log("---");
}

// function _moveRest(rest: number[][], prevPos: number[], newPos: number[]) {
//   // console.log(rest);
//   if (rest.length === 0 || !isSeparated(rest[0], newPos)) {
//     return;
//   } else {
//     const restPrevPos = [...rest[0]];
//     rest[0][0] = prevPos[0];
//     rest[0][1] = prevPos[1];
//     if (rest.length === 1) {
//       visitedSet.add(posT[8].join("-"));
//       console.log(posT[8]);
//     } else {
//       moveRest(rest.slice(1), restPrevPos, prevPos);
//     }
//   }
// }

function updatePos(pos: number[], dir: number[]) {
  pos[0] += dir[0];
  pos[1] += dir[1];
}

function isSeparated(a: number[], b: number[]) {
  return Math.abs(a[0] - b[0]) > 1 || Math.abs(a[1] - b[1]) > 1;
}

function normalizedMove(a: number[], b: number[]) {
  const x = a[0] - b[0];
  const y = a[1] - b[1];
  return [x !== 0 ? x / Math.abs(x) : 0, y !== 0 ? y / Math.abs(y) : 0];
}
