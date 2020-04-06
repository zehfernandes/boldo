const path = require("path"),
  fs = require("fs"),
  _ = require("lodash"),
  chalk = require("chalk"),
  mkdirp = require("mkdirp");

function templateRender(sourcePath, fileName, object, templateFileName) {
  const templatePath = path.join(
    __dirname,
    "../templates",
    `${templateFileName}`
  );

  const template = fs.readFileSync(templatePath, "utf8");
  const render = _.template(template);
  const file = render(object);

  if (!fs.existsSync(sourcePath)) {
    fs.mkdirSync(sourcePath);
  }

  fs.writeFileSync(`${sourcePath}/${fileName}`, file, {
    encoding: "utf8",
    flag: "w",
  });
}

module.exports = templateRender;
