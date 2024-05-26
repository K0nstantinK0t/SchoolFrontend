<script setup>
import PageHeader from "@/components/PageHeader.vue";
import axios from 'axios'
import config from '@/config.js'
import {reactive} from "vue";

const classes = reactive([])

axios.get(config.classesURL).then(function(response){
  for (const schoolClass of response.data) {
    classes.push(schoolClass)
  }
  console.log(classes)
})
</script>

<template>
  <PageHeader></PageHeader>
  <form>
    <label for="classes">Выберите класс</label>
    <select id="classes" name="classes"  v-if="classes.length" >
      <option :value="schoolClass.name" v-for="schoolClass in classes">{{schoolClass.name}}</option>
    </select>
  </form>
</template>

<style scoped>

</style>