<h1 align="center">elp-form</h1>
<p align="center">🚀更轻松的构建基于element-plus的Form表单</p>

<p align="center">
<a href="https://www.npmjs.com/package/elp-form" target="__blank"><img src="https://img.shields.io/npm/v/elp-form?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/elp-form" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/elp-form?color=50a36f&label="></a>
</p>

**中文** | [English](./README.md)

- [预览地址](https://pkg-demo.netlify.app/)

## 🚀 特性

- ⚡ **Layout 布局**: 通过 layoutConfig 列表配置，可以自定义表单 row,col 的布局
- 🐱 **组件基础属性保留**: 保持`element-plus` [Form](https://element-plus.org/zh-CN/component/table.html)，[Input](https://element-plus.org/zh-CN/component/input.html)等的组件的所有属性配置，灵活配置单个表单项的属性
- 🎈 **表单输入验证**: 通过`rules`配置，可以自定义表单的校验规则，支持`element-plus` [Form](https://element-plus.org/zh-CN/component/form.html#rules)的所有规则
- 🥏 **自带提交与重置**: 一键提交表单，一键重置表单
  -🚩 **插槽与钩子**: 通过 hooks 属性与 slots 属性，可以自定义表单的插槽与钩子

## 📦 安装

```bash
npm install elp-form
or
pnpm add elp-form
or
yarn add elp-form
```

## 🦄 用法

```ts
import { ElpForm } from "elp-form";

<ElpForm
  :formItems="formItems"
  :rules="rules"
  :submitLoading="submitLoading"
  :layoutConfig="layoutConfig"
  @resetForm="resetForm"
  @search="search"
  />
```

### 配置项: formItems(必填)

- 支持的组件类型：input,select,switch,TimeSelect, inputNumber, radio，upload

```ts
const formItems = reactive([
  {
    label?: string;,  /** 表单标签文本 `可选` */
    type: string, /** 表单标签类型(input,select,date...) `必填` */
    value:string,  /** 表单标签绑定值 `必填` */
    defaultValue?: string, /** 表单标签默认值 `可选` */
    attribute: {
      placeholder?: string, /** 表单标签placeholder `可选` */
      maxlength?: number, /** 表单标签最大长度 `可选` */
      ... /** 表单标签其他属性 `可选` */
    },
    rowIndex?: number, /** 表单标签所在行索引,可通过layoutConfig控制显示顺序 `可选` */
    hook?: {
      onChange?: (value: any) => void, /** 表单标签change事件 `可选` */
      onInput?: (value: any) => void, /** 表单标签input事件 `可选` */
      ... /** 表单标签其他事件 `可选` */
    },
    slot?: {
      prepend?: string, /** 表单标签前置插槽 `可选` */
      append?: string, /** 表单标签后置插槽 `可选` */
      ... /** 表单标签其他插槽 `可选` */
    },
  },
  ...

]);
```

### 配置项:submitLoading(可选)

- 提交表单时的加载状态

```ts
import { ref } from "vue";
const submitLoading = ref(false);
```

### 配置项:rules(可选)

- 验证用户的输入是否符合规范(同 element-plus [rules](https://element-plus.org/zh-CN/component/form.html#rules))

```ts
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ]
});
```

### 配置项:layoutConfig(可选)

- 配置表单布局
- rowAttr 同 element-plus [layout-row](https://element-plus.org/zh-CN/component/layout.html#row-%E5%B1%9E%E6%80%A7)
- colAttr 同 element-plus [layout-col](https://element-plus.org/zh-CN/component/layout.html#col-%E5%B1%9E%E6%80%A7)

```ts
const layoutConfig = [
  {
    rowAttr: {
      gutter: 0 /** 行属性 `可选` */
      ... /** Row 属性 `可选` */
    },
    cols: [
      {
        rowIndex: 0, /** 对应formItems中每一项的rowindex行索引 `必填` */
        colAttr: {
          span: 8 /** 列属性 `可选` */
          ... /** Col 属性 `可选` */
        }
      },
      ...
    ]
  },
  ...
];

```

### 配置项:hooks(可选)

- 配置表单的钩子函数，提供组件所有的钩子函数
- 通过`hooks`属性，可以自定义表单组件的钩子

```ts
const formItems = reactive([
  {
    label?: string;,  /** 表单标签文本 `可选` */
    type: 'switch', /** 表单标签类型(input,select,date...) `必填` */
    ...,
    hooks: {
      change: (val: any) => {
        console.log('switch11', val)
        ElMessage({
          message: val ? '开' : '关',
          type: 'success',
        })
      },
    },
    ...
  },
  ...
]);
```

### 配置项:slots(可选)

- 配置表单的插槽
- 通过`slots`属性，可以自定义表单组件的插槽

```ts
const formItems = reactive([
  {
    label?: string;,  /** 表单标签文本 `可选` */
    type: 'select', /** 表单标签类型(input,select,date...) `必填` */
    ...,
    slots: {
      prefix: () => {
        return <i class="el-icon-search"></i>
      },
      suffix: () => {
        return <i class="el-icon-date"></i>
      },
    },
    ...
  },
  ...
]);
```
