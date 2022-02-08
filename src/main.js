"use strict";
import {
    createApp
} from "vue";
import App from "@/App";
import components from "@/components/UI";
import router from "@/router/router";
// import VIntersection from "@/components/directives/VIntersection";
import directives from "@/components/directives";

// import App from './App.vue'
// import router from './router'
// import store from './store'

const app = createApp(App);

components.forEach((component) => {
    app.component(component.name, component);
});

directives.forEach((directive) => {
    app.directive(directive.name, directive);
});
// app.directive('intersection', VIntersection);

app.use(router).mount("#app");
