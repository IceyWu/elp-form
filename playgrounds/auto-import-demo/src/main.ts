import { createApp } from "vue";
import App from "./App.vue";

// If you want to use ElTable, import it.
import "element-plus/es/components/table/style/css";

import Table from "elp-form";

const app = createApp(App);
app.use(Table).mount("#app");
