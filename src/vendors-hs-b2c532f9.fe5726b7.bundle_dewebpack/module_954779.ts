const RFC1738 = "RFC1738";
const RFC3986 = "RFC3986";

const formatters = {
  RFC1738: (value: string): string => {
    return value.replace(/%20/g, "+");
  },
  RFC3986: (value: string): string => {
    return String(value);
  }
};

export default RFC3986;

export { formatters, RFC1738, RFC3986 };