export const isDenoEnvironment = (): boolean => {
  return typeof Deno === "object" && 
         Deno !== null && 
         typeof Deno.version === "object";
};

export default isDenoEnvironment();