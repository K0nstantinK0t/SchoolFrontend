<script setup>
import PageHeader from "@/components/PageHeader.vue";
import axios from 'axios'
import * as config from '@/config.js'
axios.get(config.classesURL)
  .then(function(response){
    console.log(response.data)
  })
</script>

<template>
  <PageHeader></PageHeader>
  <form>
    <label for="classes">Выберите класс</label>
    <select id="classes" name="classes">
      <option value="test">test</option>
    </select>
  </form>
</template>

<style scoped>

</style>