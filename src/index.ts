import { readLines } from "std/io/mod.ts";
// import { copy } from "std/streams/conversion.ts";
import { pythonScript } from "./python.ts";
import { config } from "./config.ts";

await Deno.writeFile("./app.py", new TextEncoder().encode(pythonScript));

// const p = Deno.run({
//   cmd: ["python", "app.py"],
//   stdout: "piped",
//   stderr: "piped",
// });

// const { code } = await p.status();

// if (code === 0) {
//   const rawOutput = await p.output();
//   await Deno.stdout.write(rawOutput);
// } else {
//   const rawError = await p.stderrOutput();
//   const errorString = new TextDecoder().decode(rawError);
//   console.log(errorString);
// }

// copy(p.stdout, Deno.stdout);
// copy(p.stderr, Deno.stderr);

for await (const _ of readLines(Deno.stdin)) {
  const res = await fetch(`http://localhost:${config.port.python}`, {
    method: "POST",
    body: _,
  }).then((b) => b.text()).catch(() => null);

  console.log(res);
}
