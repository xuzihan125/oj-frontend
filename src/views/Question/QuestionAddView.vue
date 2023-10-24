<template>
  <div id="addQuestionView">
    <h2>problem creation</h2>
    <a-form :model="form" label-align="left">
      <a-form-item field="answer" label="Answer">
        <MdEditor :value="form.answer" :handle-change="changeAnswer" />
      </a-form-item>
      <a-form-item field="content" label="Content">
        <MdEditor :value="form.content" :handle-change="changeContent" />
      </a-form-item>
      <a-form-item field="title" label="Title">
        <a-input v-model="form.title" placeholder="please enter title" />
      </a-form-item>
      <a-form-item field="label" label="Label">
        <a-input-tag
          v-model="form.tags"
          placeholder="please enter tags"
          allow-clear
        ></a-input-tag>
      </a-form-item>
      <a-form-item
        label="judge case"
        :content-flex="false"
        :merge-props="false"
      >
        <a-space direction="vertical">
          <a-form-item
            v-for="(judgeCase, index) of form.judgeCase"
            :field="`judgeCase[${index}].value`"
            :key="index"
            :hide-label="true"
          >
            <a-space direction="vertical" style="min-width: 900px">
              <a-form-item
                :label="`judge case ${index} input`"
                :field="`judgeCase[${index}].value.input`"
              >
                <a-input
                  v-model="judgeCase.input"
                  placeholder="please enter input"
                />
              </a-form-item>
              <a-form-item
                :label="`judge case ${index} output`"
                :field="`judgeCase[${index}].value.output`"
              >
                <a-input
                  v-model="judgeCase.output"
                  placeholder="please enter output"
                />
              </a-form-item>
              <a-button @click="handleDelete(index)" status="danger"
                >delete
              </a-button>
            </a-space>
          </a-form-item>
        </a-space>
      </a-form-item>
      <div :style="{ maxWidth: '150px', margin: '0px auto 30px auto' }">
        <a-button @click="handleAdd" type="outline" status="success"
          >Add Test Case
        </a-button>
      </div>
      <a-form-item
        label="judge config"
        :content-flex="false"
        :merge-props="false"
      >
        <a-space direction="vertical" style="min-width: 600px">
          <a-form-item field="judgeConfig.timeLimit" label="time limit">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="Please Enter time limit"
              mode="button"
              size="large"
              min="0"
              :ref="test"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="memory limit">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="Please Enter memory limit"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="stack limit">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="Please Enter stack limit"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSubmit" html-type="submit"
              >Submit
            </a-button>
          </a-form-item>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  QuestionAddRequest,
  QuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const route = useRoute();
const updatePage = route.path.includes("update");
const test = ref();
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionAdminVoByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    console.log("data");
    console.log(form.value);
    console.log(test);
  } else {
    message.error("load fail: " + res.message);
  }
};

onMounted(() => {
  loadData();
});

const form = ref({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 0,
    stackLimit: 0,
    timeLimit: 0,
  },
  tags: [],
  title: "",
});

const handleAdd = () => {
  form.value.judgeCase?.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judgeCase?.splice(index, 1);
};

const changeContent = (v: string) => {
  form.value.content = v;
};

const changeAnswer = (v: string) => {
  form.value.answer = v;
};

const handleSubmit = async () => {
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("Question successfully updated");
    } else {
      message.error("Question update failed: " + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("Question successfully created");
    } else {
      message.error("Question creation failed: " + res.message);
    }
  }
};
</script>

<style scoped>
#addQuestionView {
}
</style>
