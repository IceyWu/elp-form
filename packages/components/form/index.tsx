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
    const renderElement = {
      renderInput: (item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElInput {...(item.attribute || {})} v-model={form[item.value]} />
        </ElFormItem>
      ),
      renderSelect: (item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElSelect {...(item.attribute || {})} v-model={form[item.value]}>
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
          <ElSwitch {...(item.attribute || {})} v-model={form[item.value]} />
        </ElFormItem>
      ),
      // inputNumber
      renderInputNumber:(item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElInputNumber {...(item.attribute || {})} v-model={form[item.value]} />
        </ElFormItem>
      ),
      // radio
      renderRadio:(item: any) => (
        <ElFormItem label={item.label} prop={item.value}>
          <ElRadio {...(item.attribute || {})} v-model={form[item.value]} />
        </ElFormItem>
      ),
    };

    return () => (
      <>
        {/* 如果有layoutConfig则根据layoutConfig进行渲染 */}
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
