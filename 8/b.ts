const input = Deno.readTextFileSync("./input.txt").trim();
// const input = Deno.readTextFileSync("./input-sample.txt").trim();

const data = input
  .split("\r\n")
  .map((row) => row.split("").map((cell) => parseInt(cell)));

const visibilityMatrix = new Array(data.length)
  .fill(0)
  .map((_) => new Array(data[0].length).fill(1));

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[0].length; j++) {
    const tree = data[i][j];
    let visible = 1;
    for (let k = j - 1; k >= 0; k--) {
      if (data[i][k] < tree && k !== 0) {
        visible++;
      } else {
        visibilityMatrix[i][j] = visibilityMatrix[i][j] * visible;
        break;
      }
    }
    visible = 1;
    for (let k = j + 1; k < data[0].length; k++) {
      if (data[i][k] < tree && k !== data[0].length - 1) {
        visible++;
      } else {
        visibilityMatrix[i][j] = visibilityMatrix[i][j] * visible;
        break;
      }
    }
    visible = 1;
    for (let k = i - 1; k >= 0; k--) {
      if (data[k][j] < tree && k !== 0) {
        visible++;
      } else {
        visibilityMatrix[i][j] = visibilityMatrix[i][j] * visible;
        break;
      }
    }
    visible = 1;
    for (let k = i + 1; k < data.length; k++) {
      if (data[k][j] < tree && k !== data.length - 1) {
        visible++;
      } else {
        visibilityMatrix[i][j] = visibilityMatrix[i][j] * visible;
        break;
      }
    }
  }
}

console.log(Math.max(...visibilityMatrix.flatMap((a) => a)));
