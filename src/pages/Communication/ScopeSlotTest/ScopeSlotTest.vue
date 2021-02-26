<template>
  <div>
    <Child>
      <template>
        <p>23333 </p>
      </template>
    </Child>

    <Child>
      <template>
        <button>2332323</button>
      </template>
    </Child>





    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <!-- <List :todos="todos">
      <template slot-scope="scopeProps">
          <h2 :style="{color:scopeProps.todo.isComplete? 'green' : 'black'}">{{scopeProps.todo.text}}</h2>
      </template>
    </List> -->
    <hr>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :todos="todos">
      <template slot-scope="{todo,index}">
        <h2 :style="{color:index % 2 === 0 ? 'blue' : 'green'}"><span>{{index+1}}</span>{{todo.text}}</h2>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child'
  import List from './List'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: true},
        ]
      }
    },

    components: {
      List,
        Child
    }
  }
</script>
