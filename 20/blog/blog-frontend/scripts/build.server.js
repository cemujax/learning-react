"use strict";

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
process.env.APP_ENV = "server"; // 서버환경

process.on("unhandledRejection", err => {
  throw err;
});

require("../config/env");

const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");
const webpack = require("webpack");
const config = require("../config/webpack.config.server"); // 환경설정 파일 변경
const paths = require("../config/paths");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

function build() {
  console.log("Creating server build...");

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join("\n\n")));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== "string" ||
          process.env.CI.toLowerCase() !== "false") &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            "\nTreating warnings as errors because process.env.CI = true.\n" +
              "Most CI servers set it automatically.\n"
          )
        );
        return reject(new Error(messages.warnings.join("\n\n")));
      }
      return resolve({
        stats,
        // previousFileSizes,
        warnings: messages.warnings
      });
    });
  });
}

build();
