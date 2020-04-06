const { compareAsc, parseISO } = require("date-fns");
const dotenv = require("dotenv").config();
const Figma = require("figma-js");
const { parseFigma } = require("./parse-figma.js");
const chalk = require("chalk");

if (
  process.env.FILEID === undefined ||
  process.env.FILEID === "" ||
  process.env.ACCESSTOKEN === undefined ||
  process.env.ACCESSTOKEN === ""
) {
  // TODO: Create a message class
  console.log(
    `🔗  ${chalk.bold.cyanBright("info")} You don't have a figma file linked`
  );
  return;
}

console.log(`🔗  ${chalk.bold.greenBright("info")} Figma file linked`);

const lastModified = {};
const token = process.env.ACCESSTOKEN;
const fileId = process.env.FILEID;

const client = Figma.Client({
  personalAccessToken: token,
});

function checkIfFigmaFileModified(fileId, cb) {
  const previouslyModified = lastModified[fileId];
  client.file(fileId).then(({ data }) => {
    if (
      !previouslyModified ||
      compareAsc(parseISO(data.lastModified), parseISO(previouslyModified))
    ) {
      // TODO: Add await function and prompt a message after fetch new informations
      cb(data);
      lastModified[fileId] = data.lastModified;
    }
  });
}

function watchFigmaFile(fileId, cb, pollingInterval = 2000) {
  setInterval(() => {
    checkIfFigmaFileModified(fileId, cb);
  }, pollingInterval);
}

watchFigmaFile(fileId, parseFigma);
