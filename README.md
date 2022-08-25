# magic-ct
## 功能
可以快速的创建规范化组件

## 使用
* 安装magic-ct
```
npm i -g magic-ct
```
* 配置文件
```
//component.config.json
{
    "component": {
        "file": [
            "index.tsx",
            "style.module.less",
            "types.ts",
            "constant.ts"
        ],
        "dir": [
            "components",
            "hooks"
        ]
    },
    "page": {
        "file": [
            "index.tsx",
            "style.module.less"
        ],
        "dir": [
            "components"
        ]
    }
}
```
* 创建
在要创建的目录下 执行
```
    ct
```
* 选择创建普通组件还是页面组件
```
> page
  component
```
* 输入名称


## 使用模板
在配置文件下配置ctTemplate目录, 在对应目录下配置模板文件，注意名称要与配置文件配置配置的文件名或者目录名同名

```
├─component
└─page
```

## 使用CtName变量
CtName指的是在输入阶段，输入的名称，可以在目录名、文件名、内容上使用，ct会自动替换
```
// template
import React from "react";

interface IProps {
};

const CtName: React.FC<IProps> = () => {
  return <div></div>;
};

```
如果输入的名称是Yes，那么生成的内容会是
```
import React from "react";

interface IProps {
};

const Yes: React.FC<IProps> = () => {
  return <div></div>;
};
```

## ct支持的参数
* ct -c <名称> \
快速创建component
* ct -p <名称>  \
  快速创建page
* ct -v  \
查看当前使用的版本