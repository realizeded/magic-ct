exports.selectBox = [
  {
    type: "list",
    message: "select create component or page:",
    name: "type",
    choices: ["page", "component"],
    pageSize: 2, // 设置行数
  },
];

exports.promptList = [
  {
    type: "input",
    message: "input name",
    name: "name",
  },
];

exports.configFileName = "component.config.json";
