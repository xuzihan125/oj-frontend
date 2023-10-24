import { RouteRecordRaw } from "vue-router";
import AccessEnum from "@/access/accessEnum";
import UserLayout from "@/layout/UserLayout.vue";
import UserLoginView from "@/views/User/UserLoginView.vue";
import UserRegisterView from "@/views/User/UserRegisterView.vue";
import QuestionManageView from "@/views/Question/QuestionManageView.vue";
import QuestionAddView from "@/views/Question/QuestionAddView.vue";
import QuestionListView from "@/views/Question/QuestionListView.vue";
import QuestionAnswerView from "@/views/Question/QuestionAnswerView.vue";
import TestView from "@/views/TestView.vue";
import SubmissionListView from "@/views/Question/SubmissionListView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "user",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "user login",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "user register",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/Question",
    name: "Questions",
    component: QuestionListView,
  },
  {
    path: "/",
    name: "Main page",
    component: QuestionListView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/question/add",
    name: "add question",
    component: QuestionAddView,
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/question/submitStatus",
    name: "submission status",
    component: SubmissionListView,
    meta: {
      access: AccessEnum.USER,
    },
  },
  {
    path: "/question/manage",
    name: "manage question",
    component: QuestionManageView,
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/question/view/:id",
    name: "view question",
    component: QuestionAnswerView,
    props: true,
    meta: {
      access: AccessEnum.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
    meta: {
      access: AccessEnum.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];
