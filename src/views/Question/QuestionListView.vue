<template>
  <div id="questionListView">
    <a-form :model="searchParams" :layout="'inline'">
      <a-form-item field="title" label="title">
        <a-input
          v-model="searchParams.title"
          placeholder="please enter title"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item field="tags" label="tags">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="please enter tags"
          style="min-width: 240px"
        />
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
        <template #tags="{ record }">
          <a-space wrap>
            <a-tag
              v-for="(tag, index) of record.tags"
              :key="index"
              color="green"
            >
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template #acceptedRate="{ record }">
          {{
            `${
              record.submitNum
                ? (record.acceptNum / record.submitNum) * 100
                : "0"
            }%(${record.acceptNum}/${record.submitNum})`
          }}
        </template>
        <template #createTime="{ record }">
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button type="primary" @click="toQuestionPage(record)"
              >try
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
import { onMounted, ref, watchEffect } from "vue";
import { QuestionControllerService, QuestionVO } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
// import * as querystring from "querystring";

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  console.log("result:");
  console.log(dataList);
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
    title: "question id",
    dataIndex: "id",
  },
  {
    title: "title",
    dataIndex: "title",
  },
  {
    title: "tags",
    slotName: "tags",
  },
  {
    title: "pass rate",
    slotName: "acceptedRate",
  },
  {
    title: "create Time",
    slotName: "createTime",
  },
  {
    slotName: "optional",
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
  loadData();
};
</script>

<style scoped>
#questionListView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
