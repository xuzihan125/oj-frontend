<template>
  <div id="submissionListView">
    <a-form :model="searchParams" :layout="'inline'">
      <a-form-item field="question id" label="title">
        <a-input
          v-model="searchParams.questionId"
          placeholder="please enter question id"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item field="title" label="language">
        <a-select
          v-model="searchParams.language"
          placeholder="please select your language"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>not select</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">search</a-button>
      </a-form-item>
    </a-form>
    <a-config-provider :locale="enUS">
      <a-table
        :ref="tableRef"
        :columns="columns"
        :data="dataList"
        :pagination="{
          showTotal: true,
          showJumper: true,
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total,
          lang: `en`,
        }"
        @page-change="onPageChange"
      >
        <template #judgeInfo="{ record }">
          {{ JSON.stringify(record.judgeInfo) }}
        </template>
        <template #createTime="{ record }">
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </template>
        <template #updateTime="{ record }">
          {{ moment(record.updateTime).format("YYYY-MM-DD") }}
        </template>
      </a-table>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
//todo reload page every 20 second?
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionVO,
  SolutionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
// import * as querystring from "querystring";

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<SolutionSubmitQueryRequest>({
  language: undefined,
  questionId: undefined,
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res =
    await QuestionControllerService.listSolutionSubmitVoByPageUsingPost(
      searchParams.value
    );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("loading fail: " + res.message);
  }
};

watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "solution id",
    dataIndex: "id",
  },
  {
    title: "language",
    dataIndex: "language",
  },
  {
    title: "questionId",
    dataIndex: "questionId",
  },
  {
    title: "status",
    dataIndex: "status",
  },
  {
    title: "judge info",
    slotName: "judgeInfo",
  },
  {
    title: "create time",
    slotName: "createTime",
  },
  {
    title: "update time",
    slotName: "updateTime",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();
const toQuestionPage = (question: QuestionVO) => {
  console.log(question.id);
  router.push({
    path: `/question/view/${question.id}`,
  });
};

const doSubmit = () => {
  searchParams.value.current = 1;
  if (searchParams.value.language === "not select") {
    searchParams.value.language = undefined;
  }
  loadData();
};
</script>

<style scoped>
#submissionListView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
