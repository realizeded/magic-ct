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
//component.config
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

