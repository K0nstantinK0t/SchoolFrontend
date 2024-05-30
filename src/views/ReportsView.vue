<script setup>
import PageHeader from '@/components/PageHeader.vue'
import { reactive } from 'vue'
import config from '@/config.js'
import axios from 'axios'
const youngestStudentName = reactive([''])
function showYoungestStudent(emit){
  emit.preventDefault()
  axios.get(config.youngestStudentURL)
    .then(function(response){
      console.log(response.data[0])
      youngestStudentName.value =  response.data[0].surname
        + ' '
        + response.data[0].first_name
        + ' '
        +response.data[0].last_name

      console.log(youngestStudentName)
    })
}
</script>

<template>
  <page-header></page-header>
  <div class="container">
    <div class="row">
      <p>
      Самый младший первоклассник:
        <span v-if="youngestStudentName.length">
          {{youngestStudentName.value
           }}
        </span>
        <button class="btn btn-info" @click="showYoungestStudent">Показать</button>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>