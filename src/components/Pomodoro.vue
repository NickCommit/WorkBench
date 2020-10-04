<template>
  <keep-alive>
  <div class="task-form pomodoro-timer">
    <div class="list-task" :class="{nonactive: isActive}">
      <div class="control-panel">Control Panel
      </div>
      <div class="project-name-list">
        <div @click="actionTask(item)" v-for="item of list" :key="item[0]">{{item[0]}}</div>
      </div>
    </div>
    <div class="pomodoro-container">
      <div class="pomodoro">
        <div class="current-task-name">Current task is &#10144; {{pomodoroActionTask[0]}}</div>
        <div class="pomodoro-clock">
          <span>{{showTime[0]}}:{{showTime[1]}}</span>
          <span>next tick is {{pomodoroTimerInterval}} min</span>
          <br>
          <button v-if="timerMode" @click="startButton">Start</button>
          <button v-if="!timerMode" @click="pauseButton">Pause</button>
          <button @click="stopButton">Stop</button>
        </div>
      </div>
      <div class="pomodoro-stats">
        <div>
          <span>Today done</span>
          <br><br>
          <span v-for="(val, key) in todayDone.today" :key="key">{{val[key]}}<br></span>
        </div>
        <div>
          <span>Last projects</span>
          <br><br>
          <span v-for="(val, key) in todayDone.lastProject" :key="key">{{val[key]}}</span>
        </div>
        <div>History</div>
      </div>
    </div>
  </div>
  </keep-alive>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['list', 'timerMode', 'pomodoroActionTask', 'pomodoroTimerInterval']),
    ...mapGetters(['todayDone', 'showTime', 'isActive'])
  }, // isActive return true/false
  methods: {
    startButton () {
      this.$store.dispatch('startButton')
    },
    stopButton () {
      this.$store.dispatch('stopButton')
    },
    pauseButton () {
      this.$store.dispatch('pauseButton')
    },
    actionTask (item) {
      this.$store.dispatch('actionTask', item)
    }
  }
}
</script>

<style lang="scss">
.nonactive {
  pointer-events: none;
  opacity: 0.5;
}
.pomodoro-stats {
  min-height: 30%;
  display: flex;
  justify-content: space-around;
  div {
    width: 33%;
  }
}
.pomodoro-timer {
  display: flex;
}
.list-task {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.2em;
  font-family: 'Roboto Slab', serif;
  width: 30%;
  overflow: hidden;
  transition: 500ms;
}
.pomodoro-container {
  position: relative;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.control-panel {
  margin: 10px;
}
.project-name-list {
  height: 100%;
  border: 1px solid rgb(132, 218, 93);
  border-radius: 10px;
  overflow: hidden;
  div:hover {
    background-color: rgba(52, 75, 10, 0.5);
    cursor: pointer;
  }
}
.pomodoro-clock {
  margin-top: 40px;
  :nth-child(1) {
    font-size: 64px;
    line-height: 70px;
  }
  :nth-child(2) {
    position: absolute;
    right: 50px;
    color: rgba(117, 151, 113, 0.514);
  }
  button {
    transition: 300ms;
    margin: 5px;
    border-radius: 100%;
    border: 1px solid red;
    background-color: transparent;
    color: aliceblue;
    height: 5em;
    width: 5em;
    font-size: 24px;
    outline:none;
    &:hover {
      background-color: rgba(117, 151, 113, 0.514);
      cursor: pointer;
    }
  }
}
.current-task-name {
  margin: 10px;
  text-align: left;
  font-size: 1.2em;
  font-family: 'Roboto Slab', serif;
}
</style>
