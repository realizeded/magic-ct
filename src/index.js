#!/usr/bin/env node
const Path = require("path");
const Fs = require("fs");
const inquirer = require("inquirer");
const { selectBox, configFileName, promptList } = require("./constant");
const { resolve } = require("path");

const outputSelectBox = () => {
  return inquirer.prompt(selectBox);
};

const outputInput = () => {
  return inquirer.prompt(promptList);
};

const exist = (path) => {
  return new Promise((resolve, reject) => {
    const filePath = Path.join(path, configFileName);

    Fs.exists(filePath, (result) => {
      if (result) {
        resolve(filePath);
      }
      reject(path);
    });
  });
};

const findConfigFIlePath = (cliExecPath) => {
  return exist(cliExecPath).then(
    (path) => {
      return path;
    },
    () => {
      const parentPath = Path.join(cliExecPath, "../");
      if (parentPath === cliExecPath) {
        process.stdout.write("未找到配置文件");
        process.exit();
      }
      return findConfigFIlePath(parentPath);
    }
  );
};

const generatorSingleDif = (path) => {
  return new Promise((resolve, reject) => {
    Fs.mkdir(path, (err) => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
};

const generatorDir = (dirs, path) => {
  const dirsPath = dirs.map((dir) => Path.join(path, dir));

  dirsPath.forEach((dirPath) => {
    Fs.mkdir(dirPath, (err) => {
      if (err) {
        throw err;
      }
    });
  });
};

const generatorFile = (files, path) => {
  const filePaths = files.map((file) => Path.join(path, file));

  filePaths.forEach((filePath) => {
    Fs.writeFile(filePath, "", "utf-8", (err) => {
      if (err) {
        throw err;
      }
    });
  });
};

const parseConfig = (config, path) => {
  Object.keys(config).forEach((key) => {
    const templateList = config[key];

    if (key === "dir") {
      generatorDir(templateList, path);
    } else {
      generatorFile(templateList, path);
    }
  });
};
const generator = (config, type, path) => {
  const configOfKey = config[type];
  parseConfig(configOfKey, path);
};

const main = async () => {
  const result = await outputSelectBox();
  const { name } = await outputInput();

  const { type } = result;
  const cliExecPath = process.cwd();
  const configPath = await findConfigFIlePath(cliExecPath);
  const config = await require(configPath);

  const newPath = Path.join(cliExecPath, name);

  generatorSingleDif(newPath)
    .then(() => {
      generator(config, type, newPath);
    })
    .catch((err) => {
      console.log(err);
      process.stdout.write(`目录已存在${name}`);
    });
};

main();
