<script setup xmlns="http://www.w3.org/1999/html">
import PageHeader from "@/components/PageHeader.vue";
import axios from 'axios'
import config from '@/config.js'
import {reactive, ref} from "vue";

const classes = reactive([])
const students = reactive([])
const teacher = reactive([])
const classID = ref('')
const className = ref('')
axios.get(config.classesURL).then(function(response){
  for (const schoolClass of response.data) {
    classes.push(schoolClass)
  }
})
function submitClassSelectionForm(emit) {
  emit.preventDefault()
  console.log(classID.value)
  axios.get(config.classesURL+'/'+classID.value+'/withStudentsAndTeachers')
      .then(function (response){
        for (const student of response.data.students) {
          students.push(student)
        }

        teacher.value=response.data.teacher
        console.log(teacher.value)
        className.value=response.data.name
      })
}
</script>

<template>
  <PageHeader></PageHeader>
  <form class="d-flex justify-content-center my-4" @submit="submitClassSelectionForm">
    <label for="classes" class="mx-2">Выберите класс</label>
    <select id="classes" name="classes"  v-model='classID' v-if="classes.length" >
      <option :value="schoolClass.id" v-for="schoolClass in classes">{{schoolClass.name}}</option>
    </select>
    <input type="submit" class="btn btn-primary mt-2 mx-2" value="Отобразить список класса">
  </form>
  <h3 class="text-center">Ученики {{className}}</h3>
  <h5 class="text-center" v-if="teacher.value.name">Классный руководитель - {{teacher.value.name}}</h5>
  <section v-if="students.length" class="container">
    <table class="my-4 table table-striped">
      <tr>
        <th>
          Фамилия
        </th>
        <th>
          Имя
        </th>
        <th>
          Отчество
        </th>
        <th>
          День рождения
        </th>
      </tr>
      <tr v-for="student in students">
        <td>
          {{student.surname}}
        </td>
        <td>
          {{student.first_name}}
        </td>
        <td>
          {{student.last_name}}
        </td>
        <td>
          {{student.birthday}}
        </td>
      </tr>
    </table>
  </section>
</template>

<style scoped>

</style>