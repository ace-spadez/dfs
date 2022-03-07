import Vue from "vue";
import Router from "vue-router";

import RouterComponent from "./components/RouterComponent.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "start" */ "./views/main/Start.vue"),
      children: [
        {
          path: "login",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "login" */ "./views/Login.vue"),
        },
        {
          path: "register",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "login" */ "./views/Register.vue"),
        },
        {
          path: "recover-password",
          component: () =>
            import(
              /* webpackChunkName: "recover-password" */ "./views/PasswordRecovery.vue"
            ),
        },
        {
          path: "reset-password",
          component: () =>
            import(
              /* webpackChunkName: "reset-password" */ "./views/ResetPassword.vue"
            ),
        },
        {
          path: 'quadrant',
          component: () => import("./views/quadrant/QuadHome.vue"),
          children: [
            {
              path: "main",
              component: () => import("./views/quadrant/views/Main.vue")
            },
            {
              path: 'addcontest',
              component: () => import("./views/quadrant/views/AddContest.vue")
            },
            {
              path: 'contests/:id',
              name: 'quadcontest',
              component: () => import("./views/quadrant/views/QuadContest.vue"),
            },
            {
              path: 'contests/:id/edit',
              name: 'quadcontestedit',
              component: () => import("./views/quadrant/views/EditContest.vue"),
            },
            {
              path: 'contests/:id/addproblem',
              name: 'quadcontestaddproblem',
              component: () => import("./views/quadrant/views/AddProblem.vue"),
            },
            {
              path: 'contests/:contest_uuid/problems/:problem_id/edit',
              name: 'quadcontesteditproblem',
              component: () => import("./views/quadrant/views/EditProblem.vue"),
            },

          ]

        },

        {
          path: "user",
          component: () => import('./views/user/Profile_Dashboard.vue')
          // children: [
          //   {
          //     path: ':user_id',

          //     component: () => import('./views/user/Profile_Dashboard.vue')
          //   }
          // ]
        },

        {
          path: "home",

          component: () => import("./views/home/Home.vue"),
          children: [
            {
              path: "main",

              component: () => import("./views/home/views/Main.vue"),
            },

            { path: "contests", },
            { path: "rankings", },
            { path: "problemsets", },
            {
              path: "quadrant",
              component: () => import("./views/quadrant/Quadrant.vue"),

            },
            { path: "prime", },
            { path: "profile", },
            { path: "analysis", },
            { path: "settings", },
            { path: "user-profile", 
              component: () => import("./views/user/Profile_Dashboard.vue")
            },

          ],
        },

        {
          path: 'contests/:id/preview',
          name: 'contest-preview',
          component: () => import("./views/contests/ContestPreview.vue"),

        },
        {
          path: 'contests/:id',
          name: 'contest',
          component: () => import("./views/contests/Contest.vue"),
        },
        {
          path: 'contests/:id/submission',
          name: 'submission',
          component: () => import("./views/contests/Submission.vue"),
        },
        // {
        //   path: "main",
        //   component: () =>
        //     import(/* webpackChunkName: "main" */ "./views/main/Main.vue"),
        //   children: [
        //     {
        //       path: "dashboard",
        //       component: () =>
        //         import(
        //           /* webpackChunkName: "main-dashboard" */ "./views/main/Dashboard.vue"
        //         ),
        //     },
        //     {
        //       path: "profile",
        //       component: RouterComponent,
        //       redirect: "profile/view",
        //       children: [
        //         {
        //           path: "view",
        //           component: () =>
        //             import(
        //               /* webpackChunkName: "main-profile" */ "./views/main/profile/UserProfile.vue"
        //             ),
        //         },
        //         {
        //           path: "edit",
        //           component: () =>
        //             import(
        //               /* webpackChunkName: "main-profile-edit" */ "./views/main/profile/UserProfileEdit.vue"
        //             ),
        //         },
        //         {
        //           path: "password",
        //           component: () =>
        //             import(
        //               /* webpackChunkName: "main-profile-password" */ "./views/main/profile/UserProfileEditPassword.vue"
        //             ),
        //         },
        //       ],
        //     },
        //     {
        //       path: "admin",
        //       component: () =>
        //         import(
        //           /* webpackChunkName: "main-admin" */ "./views/main/admin/Admin.vue"
        //         ),
        //       redirect: "admin/users/all",
        //       children: [
        //         {
        //           path: "users",
        //           redirect: "users/all",
        //         },
        //         {
        //           path: "users/all",
        //           component: () =>
        //             import(
        //               /* webpackChunkName: "main-admin-users" */ "./views/main/admin/AdminUsers.vue"
        //             ),
        //         },
        //         {
        //           path: "users/edit/:id",
        //           name: "main-admin-users-edit",
        //           component: () =>
        //             import(
        //               /* webpackChunkName: "main-admin-users-edit" */ "./views/main/admin/EditUser.vue"
        //             ),
        //         },
        //         {
        //           path: "users/create",
        //           name: "main-admin-users-create",
        //           component: () =>
        //             import(
        //               /* webpackChunkName: "main-admin-users-create" */ "./views/main/admin/CreateUser.vue"
        //             ),
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
    {
      path: "/*",
      redirect: "/",
    },
  ],
});
