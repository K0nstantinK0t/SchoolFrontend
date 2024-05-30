<script setup>
import PageHeader from "@/components/PageHeader.vue";
import axios from 'axios'
import config from '@/config.js'
import {reactive, ref} from "vue";
import StudentForm from "@/components/StudentForm.vue";
import TeacherForm from '@/components/TeacherForm.vue'

const classes = reactive([])
const students = ref([])
const teacher = reactive([])
const classID = ref('')
const className = ref('')

axios.get(config.classesURL).then(function(response){
  for (const schoolClass of response.data) {
    classes.push(schoolClass)
  }
})
function submitClassSelectionForm(emit) {
  if(emit)
    emit.preventDefault()
  console.log(classID.value)
  axios.get(config.classesURL+'/'+classID.value+'/withStudentsAndTeachers')
      .then(function (response){
        students.value=[]
        for (const student of response.data.students) {
          students.value.push(student)
        }

        teacher.value=response.data.teacher
        console.log(teacher.value)
        className.value=response.data.name
      })
}
function removeStudent(id){
  if(confirm('Вы точно хотите удалить запись ученика?'))
  axios.post(config.removeStudent(id))
    .then(function(){
      submitClassSelectionForm()
    })
}
</script>

<template>
  <page-header></page-header>
  <form class="d-flex justify-content-center my-4" @submit="submitClassSelectionForm">
    <label for="classes" class="mx-2">Выберите класс</label>
    <select id="classes" name="classes"  v-model='classID' v-if="classes.length" >
      <option :value="schoolClass.id" v-for="schoolClass in classes">{{schoolClass.name}}</option>
    </select>
    <input type="submit" class="btn btn-primary mt-2 mx-2" value="Отобразить список класса">
  </form>
  <h3 class="text-center" v-if="students.length">Ученики {{className}}</h3>
  <h5 class="text-center" v-if="teacher.value">Классный руководитель - {{teacher.value.name}}</h5>
  <TeacherForm :classID="classID" v-if="students.length"></TeacherForm>
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
        <td>
          <button type="button" class="btn btn-danger" @click="removeStudent(student.id)">Удалить</button>
        </td>
      </tr>
    </table>
  </section>
  <StudentForm></StudentForm>
</template>

<style scoped>

</style>