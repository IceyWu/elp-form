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

  <div class="container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ t("text.search") }}</span>
        </div>
      </template>
      <ElpForm
        :formItems="formItems"
        :rules="rules"
        :submitLoading="submitLoading"
        :formAttr="{ inline: true }"
        @resetForm="resetForm"
        @search="search"
      >
      </ElpForm>
    </el-card>

    <el-card class="box-card" style="width: 480px">
      <template #header>
        <div class="card-header">
          <span>{{ t("text.addUser") }}</span>
        </div>
      </template>
      <ElpForm
        :formItems="addUserForm"
        :rules="rules"
        :submitLoading="submitLoading"
        @resetForm="resetForm"
        @search="search"
      >
      </ElpForm>
    </el-card>
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
    label: t("text.name"),
    type: "input",
    value: "name",
    defaultValue: "",

    attribute: {
      maxlength: 20,
      clearable: true,
      placeholder: t("text.name")
    },
    rowIndex: 0
  },
  {
    label: t("text.phone"),
    type: "input",
    value: "mobile",
    defaultValue: "",

    attribute: {
      maxlength: 11,
      showWordLimit: true,
      clearable: true,
      placeholder: t("text.phone")
    },
    rowIndex: 1
  },
  {
    label: t("text.status"),
    type: "select",
    value: "selectValue",
    defaultValue: "0",

    attribute: {
      placeholder: t("text.status")
    },
    options: [
      {
        label: t("text.all"),
        value: "0"
      },
      {
        label: t("text.abel"),
        value: "1"
      },
      {
        label: t("text.disable"),
        value: "2"
      }
    ],
    rowIndex: 2
  },
  // 日期
  {
    label: t("text.date"),
    type: "date",
    value: "date",
    defaultValue: "",
    attribute: {
      startPlaceholder: t("text.startDate"),
      endPlaceholder: t("text.endDate"),
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
    label: t("text.username"),
    type: "switch",
    value: "switch",
    defaultValue: false,
    attribute: {
      // placeholder: t("placeholder.username"),
    },
    rowIndex: 10
  },
  {
    label: t("text.username"),
    type: "input",
    value: "username",
    defaultValue: "",

    attribute: {
      placeholder: t("placeholder.username"),
      maxlength: 20,
      clearable: true
    },
    rowIndex: 0
  },
  {
    label: t("text.account"),
    type: "input",
    value: "password",
    defaultValue: "",

    attribute: {
      placeholder: t("placeholder.account"),
      maxlength: 20,
      clearable: true
    },
    rowIndex: 1
  },
  {
    label: t("text.password"),
    type: "input",
    value: "password",
    defaultValue: "",

    attribute: {
      placeholder: t("placeholder.password"),
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

<style lang="scss">
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

.container {
  // background: red;
  margin-top: 1.5rem;
  .box-card:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
