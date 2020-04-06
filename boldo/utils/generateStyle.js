const styleDictionary = {
  x: {
    cssname: "left",
    csssufix: "px",
    cssprefix: "",
  },
  y: {
    cssname: "top",
    csssufix: "px",
    cssprefix: "",
  },
  width: {
    cssname: "width",
    csssufix: "px",
    cssprefix: "",
  },
  height: {
    cssname: "height",
    csssufix: "px",
    cssprefix: "",
  },
  fontSize: {
    cssname: "font-size",
    csssufix: "px",
    cssprefix: "",
  },
  fontFamily: {
    cssname: "font-family",
    csssufix: "",
    cssprefix: "",
  },
  backgroundColor: {
    cssname: "background-color",
    csssufix: "",
    cssprefix: "",
  },
  color: {
    cssname: "color",
    csssufix: "",
    cssprefix: "",
  },
  letterSpacing: {
    cssname: "letter-spacing",
    csssufix: "",
    cssprefix: "",
  },
  lineHeight: {
    cssname: "line-height",
    csssufix: "px",
    cssprefix: "",
  },
};

export function generateStyle(props) {
  let style = "";

  for (let prop in props) {
    let p = styleDictionary[prop];
    if (p != undefined) {
      style += `${p.cssprefix}${p.cssname}:${props[prop]}${p.csssufix};`;
    }
  }

  return style;
}
