const inquirer = require("inquirer");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");

(async function run() {
  let REGEX = /https:\/\/([w.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/;

  const promptAnswers = await inquirer.prompt([
    {
      type: "input",
      name: "url",
      message: "Enter your Figma file URL:",
      validate: (input) => {
        if (!REGEX.test(input)) {
          return `${chalk.bold.redBright("error")} Invalid Figma URL`;
        }
        return true;
      },
    },
    {
      type: "input",
      name: "token",
      message: "Enter a Figma personal access token:",
    },
  ]);

  let id = promptAnswers.url.match(REGEX)[3];
  let content = `FILEID=${id}\nACCESSTOKEN=${promptAnswers.token}`;
  writeEnvFile(content);

  console.log(`🔗  ${chalk.bold.greenBright("success")} Figma file linked`);
})();

function writeEnvFile(content) {
  let dirpath = path.join(process.cwd(), ".env");
  fs.writeFileSync(dirpath, content, { encoding: "utf8", flag: "w" });
}
