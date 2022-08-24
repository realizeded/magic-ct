#!/usr/bin/env node
const Path = require("path");
const Fs = require("fs");
const inquirer = require("inquirer");
const { selectBox, configFileName, promptList } = require("./constant");
const { resolve } = require("path");
const { fileExist, readFile } = require("./processFile");
const outputSelectBox = () => {
  return inquirer.prompt(selectBox);
};

const outputInput = () => {
  return inquirer.prompt(promptList);
};

const exist = (path) => {
  return new Promise((resolve, reject) => {
    const filePath = path;

    Fs.exists(filePath, (result) => {
      if (result) {
        resolve(filePath);
      }
      reject(path);
    });
  });
};

const findConfigFIlePath = (cliExecPath) => {
  return exist(Path.join(cliExecPath, configFileName)).then(
    () => {
      return cliExecPath;
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

const generatorDir = (dirs, path, name) => {
  const dirsPath = dirs.map((dir) =>
    Path.join(path, dir.replace(/CtName/g, name))
  );

  dirsPath.forEach((dirPath) => {
    Fs.mkdir(dirPath, (err) => {
      if (err) {
        throw err;
      }
    });
  });
};

const generatorFile = (files, path, name, type, configPath) => {
  const filePaths = files.map((file) => Path.join(path, file));
  filePaths.forEach((filePath, i) => {
    const templatePath = Path.join(configPath, "./ctTemplate", type, files[i]);

    fileExist(templatePath)
      .then((exist) => {
        if (exist) {
          return readFile(templatePath);
        }
        return "";
      })
      .then((data) => {
        const newData = data.replace(/CtName/g, name);

        Fs.writeFile(
          filePath.replace(/CtName/g, name),
          newData,
          "utf-8",
          (err) => {
            if (err) {
              throw err;
            }
          }
        );
      });
  });
};

const parseConfig = (config, path, type, configPath, name) => {
  Object.keys(config).forEach((key) => {
    const templateList = config[key];

    if (key === "dir") {
      generatorDir(templateList, path, name);
    } else {
      generatorFile(templateList, path, name, type, configPath);
    }
  });
};
const generator = (config, type, path, configPath, name) => {
  const configOfKey = config[type];
  parseConfig(configOfKey, path, type, configPath, name);
};

const main = async () => {
  const result = await outputSelectBox();
  const { name } = await outputInput();

  const { type } = result;
  const cliExecPath = process.cwd();

  const configPath = await findConfigFIlePath(cliExecPath);

  const config = await require(Path.join(configPath, configFileName));

  const newPath = Path.join(cliExecPath, name);

  generatorSingleDif(newPath)
    .then(() => {
      generator(config, type, newPath, configPath, name);
    })
    .catch((err) => {
      process.stdout.write(`目录已存在${name}`);
    });
};

main();
