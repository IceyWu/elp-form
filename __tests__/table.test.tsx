import { mount } from "@vue/test-utils";
import { describe, expect, it, test } from "vitest";
import { nextTick, type VNode, reactive, ref } from "vue";
import { ElpForm, type formBuilderProps } from "../packages";

const _mount = (render: () => VNode) => {
  return mount(render, { attachTo: document.body });
};

describe("ElpForm", () => {
  const columns = [
    {
      label: "Department Name",
      prop: "name"
    }
  ];
  const dataList = [{ name: "Tom" }];

  it("should work with import on demand", () => {
    mount(ElpForm);
  });


});
