import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import Settings from "@/components/Settings.vue";
import Layout from "@/layout/layout.vue";
import Notes from "@/components/Notes.vue";
import Noteview from "@/components/Noteview.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/notes/:id", component: Noteview },
  {
    path: "/",
    component: Layout,
    children: [
      { path: "/dashboard", component: Notes },
      { path: "/settings", component: Settings },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
