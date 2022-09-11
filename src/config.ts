import { parse } from "std/flags/mod.ts";

const parsed = parse(Deno.args);

if (!parsed.hfToken) {
  throw new Error("Specify the Token of Hugging Face as --hfToken option.");
}

export const config = {
  port: { python: 18080 },
  token: { hf: parsed.hfToken },
};
