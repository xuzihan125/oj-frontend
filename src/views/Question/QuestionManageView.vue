<template>
  <div id="questionManageView">
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
        <template #optional="{ record }">
          <a-space>
            <a-button type="primary" @click="doUpdate(record)">edit</a-button>
            <a-button status="danger" @click="doDelete(record)"
              >delete
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
import {
  QuestionAdminVO,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import * as querystring from "querystring";

const show = ref(true);
const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res =
    await QuestionControllerService.listQuestionAdminVoByPageUsingPost(
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
    title: "question id",
    dataIndex: "id",
  },
  {
    title: "title",
    dataIndex: "title",
  },
  {
    title: "tags",
    dataIndex: "tags",
  },
  {
    title: "question description",
    dataIndex: "content",
  },
  {
    title: "question answer",
    dataIndex: "answer",
  },
  {
    title: "submit number",
    dataIndex: "submitNum",
  },
  {
    title: "accept number",
    dataIndex: "acceptNum",
  },
  {
    title: "judge case",
    dataIndex: "judgeCase",
  },
  {
    title: "judge config",
    dataIndex: "judgeConfig",
  },
  {
    title: "like Number",
    dataIndex: "likeNum",
  },
  {
    title: "favour Number",
    dataIndex: "favourNum",
  },
  {
    title: "Id of creator",
    dataIndex: "userId",
  },
  {
    title: "create Time",
    dataIndex: "createTime",
  },
  {
    title: "last update Time",
    dataIndex: "updateTime",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];

const doDelete = async (record: QuestionAdminVO) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: record.id,
  });
  if (res.code === 0) {
    message.success("deletion complete");
    loadData();
  } else {
    message.error("deletion fail: " + res.message);
  }
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();
const doUpdate = (record: QuestionAdminVO) => {
  router.push({
    path: "/question/add",
    query: {
      id: record.id,
    },
  });
};
</script>

<style scoped>
#questionManageView {
}
</style>
