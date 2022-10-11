import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import Table from "elp-form";

const app = createApp(App);
app.use(ElementPlus).use(Table).mount("#app");
