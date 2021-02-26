<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
    <el-button type="success" icon="el-icon-edit" size="mini"></el-button> -->


    <!-- <HintButton xxx="123" :yyy="'abc'" @heihei="test"></HintButton> -->
    <HintButton type="primary" icon="el-icon-plus" size="mini" title="添加"></HintButton>
    <HintButton type="danger" icon="el-icon-delete" size="mini" title="修改"></HintButton>
    <HintButton type="success" icon="el-icon-edit" size="mini" title="删除"></HintButton>
  </div>
</template>
<script type="text/ecmascript-6">
  import HintButton from '@/pages/Communication/AttrsListenersTest/HintButton'

  export default {
    name: 'AttrsListenersTest',
    
    components:{
      HintButton
    },
    methods: {
      test(){

      }
    },
  }
</script>
