<template>
  <div
    class="privacy-policy"
    v-html="html"
  >
  </div>
</template>

<script>
import { sendGetRequest } from "../../helpers";

export default {
  data() {
    return {
      html: null
    };
  },
  created() {
    sendGetRequest("/agreement/privacy-policy").then(({ data }) => {
      this.html = data;
    });
  }
};
</script>