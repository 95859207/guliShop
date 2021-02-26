<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="giveMoney(500)">给BABA钱: 500</button>
  </div>
</template>

<script>
import myMixin from './myMixin'
export default {
  name: 'Son',
  mixins:[myMixin],
  data () {
    return {
      money: 30000
    }
  },

  // methods: {
  //   giveMoney(money){
  //     this.money -= money
  //     this.$parent.money += money
  //   }
  // }
}
</script>
