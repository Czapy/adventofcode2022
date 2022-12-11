const input = Deno.readTextFileSync("./input.txt").trim();

let cyclesToSum = [20, 60, 100, 140, 180, 220];
let sum = 0;
const data = input.split("\r\n").reduce(
  ({ cycle, register }, row) => {
    cycle++;
    if (cyclesToSum.some((c) => c === cycle)) {
      sum += cycle * register;
    }
    if (row.startsWith("noop")) {
      return {
        register,
        cycle,
      };
    }
    cycle++;
    if (cyclesToSum.some((c) => c === cycle)) {
      sum += cycle * register;
    }

    const add = parseInt(row.split(" ")[1]);
    return {
      cycle,
      register: register + add,
    };
  },
  {
    cycle: 0,
    register: 1,
  }
);

console.log(data, sum);
