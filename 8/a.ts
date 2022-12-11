const input = Deno.readTextFileSync("./input.txt").trim();
// const input = Deno.readTextFileSync("./input-sample.txt").trim();

const data = input
  .split("\r\n")
  .map((row) => row.split("").map((cell) => parseInt(cell)));

const visibilityMatrix = new Array(data.length)
  .fill(0)
  .map((_) => new Array(data[0].length).fill(0));

const visibilityMap: any = {};

for (let i = 0; i < data.length; i++) {
  let peak = -1;
  for (let j = 0; j < data[0].length; j++) {
    const tree = data[i][j];
    if (tree > peak) {
      visibilityMatrix[i][j] = 1;
      visibilityMap[i + "-" + j] = 1;
      peak = tree;
    }
  }
}
for (let i = 0; i < data.length; i++) {
  let peak = -1;
  for (let j = data[0].length - 1; j >= 0; j--) {
    const tree = data[i][j];
    if (tree > peak) {
      visibilityMatrix[i][j] = 1;
      visibilityMap[i + "-" + j] = 1;
      peak = tree;
    }
  }
}
for (let i = 0; i < data.length; i++) {
  let peak = -1;
  for (let j = 0; j < data[0].length; j++) {
    const tree = data[j][i];
    if (tree > peak) {
      visibilityMatrix[j][i] = 1;
      visibilityMap[j + "-" + i] = 1;
      peak = tree;
    }
  }
}
for (let i = 0; i < data.length; i++) {
  let peak = -1;
  for (let j = data[0].length - 1; j >= 0; j--) {
    const tree = data[j][i];
    if (tree > peak) {
      visibilityMatrix[j][i] = 1;
      visibilityMap[j + "-" + i] = 1;
      peak = tree;
    }
  }
}

console.log(visibilityMatrix);

console.log(Object.keys(visibilityMap).length);
