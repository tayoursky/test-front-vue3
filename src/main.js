import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import VueAwesomePaginate from "vue-awesome-paginate";

import App from "./App.vue";
import router from "./router";

import "vue-awesome-paginate/dist/style.css";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(VueAwesomePaginate);

app.mount("#app");
