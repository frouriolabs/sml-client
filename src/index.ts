import { readLines } from "std/io/mod.ts";
import { sleep } from "sleep";

console.log("Welcome to Deno!");

const p = Deno.run({
  cmd: ["echo", "hello"],
  stdout: "piped",
  stderr: "piped",
});

const { code } = await p.status();

if (code === 0) {
  const rawOutput = await p.output();
  await Deno.stdout.write(rawOutput);
} else {
  const rawError = await p.stderrOutput();
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

for await (const _ of readLines(Deno.stdin)) {
  console.log(_);
  await sleep(3);
  break;
}
