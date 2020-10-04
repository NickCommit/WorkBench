<template>
  <div class="task-form">
    <div class="tasks">
        <div class="header-newtask">
            <h2 class="select-none">New task</h2>
        </div>
        <form action="">
            <div class="container-margin">
              <span class="select-none">Name edit ( </span>
              <input v-model="projectName" type="text" maxlength="23">
              <span class="select-none"> )</span>
            </div>
            <div class="container-margin">
              <span>Difficulty </span>
              <select name="select" v-model="diff" id="importamtId">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div class="container-margin">
            <span>Comments Here...</span>
            <input class="comment-text" type="text" v-model="comment">
            </div>
        </form>
    </div>
    <div class="info">
        <div class="header-newtask">
            <h2 class="select-none">Info</h2>
        </div>
        <p class="select-none">Creating Date/Time</p>
        <input class="select-none" v-model="dateNow" type="text" readonly>
        <button class="create-button" @click="submit">Create "{{projectName}}"</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  created: function () {
    this.$store.commit('timeSave')
  },
  methods: {
    submit () {
      this.$store.commit('addToList')
    }
  },
  computed: {
    projectName: {
      get () {
        return this.$store.state.projectName
      },
      set (value) {
        this.$store.commit('updateprojectName', value)
      }
    },
    diff: {
      get () {
        return this.$store.state.diff
      },
      set (value) {
        this.$store.commit('updatediff', value)
      }
    },
    comment: {
      get () {
        return this.$store.state.comment
      },
      set (value) {
        this.$store.commit('updatecomment', value)
      }
    },
    ...mapState(['dateNow'])
  }
}
</script>

<style>
.container-margin {
  margin-top: 15px;
}
.tasks {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.info {
    flex-grow: 1;
    position: relative;
}
.task-form {
    margin: auto;
    height: 600px;
    width: 800px;
    background-color: black;
    opacity: 0.7;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
}
.header-newtask {
    height: 80px;
}
.create-button {
    width: 200px;
    height: 40px;
    position: absolute;
    bottom: 30px;
    left: 56px;
}
.select-none {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;
}
input {
    width: 220px;
    height: 26px;
    border-radius: 5px;
    border: none;
    background-color: transparent;
    color: white;
    font-size: 18px;
}
h2 {
    line-height: 64px;
}
p {
    padding-top: 10px;
}
.comment-text {
  background-color: rgb(20, 53, 42);
}
</style>
