<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMounyFromXM(100)">找小明借钱100</button><br>
    <button @click="borrowMounyFromXH(150)">找小红借钱150</button><br>
    <button @click="borrowMounyFromALL(200)">找所有孩子借钱200</button><br>
    
    <br>
    <Son  ref="son"/>

    <br>
    <Daughter ref="dau"/>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },

  methods: {
      borrowMounyFromXM(money){
        this.money += money
        //小明-100
        this.$refs.son.money -= money
      },
      borrowMounyFromXH(money){
        this.money += money
        //小红-100
        this.$refs.dau.money -= money
      },
      borrowMounyFromALL(money){
        this.money += money * 2
        //小明小红都  -200
        this.$children.forEach(item => item.money -= money)
      }
  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
