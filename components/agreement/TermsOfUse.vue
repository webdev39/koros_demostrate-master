<template>
  <div
    class="terms-of-use"
    v-html="html"
  ></div>
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
    sendGetRequest('/agreement/terms-of-use').then(({ data }) => {
      this.html = data;
    });
  }
};
</script>