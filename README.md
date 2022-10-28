<h1 align="center">elp-form</h1>
<p align="center">🚀Easier to build Form based on element-plus</p>

<p align="center">
<a href="https://www.npmjs.com/package/elp-form" target="__blank"><img src="https://img.shields.io/npm/v/elp-form?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/elp-form" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/elp-form?color=50a36f&label="></a>
</p>

**English** | [中文](./README.zh-CN.md)

- [Preview](https://pkg-demo.netlify.app/)

## 🚀 Features

- ⚡ **Layout**: Through the layoutConfig list configuration, you can customize the layout of the form row, col
- 🐱 **Component basic attributes are retained**: Keep all the attribute configuration of the `element-plus` [Form](https://element-plus.org/zh-CN/component/table.html), [Input](https://element-plus.org/zh-CN/component/input.html) and other components, flexibly configure the attributes of a single form item
- 🎈 **Form input verification**: Through the `rules` configuration, you can customize the form verification rules, support all rules of `element-plus` [Form](https://element-plus.org/zh-CN/component/form.html#rules)
- 🥏 **Built-in submission and reset**: Submit the form with one click, reset the form with one click
- 🚩 **Slots and hooks**: Through the `hooks` property and the `slots` property, you can customize the form slots and hooks

## 📦 Install

```bash
npm install elp-form
or
pnpm add elp-form
or
yarn add elp-form
```

## 🦄 Usage

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

### Configuration: formItems(required)

- Support component types: input, select, switch, TimeSelect, inputNumber, radio, upload

```ts
const formItems =  reactive([
  {
    label?: string;,  /** Form label text `optional` */
    type: string, /** Form label type(input,select,date) `required` */
    value:string,  /** Form label binding value `required` */
    defaultValue?: string, /** Form label default value `optional` */
    attribute: {
      placeholder?: string, /** Form label placeholder `optional` */
      maxlength?: number, /** Form label maximum length `optional` */
      ... /** Form label other attributes `optional` */
    },
    rowIndex?: number, /** Form label row index, can be controlled by layoutConfig `optional` */
    hook?: {
      change?: (value: any) => void, /** Form label change event `optional` */
      ... /** Form label other hooks `optional` */
    },
    slots?: {
      prepend?: string, /** Form label prepend slot `optional` */
      append?: string, /** Form label append slot `optional` */
      ... /** Form label other slots `optional` */
    },
  },
  ...

]);
```

### Configuration: submitLoading(optional)

- Loading status when submitting the form

```ts
import { ref } from "vue";
const submitLoading = ref(false);
```

### Configuration: rules(optional)

- Verify whether the user's input meets the specifications (same as element-plus [rules](https://element-plus.org/zh-CN/component/form.html#rules))

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

### Configuration: layoutConfig(optional)

- Configure the form layout
- rowAttr is the same as element-plus [layout-row](https://element-plus.org/zh-CN/component/layout.html#row-%E5%B1%9E%E6%80%A7)
- colAttr is the same as element-plus [layout-col](https://element-plus.org/zh-CN/component/layout.html#col-%E5%B1%9E%E6%80%A7)

```ts
const layoutConfig = [
  {
    rowAttr: {
      gutter: 0 /** Row attribute `optional` */
      ... /** Row attribute `optional` */
    },
    cols: [
      {
        rowIndex: 0, /** Corresponding rowindex of formItems `required` */
        colAttr: {
          span: 8 /** Column attribute `optional` */
          ... /** Column attribute `optional` */
        }
      },
      ...
    ]
  },
  ...
];
```

### Configuration: hooks(optional)

- Configure the form hook function to provide all the hook functions of the component
- Through the `hooks` property, you can customize the form component hook

```ts
const formItems = reactive([
{
  label?: string;,  /** Form label text `optional` */
  type: 'switch', /** Form label type(input,select,date) `required` */
  ...,
  hooks: {
    change: (val: any) => {
      console.log('switch11', val)
      ElMessage({
        message: val ? 'Open' : 'Close',
        type: 'success',
      })
    },
  },
  ...
},
...
]);
```

### Configuration: slots(optional)

- Configure the form slot function to provide all the slot functions of the component
- Through the `slots` property, you can customize the form component slot

```ts
const formItems = reactive([
{
  label?: string;,  /** Form label text `optional` */
  type: 'input', /** Form label type(input,select,date) `required` */
  ...,
  slots: {
    prepend: () => {
      return <span>prepend</span>
    },
    append: () => {
      return <span>append</span>
    },
  },
  ...
},
...
]);
```
