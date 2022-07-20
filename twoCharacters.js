"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function alternate(s) {
  if (s.length === 1) {
    return 0;
  }

  let uniqueChar = [...new Set(Array.from(s))];

  let sArr = Array.from(s);

  let longest = 0;

  for (var i = 0; i < uniqueChar.length; i++) {
    let firstEl = uniqueChar[i];

    for (var j = 0; j < uniqueChar.length; j++) {
      let secondEl = uniqueChar[j];

      let temp = sArr
        .filter((filteredEl) => {
          return filteredEl === firstEl || filteredEl === secondEl;
        })
        .join("");

      if (
        temp.indexOf(firstEl + firstEl) === -1 &&
        temp.indexOf(secondEl + secondEl) === -1
      ) {
        longest = Math.max(longest, temp.length);
      }
    }
  }
  return longest;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const l = parseInt(readLine().trim(), 10);

  const s = readLine();

  const result = alternate(s);

  ws.write(result + "\n");

  ws.end();
}
