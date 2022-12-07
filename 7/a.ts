const input = Deno.readTextFileSync("./input.txt").trim();

// const data = input
//   .split("\r\n")
//   .filter((row) => !row.startsWith("$ cd"))
//   .join("\n")
//   .split("$ ls")
//   .map((row) =>
//     row
//       .trim()
//       .split("\n")
//       .filter((entry) => !entry.startsWith("dir") && entry !== "")
//       .map((fileEntry) => parseInt(fileEntry))
//       .reduce((prev, curr) => prev + curr, 0)
//   )
//   .filter((dirSize) => dirSize <= 100000 && dirSize > 0)
//   .reduce((prev, curr) => prev + curr, 0);

// const data = input
//   .split("ls")
//   .map((dir) =>
//     dir
//       .split(/\s/gi)
//       .filter((v) => /\d+/gi.test(v))
//       .map((v) => parseInt(v))
//   )
//   .filter((v) => v.length > 0)
//   .map((r) => r.reduce((p, c) => p + c, 0))
//   .filter((v) => v <= 100000)
//   .reduce((p, v) => p + v, 0);

const entries: any = {};

const dirStack: string[] = [];

input.split("\r\n").forEach((row) => {
  if (row.startsWith("$ cd ..")) {
    dirStack.pop();
  } else if (row.startsWith("$ cd ")) {
    dirStack.push(row.slice(5));
    const currPath = dirStack.join("-");
    const parentPath = dirStack.slice(0, -1).join("-");
    entries[currPath] = {
      path: currPath,
      size: 0,
      parent: entries[parentPath],
    };
  } else if (/^(\d+)/gi.test(row)) {
    const currPath = dirStack.join("-");
    const parentPath = dirStack.slice(0, -1).join("-");
    entries[currPath] = {
      path: currPath,
      size: (entries[currPath]?.size ?? 0) + parseInt(row),
      parent: entries[parentPath],
    };
    let stack = [...dirStack];
    while (stack.length > 1) {
      stack = stack.splice(0, stack.length - 1);
      const tempParent = stack.join("-");
      entries[tempParent].size += parseInt(row);
    }
  }
});
console.log(
  Object.values(entries)
    .filter((dir: any) => dir.size <= 100000)
    .reduce((p, c: any) => p + c.size, 0)
);
