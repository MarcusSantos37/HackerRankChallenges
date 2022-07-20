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

/*
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function abbreviation(a, b) {
  var isLowerCase = function (value) {
    if (value.charCodeAt(0) > 96) {
      return true;
    } else {
      return false;
    }
  };

  var containsUpperCase = function (value) {
    for (var i = 0; i < value.length; i++) {
      if (!isLowerCase(value.substr(i, 1))) {
        return true;
      }
    }
    return false;
  };

  var firstCondition = true;

  b.split("").forEach((val) => {
    var index = a.indexOf(val);

    if (index == -1) {
      index = a.indexOf(val.toLowerCase());
    }

    if (index == -1) {
      firstCondition = false;
    }

    if (containsUpperCase(a.substr(0, index))) {
      firstCondition = false;
    }

    a = a.substr(index + 1);
  });

  if (containsUpperCase(a)) {
    firstCondition = false;
  }

  if (firstCondition) {
    return "YES";
  } else {
    return "NO";
  }
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const a = readLine();

    const b = readLine();

    const result = abbreviation(a, b);

    ws.write(result + "\n");
  }

  ws.end();
}
