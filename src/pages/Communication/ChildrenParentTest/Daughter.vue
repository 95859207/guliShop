<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="giveMoney(1000)">给BABA钱: 1000</button>
  </div>
</template>

<script>
import myMixin from './myMixin'
export default {
  name: 'Daughter',
  mixins:[myMixin],
  data () {
    return {
      money: 20000
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
