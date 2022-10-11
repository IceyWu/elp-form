export type { formBuilderProps } from "./types";

import type { App } from "vue";

import Form from "./components/form";

export const ElpForm = Object.assign(Form, {
  install: function (app: App) {
    app.component(ElpForm.name, ElpForm);
  }
});

export default ElpForm;
