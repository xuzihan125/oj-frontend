<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 600px"></div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, defineProps, watch } from "vue";

// import { languages } from "monaco-editor";

interface Props {
  value: string;
  language: string;
  handleChange: (v: string) => void;
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log("MonacoED" + v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();
// const value = ref("hello world");

//to do: correct the update of choose language
watch(
  () => [props.language],
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    lineNumbers: "off",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
  });

  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped>
/* 根据需要添加样式 */
</style>
