import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: { },
    list: { },
    projectName: '',
    dateNow: '',
    diff: '',
    comment: '',
    pomodoroActionTask: '',
    timer: 0,
    timerMode: true, // true => timer stopped false => timer goes
    pomodoroTimerInterval: 25, // in minutes
    breakTime: 5,
    pomodoroTime: 25
  },
  getters: {
    showTime: (state) => {
      const timer = state.timer
      const minutes = Math.floor(timer / 60)
      let seconds = (timer - (minutes * 60))
      if (seconds < 10) { seconds = `0${seconds.toString()}` }
      return [minutes, seconds]
    },
    isActive: (state) => {
      if (state.timer > 0 || state.timerMode === false) {
        return true
      } else {
        return false
      }
    },
    todayDone: (state) => {
      const arr = {
        today: [],
        lastProject: []
      }
      let id = 0
      for (const key in state.history) {
        if (state.history[key][0] > 15) {
          arr.today.push({ [id]: `+${state.history[key][0]} work time` })
          state.pomodoroActionTask === '' ? arr.lastProject.push({ [id]: '+1 Pomodor' }) : arr.lastProject.push({ [id]: state.history[key][1][0] })
        } else {
          arr.today.push({ [id]: `+${state.history[key][0]} resting` })
        }
        id += 1
      }
      return arr
    }
  },
  mutations: {
    updateprojectName (state, value) {
      state.projectName = value
    },
    updatediff (state, value) {
      state.diff = value
    },
    updatecomment (state, value) {
      state.comment = value
    },
    timeSave (state) {
      state.dateNow = new Date().toString().slice(0, 24)
    },
    addToList (state) {
      const property = Date.now()
      const id = state.dateNow
      const projectName = state.projectName
      const diff = state.diff
      const comment = state.comment
      state.list = { ...state.list, [property]: [projectName, 0, 0, diff, id, comment] }
      state.projectName = state.diff = state.dateNow = state.comment = ''
    },
    timer (state, zero) {
      if (zero === 0) {
        state.timer = 0
      } else { state.timer += 1 }
    },
    timerMode (state, mode) {
      if (mode === false) { state.timerMode = false }
      if (mode === true) { state.timerMode = true }
      if (mode === undefined) { state.timerMode = !state.timerMode }
    },
    historyUpdate (state, value) {
      const id = value.toString()
      const project = state.pomodoroActionTask
      const interval = state.pomodoroTimerInterval
      if (project !== '') {
        project[2] += 1
        state.history = { ...state.history, [id]: [interval, project] }
      } else {
        state.history = { ...state.history, [id]: [interval] }
      }
    },
    setPomodoroInterval (state) {
      state.pomodoroTimerInterval === state.pomodoroTime ? state.pomodoroTimerInterval = state.breakTime : state.pomodoroTimerInterval = state.pomodoroTime
    },
    setActionTask (state, item) {
      state.pomodoroActionTask = item
    }
  },
  actions: {
    timer (context) {
      const timer = setInterval(() => {
        if (context.state.timerMode === true) {
          clearInterval(timer)
        } else {
          context.commit('timer')
          if (context.getters.showTime[0] === context.state.pomodoroTimerInterval) { //  interval for timer DONE
            context.dispatch('intervalDone')
            context.dispatch('stopButton')
            clearInterval(timer)
          }
        }
      }, 1000)
    },
    startButton (context) {
      if (context.state.timer > 0 && context.state.timerMode === false) {
        return
      }
      context.commit('timerMode', false)
      context.dispatch('timer')
    },
    pauseButton (context) {
      context.commit('timerMode', true)
    },
    stopButton (context) {
      context.commit('timerMode', true)
      context.commit('timer', 0)
    },
    intervalDone (context) {
      const time = Date.now()
      context.commit('historyUpdate', time)
      context.commit('setPomodoroInterval')
    },
    actionTask (context, item) {
      context.commit('setActionTask', item)
    }
  },
  modules: {
  }
})
