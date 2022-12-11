const input = Deno.readTextFileSync("./input.txt").trim();

const cycles: {
  cycle: number;
  register: number;
}[] = []; // flatMap would be nicer
input.split("\r\n").reduce(
  ({ cycle, register }, row) => {
    cycle++;
    cycles.push({
      cycle,
      register,
    });
    if (row.startsWith("noop")) {
      return {
        cycle,
        register,
      };
    }
    cycle++;

    const add = parseInt(row.split(" ")[1]);
    cycles.push({
      cycle,
      register: register + add,
    });
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

// console.log(cycles);

let buffer = "#";
cycles.forEach(({ cycle, register }) => {
  if (cycle % 40 === 0) {
    console.log(buffer);
    buffer = "";
  }
  if (cycle % 40 >= register - 1 && cycle % 40 <= register + 1) {
    buffer += "#";
  } else {
    buffer += ".";
  }
});
