<template>
  <el-space :spacer="spacer">
    <el-switch
      v-model="isDark"
      inline-prompt
      size="large"
      :active-icon="dayIcon"
      :inactive-icon="darkIcon"
      @change="dataThemeChange"
    />
    <el-switch
      v-model="language"
      inline-prompt
      size="large"
      :active-icon="chineseIcon"
      :inactive-icon="englishIcon"
      @change="locale = language ? 'zh' : 'en'"
    />

    <el-tooltip :content="t('text.console')">
      <el-button type="primary" @click="getTableMethods">
        {{ t("button.methods") }}
      </el-button>
    </el-tooltip>
  </el-space>

  <div>
    <ElpForm
      :formItems="formItems"
      :rules="rules"
      :submitLoading="submitLoading"
      :layoutConfig="layoutConfig"
      @resetForm="resetForm"
      @search="search"
    >
      1212</ElpForm
    >
  </div>
  <div>
    <h2>添加用户</h2>
    <el-button type="primary" @click="dialogVisible = true">添加账号</el-button>
    <el-dialog v-model="dialogVisible" title="添加账号" width="40%">
      <ElpForm
        :formItems="addUserForm"
        :rules="rules"
        :submitLoading="submitLoading"
        @resetForm="resetForm"
        @search="search"
      />
    </el-dialog>
    <ElpForm
      :formItems="addUserForm"
      :rules="rules"
      :submitLoading="submitLoading"
      @resetForm="resetForm"
      @search="search"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ElDivider } from "element-plus";
import type { FormRules } from "element-plus";
import { h, ref, reactive, onMounted } from "vue";
import { ElpForm } from "../packages";
import dayIcon from "./svg/day.svg";
import darkIcon from "./svg/dark.svg";
import chineseIcon from "./svg/chinese.svg";
import englishIcon from "./svg/english.svg";
const dialogVisible = ref(false);
let loading = ref(true);
let isDark = ref(false);
let language = ref(true);
let dataList = ref<any>([]);
const { t, locale } = useI18n();
const spacer = h(ElDivider, { direction: "vertical" });

const tableRef = ref();

function getTableMethods() {
  console.log("methods", tableRef.value.getTableRef());
}

function dataThemeChange(val) {
  isDark.value = val;
  if (val) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
const submitLoading = ref(false);
const resetForm = () => {
  console.log("resetForm");
};
const search = (data: object) => {
  console.log("searchValue", data);
  submitLoading.value = true;
  setTimeout(() => {
    submitLoading.value = false;
  }, 1000);
};
const rules = reactive<FormRules>({
  name: [
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ]
});
const formItems = reactive([
  {
    label: "姓名",
    type: "input",
    value: "name",
    defaultValue: "",

    attribute: {
      maxlength: 20,
      clearable: true,
      placeholder: "请输入姓名"
    },
    rowIndex: 0
  },
  {
    label: "电话",
    type: "input",
    value: "mobile",
    defaultValue: "",

    attribute: {
      maxlength: 11,
      showWordLimit: true,
      clearable: true,
      placeholder: "请输入电话"
    },
    rowIndex: 1
  },
  {
    label: "状态",
    type: "select",
    value: "selectValue",
    defaultValue: "0",

    attribute: {
      placeholder: "请选择状态"
    },
    options: [
      {
        label: "全部",
        value: "0"
      },
      {
        label: "启用",
        value: "1"
      },
      {
        label: "禁用",
        value: "2"
      }
    ],
    rowIndex: 2
  },
  // 日期
  {
    label: "日期",
    type: "date",
    value: "date",
    defaultValue: "",
    attribute: {
      startPlaceholder: "开始日期",
      endPlaceholder: "结束日期",
      type: "datetimerange",
      // "value-format": "yyyy-MM-dd HH:mm:ss",
      "range-separator": "至",
      "start-date": new Date(),
      "picker-options": {
        disabledDate(time: any) {
          return time.getTime() > Date.now();
        }
      }
    },
    rowIndex: 3
  }
]);
const addUserForm = [
  {
    label: "姓名",
    type: "input",
    value: "username",
    defaultValue: "",

    attribute: {
      placeholder: "请输入姓名",
      maxlength: 20,
      clearable: true
    },
    rowIndex: 0
  },
  {
    label: "账号",
    type: "input",
    value: "password",
    defaultValue: "",

    attribute: {
      placeholder: "请输入账号",
      maxlength: 20,
      clearable: true
    },
    rowIndex: 1
  },
  {
    label: "密码",
    type: "input",
    value: "password",
    defaultValue: "",

    attribute: {
      placeholder: "请输入密码",
      maxlength: 20,
      clearable: true
    },
    rowIndex: 1
  }
];
const layoutConfig = [
  {
    rowAttr: {
      gutter: 0
    },
    cols: [
      {
        rowIndex: 0,
        colAttr: {
          span: 8
        }
      },
      {
        rowIndex: 1,
        colAttr: {
          span: 8
        }
      }
    ]
  },
  {
    cols: [
      {
        rowIndex: 2,
        colAttr: {
          span: 4
        }
      },
      {
        rowIndex: 3,
        colAttr: {
          span: 6
        }
      }
    ]
  }
];

onMounted(() => {});
</script>

<style>
.el-empty__description {
  margin: 0 !important;
}
.daiglog {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
