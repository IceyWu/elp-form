import { defineComponent, ref, PropType, reactive, computed } from "vue";
// import type { FormInstance, FormRules } from "element-plus";
import { formBuilderProps } from "../../types";
// import { getPlusName, renderElement } from "../helper";
import {
  ElForm,
  ElFormItem,
  ElCol,
  ElRow,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElDatePicker,
  ElTimePicker,
  ElInputNumber,
  ElSwitch,
  ElRadio,
  ElRadioGroup,
  ElUpload,
  type FormInstance,
  type FormRules
} from "element-plus";

const props = {
  formItems: {
    type: Array as PropType<formBuilderProps[]>,
    required: true,
    default: () => []
  },
  submitLoading: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({})
  },
  layoutConfig: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  formAttr: {
    type: Object,
    default: () => ({})
  },
  hooks: {
    type: Object,
    default: () => ({})
  },
  slots: {
    type: Object,
    default: () => ({})
  }
};

export default defineComponent({
  name: "ElpForm",
  props,
  emits: ["refresh", "search", "resetForm"],
  setup(props, { emit }) {
    const ruleFormRef = ref<FormInstance>();
    const form = reactive(
      props.formItems.reduce((acc, item: any) => {
        acc[item.value] = item.defaultValue;
        return acc;
      }, {})
    );
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          emit("search", form);
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      emit("resetForm");
    };
    // 如果formItems中有rowIndex则按照rowIndex进行排序,没有rowIndex则排在最后
    const formItems = computed(() => {
      const { formItems } = props;
      const formItemsWithRowIndex = formItems.filter(
        item => item.rowIndex !== undefined
      );
      const formItemsWithoutRowIndex = formItems.filter(
        item => item.rowIndex === undefined
      );
      return formItemsWithRowIndex
        .sort((a, b) => a.rowIndex - b.rowIndex)
        .concat(formItemsWithoutRowIndex);
    });
    // render组件列表
    const renderElement = {
      // Input 输入框
      renderInput: (item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElInput
            {...(item.attribute || {})}
            v-model={form[item.value]}
            onBlur={item.hooks?.blur}
            onFocus={item.hooks?.focus}
            onChange={item.hooks?.change}
            onInput={item.hooks?.input}
            onClear={item.hooks?.clear}
          >
            {item.slots && Object.keys(item.slots).length > 0
              ? Object.keys(item.slots).map((slotName: string) => {
                  return item.slots[slotName]();
                })
              : null}
          </ElInput>
        </ElFormItem>
      ),
      // Input Number 数字输入框
      renderInputNumber: (item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElInputNumber
            {...(item.attribute || {})}
            v-model={form[item.value]}
            onChange={item.hooks?.change}
            onBlur={item.hooks?.blur}
            onFocus={item.hooks?.focus}
          />
        </ElFormItem>
      ),
      // Select 选择器
      renderSelect: (item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElSelect
            {...(item.attribute || {})}
            v-model={form[item.value]}
            onChange={item.hooks?.change}
            onBlur={item.hooks?.blur}
            onFocus={item.hooks?.focus}
            onVisibleChange={item.hooks?.visibleChange}
            onRemoveTag={item.hooks?.removeTag}
            onClear={item.hooks?.clear}
          >
            {item.options.map((option: any) => (
              <ElOption
                label={option.label}
                value={option.value}
                key={option.value}
              />
            ))}
          </ElSelect>
        </ElFormItem>
      ),
      renderDatePicker: (item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElDatePicker
            {...(item.attribute || {})}
            v-model={form[item.value]}
          />
        </ElFormItem>
      ),
      // Switch
      renderSwitch: (item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElSwitch
            {...(item.attribute || {})}
            v-model={form[item.value]}
            onChange={item.hooks?.change}
          />
        </ElFormItem>
      ),

      // radio
      renderRadio: (item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElRadio {...(item.attribute || {})} v-model={form[item.value]} />
        </ElFormItem>
      ),
      // Upload 上传
      renderUpload: (item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElUpload
            {...(item.attribute || {})}
            v-model={form[item.value]}
            onChange={item.hooks?.change}
            onPreview={item.hooks?.preview}
            onRemove={item.hooks?.remove}
            onSuccess={item.hooks?.success}
            onExceed={item.hooks?.exceed}
            onProgress={item.hooks?.progress}
            onError={item.hooks?.error}
            onBeforeUpload={item.hooks?.beforeUpload}
          >
            {item.slots && Object.keys(item.slots).length > 0
              ? Object.keys(item.slots).map((slotName: string) => {
                  return item.slots[slotName]();
                })
              : null}
          </ElUpload>
        </ElFormItem>
      )
    };

    return () => (
      <>
        <ElForm
          ref={ruleFormRef}
          model={form}
          rules={props.rules}
          {...(props.formAttr || {})}
        >
          {props.layoutConfig.length > 0
            ? props.layoutConfig.map((row: any) => (
                <ElRow {...(row.rowAttr || {})}>
                  {row.cols.map((col: any) => (
                    <ElCol {...(col.colAttr || {})}>
                      {formItems.value
                        .filter((item: any) => item.rowIndex === col.rowIndex)
                        .map((item: any) => {
                          if (item.type === "input") {
                            return renderElement.renderInput(item);
                          } else if (item.type === "select") {
                            return renderElement.renderSelect(item);
                          } else if (item.type === "date") {
                            return renderElement.renderDatePicker(item);
                          } else if (item.type === "switch") {
                            return renderElement.renderSwitch(item);
                          } else if (item.type === "inputNumber") {
                            return renderElement.renderInputNumber(item);
                          } else if (item.type === "radio") {
                            return renderElement.renderRadio(item);
                          } else if (item.type === "upload") {
                            return renderElement.renderUpload(item);
                          }
                        })}
                    </ElCol>
                  ))}
                </ElRow>
              ))
            : formItems.value.map((item: any) => {
                if (item.type === "input") {
                  return renderElement.renderInput(item);
                } else if (item.type === "select") {
                  return renderElement.renderSelect(item);
                } else if (item.type === "date") {
                  return renderElement.renderDatePicker(item);
                } else if (item.type === "switch") {
                  return renderElement.renderSwitch(item);
                } else if (item.type === "inputNumber") {
                  return renderElement.renderInputNumber(item);
                } else if (item.type === "radio") {
                  return renderElement.renderRadio(item);
                } else if (item.type === "upload") {
                  return renderElement.renderUpload(item);
                }
              })}
          <ElFormItem>
            <ElButton
              type="primary"
              loading={props.submitLoading}
              onClick={() => submitForm(ruleFormRef.value)}
            >
              搜索
            </ElButton>
            <ElButton onClick={() => resetForm(ruleFormRef.value)}>
              重置
            </ElButton>
          </ElFormItem>
        </ElForm>
      </>
    );
  }
});
