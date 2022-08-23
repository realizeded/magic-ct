const fs = require("fs");

exports.fileExist = (path) => {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exist) => {
      resolve(exist);
    });
  });
};

exports.readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf8" }, (err, data) => {
      if (err) {
        reject();
      }

      resolve(data);
    });
  });
};
