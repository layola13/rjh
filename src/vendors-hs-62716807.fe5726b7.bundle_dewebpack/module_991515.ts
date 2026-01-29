const isBrowser = (): boolean => {
  const isES5 = false;
  const isNode = false;
  
  return (
    !isES5 &&
    !isNode &&
    typeof window === "object" &&
    typeof document === "object"
  );
};

export default isBrowser();