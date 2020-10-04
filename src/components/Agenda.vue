<template>
  <div class="agendaWorld">
      <button class="button-agenda" @click="factoryForm">{{ButtonText}}</button>
      <newtask v-if="FormActive"></newtask>
  </div>
</template>

<script>

import newtask from '@/components/newtask.vue'
import Vue from 'vue'

Vue.component('newtask', newtask)

export default {
  data: function () {
    return {
      ButtonText: 'Create challenge',
      FormActive: false
    }
  },
  component: newtask,
  methods: {
    factoryForm: function () {
      this.FormActive = !this.FormActive
      if (this.FormActive === true) {
        this.ButtonText = '[X]  Close'
      } else {
        this.ButtonText = 'Create challenge'
      }
    }
  }
}
</script>

<style lang="scss">
  .button-agenda {
    width: 150px;
  }
</style>
