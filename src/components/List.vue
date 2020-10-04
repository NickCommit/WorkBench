<template>
  <div class="list">
    <div class="task-form">
      <div class="allLists">
        <div class="container-agenda-list">
          <div class="item-agenda-list">
            <div><b>Project Name</b></div>
            <div><b>Progress "0 to 10"</b></div>
            <div><b>Pomodoro used</b></div>
            <div><b>How important</b></div>
          </div>
          <div class="item-agenda-list mouse-on" v-for="item of list" :key="item[0]">
            <div>{{item[0]}}</div>
            <div>{{item[1]}}</div>
            <div>{{item[2]}}</div>
            <div>{{item[3]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['list'])
}
</script>

<style lang="scss">
  .allLists {
    width: 100%;
  }
  .mouse-on:hover {
    border: 1px solid rgb(51, 165, 95);
  }
  .item-agenda-list {
    div {
      padding: 5px;
      margin: 2px;
    }
    border: 1px solid transparent;
    margin: 2px;
    display: flex;
    justify-content: space-around;
  }
</style>
