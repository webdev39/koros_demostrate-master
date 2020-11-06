<template>
  <router-view />
</template>

<script>
export default {
  created() {
    document.querySelector(".app").className = "app";
  }
};
</script>