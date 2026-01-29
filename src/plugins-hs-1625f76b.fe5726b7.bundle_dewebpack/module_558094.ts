interface ColorScheme {
  color: string;
  lightColor: string;
  fillColor: string;
}

interface ColorThemes {
  Template: ColorScheme;
  Normal: ColorScheme;
  NormalHover: ColorScheme;
  Replace: ColorScheme;
}

const colorThemes: Readonly<ColorThemes> = {
  Template: {
    color: "#ffffff",
    lightColor: "#327DFF",
    fillColor: "#327DFF"
  },
  Normal: {
    color: "#67F6FD",
    lightColor: "#67F6FD",
    fillColor: "#ffffff"
  },
  NormalHover: {
    color: "#67F6FD",
    lightColor: "#67F6FD",
    fillColor: "#FFE6B9"
  },
  Replace: {
    color: "#67F6FD",
    lightColor: "#67F6FD",
    fillColor: "#FFA023"
  }
};

Object.freeze(colorThemes);

export default colorThemes;