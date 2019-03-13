var fs = require("fs"),
  log = fs.createWriteStream("log.txt", { flags: "a" }),
  dt = require("./datetime.js"),
  nl = "\n",
  tab = "\t";

exports.saveToFile = function(command, response) {
  log.write(
    "Command: " +
      command +
      tab +
      "Response: " +
      response +
      tab +
      "Date:" +
      dt.getDateTime() +
      nl
  );
};
