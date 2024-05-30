<script setup>
import { reactive, ref } from 'vue'
const props= defineProps(['classID'])
import axios from 'axios'
import config from '@/config.js'

const teachers = reactive([])
const teacherID = ref('')

axios.get(config.teachersURL).then(function(response){
  for (const teacher of response.data) {
    teachers.push(teacher)
  }
})
function submitTeacherSelectionForm(emit){
  emit.preventDefault()
  axios.post(config.setClassTeacherURL(props.classID), {
    teacher_id: teacherID
  })
    .then(function(){
    })
}
</script>

<template>
  <form class="d-flex justify-content-center my-4" @submit="submitTeacherSelectionForm">
    <label for="classes" class="mx-2 h5">Назначить классного руковоителя: </label>
    <select id="classes" name="classes"  v-model='teacherID' v-if="teachers.length" >
      <option :value="teacher.id" v-for="teacher in teachers">{{teacher.name}}</option>
    </select>
    <input type="submit" class="btn btn-primary mt-2 mx-2" value="Назначить">
  </form>
</template>

<style scoped>

</style>