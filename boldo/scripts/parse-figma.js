const renderTemplate = require("./lib/renderTemplates.js");
const path = require("path");

let parsedTree = [];
let oldDepth = 0;

function parseFigma(data) {
  parsedTree = [];
  oldDepth = 0;

  const page = data.document.children[0];
  const nodes = page.children;

  walker(nodes, 1, null);

  // Files
  parsedTree.forEach((el) => {
    let dirpath = path.join(__dirname, "../../project/_fromFigma");
    let fileName = `${el.fileName}.svelte`;
    renderTemplate(dirpath, fileName, el, "component.template");
  });

  // Wrapper
  const wrapperContent = generateWrapper(parsedTree);
  let dirpath = path.join(__dirname, "../../project/");
  let fileName = "_Wrapper.svelte";
  renderTemplate(dirpath, fileName, wrapperContent, "wrapper.template");
}

/* -----------------------------------
  WALKER
  ----------------------------------- */
const walker = (obj, depth, file) => {
  for (let k in obj) {
    // Validation before walk
    if (
      !obj[k] &&
      typeof obj[k] !== "object" &&
      !obj[k].hasOwnProperty("id") &&
      isIgnored(obj[k])
    )
      continue;

    // ## ENTER
    // if (depth > oldDepth || parent == null) {
    //   console.log("PRE", depth);
    // }

    //console.log("Parsing:", `| ${depth} |`, obj[k].name);
    const parsedContent = parseNode(obj[k]);

    if (file == null) {
      parsedTree.push({
        fileName: `${obj[k].name.replace(/[^\w]/gi, "")}`,
        content: parsedContent[0],
        imports: [],
        exports: [parsedContent[3]],
      });
    } else {
      file.content += parsedContent[0];
      file.exports.push(parsedContent[3]);
    }

    let newFile = parsedTree[parsedTree.length - 1];

    // Store depth
    oldDepth = depth;

    // Recursive
    if (obj[k].hasOwnProperty("children")) {
      d = depth + 1;
      walker(obj[k].children, d, newFile);
    } else {
      file.content += "</Layer>";
    }

    // ## LEAVE
    if (depth < oldDepth) {
      //console.log("POS", depth);
      //if (depth == 1) console.log(" ");
      newFile.content += "</Layer>";
    }
  }
};

/* -----------------------------------
  External Methods
  ----------------------------------- */

const isIgnored = (node) => {
  return node.name.includes("*") || node.type == "COMPONENT";
};

const parseNode = (node) => {
  const { x, y, width, height } = node.absoluteBoundingBox;
  const varname = getGlobalName(node.name);

  const { typeProps, text } = parseTypeText(node);
  const background = parseFill(node);

  return [
    `<Layer bind:this={${varname}} x={${x}} y={${y}} width={${width}} height={${height}}${typeProps}${background}>`,
    "",
    "</Layer>",
    varname,
  ];
};

const parseFill = (node) => {
  let prop = "backgroundColor";
  if (node.fills.length <= 0) return "";
  if (node.type == "TEXT") prop = "color";

  let { r, g, b, a } = node.fills[0].color;
  return ` ${prop}={"#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}"}`;
};

const rgbToHex = (rgb) => {
  let hex = Math.round(rgb * 255).toString(16);
  if (hex.length < 2) {
    return `0${hex.slice(-2)}`;
  } else {
    return hex;
  }
};

// TODO: Pass all props
const parseTypeText = (node) => {
  if (node.type != "TEXT") return { typeProps: "", text: "" };

  return {
    typeProps: ` fontSize={${node.style.fontSize}} lineHeight={${node.style.lineHeightPx}} letterSpacing={${node.style.letterSpacing}} fontFamily="${node.style.fontFamily}" text="${node.characters}"}`,
    text: node.characters,
  };
};

const globalVars = [];
getGlobalName = (name) => {
  let alreadyExist = true;
  let newname = name.replace(/[^\w]/gi, "").toLowerCase();

  while (alreadyExist == false) {
    let alreadyExist = globalVars.filter((v) => v == newname);
    if (alreadyExist) {
      newname = `${newname}_${count}`;
    }
  }

  globalVars.push(newname);
  return newname;
};

const genereteComponent = () => {};

const generateWrapper = (tree) => {
  const wrapperContent = {
    imports: [],
    variables: "",
    content: "",
  };

  tree.map((o, i) => {
    wrapperContent.imports.push(o.fileName);
    wrapperContent.variables += o.exports.join(", ");
    if (i != tree.length - 1) wrapperContent.variables += ", ";

    let bind = o.exports.map((b) => `bind:${b}`).join(" ");
    wrapperContent.content += `<${o.fileName} ${bind} />`;
  });

  return wrapperContent;
};

module.exports = {
  parseFigma,
};

// TODO:
// Create a components file and reuse the component
// Do we need cache?

// Figma Naming:
// <> new component
// * exlude import
// -img transform image
