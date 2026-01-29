type DenoNamespace = {
  version: object;
  [key: string]: unknown;
};

declare const Deno: DenoNamespace | undefined;

function getType(value: unknown): string {
  return typeof value;
}

const isDenoEnvironment: boolean =
  getType(typeof Deno === "undefined" ? undefined : Deno) === "object" &&
  typeof Deno !== "undefined" &&
  Deno !== null &&
  getType(Deno.version) === "object";

export default isDenoEnvironment;