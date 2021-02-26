<template>
  <div>
    <h2>深入v-model</h2>

    <input type="text" v-model="msg">
    <span>好啊{{msg}}</span>
    <br>

    <CustomInput></CustomInput>


  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    components: {
      CustomInput
    },
    data(){
      return {
        msg:'你好啊啊啊啊啊'
      }
    }
  }
</script>
