const REGEX_DOT_ALL_FAILURE = (() => {
  try {
    const regex = new RegExp(".", "s");
    return !(regex.dotAll && regex.exec("\n") && regex.flags === "s");
  } catch {
    return true;
  }
})();

export default REGEX_DOT_ALL_FAILURE;