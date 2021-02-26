<template>
    <a href="javascript:;" :title="title" style="margin-right:15px">
      <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
</template>

<script>
export default {
  props: ["title"],

  mounted() {
    console.log(this.$attrs, this.$listeners);
  },
};
</script>

<style lang="less" scoped>
</style>