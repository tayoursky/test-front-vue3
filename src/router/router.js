export const routes = [
  {
    path: "/",
    name: "users",
    component: () => import("../views/UsersView.vue"),
  },
];
