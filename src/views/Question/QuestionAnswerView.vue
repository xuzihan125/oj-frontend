<template>
  <div id="questionAnswerView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs>
          <a-tab-pane key="question" title="question">
            <a-card v-if="question" :title="question.title">
              <a-typography-title :heading="5"> Problem</a-typography-title>
              <MdViewer :value="question.content" />
              <a-descriptions
                title="Judge Condition"
                :column="{ xs: 1, md: 2 }"
              >
                <a-descriptions-item label="Time Limit">
                  <a-tag>{{ question.judgeConfig.timeLimit }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="Memory Limit">
                  <a-tag>{{ question.judgeConfig.memoryLimit }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="Stack Limit">
                  <a-tag>{{ question.judgeConfig.stackLimit }}</a-tag>
                </a-descriptions-item>
              </a-descriptions>
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="comment" disabled>
            comment unavailable
          </a-tab-pane>
          <a-tab-pane key="answer" title="answer" disabled>
            Question unavailable
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="searchParams" :layout="'inline'">
          <a-form-item field="title" label="language">
            <a-select
              v-model="form.language"
              placeholder="please select your language"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <MonacoED
          :value="form.code"
          :handle-change="onChange"
          :language="form.language"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">
          submit code
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  QuestionControllerService,
  QuestionVO,
  SolutionSubmitAddRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import MonacoED from "@/components/MonacoED.vue";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: string;
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const question = ref<QuestionVO>();

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
    console.log("question");
    console.log(question);
  } else {
    message.error("loading fail: " + res.message);
  }
};

onMounted(() => {
  loadData();
});

const form = ref<SolutionSubmitAddRequest>({
  language: "java",
  code: "",
});
const onChange = (code: string) => {
  form.value.code = code;
};

const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doSolutionSubmitUsingPost({
    ...form.value,
    questionId: question.value?.id,
  });
  if (res.code === 0) {
    message.success("submit success");
  } else {
    message.error("submit fail: " + res.message);
  }
};
</script>

<style>
#questionAnswerView {
}

#questionAnswerView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
