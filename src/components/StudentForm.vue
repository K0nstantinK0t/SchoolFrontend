<script setup>
import {reactive, ref} from 'vue'
import axios from 'axios'
import config from '@/config.js'


const classes = reactive([])
const errors = reactive([])
const surname = ref('')
const firstName = ref('')
const lastName = ref('')
const birthday = ref('')
const schoolClass = ref('')
const classID = ref('')
const status = ref('')

axios.get(config.classesURL).then(function(response){
  for (const schoolClass of response.data) {
    classes.push(schoolClass)
  }
})

function submitAddStudentForm(emit){
  emit.preventDefault();
  errors.length = 0
  if ((surname.value !== '') &&
     (firstName.value !== '')  &&
      (lastName.value !== '') &&
      birthday.value !== '' &&
      classID.value !== '') {
    axios.post(config.createStudentURL, {
      first_name: firstName.value,
      last_name: lastName.value,
      surname: surname.value,
      birthday: birthday.value,
      school_class_id: classID.value,
    }).catch((error) => {
      for (const i in error.response.data.errors)
        errors.push(error.response.data.errors[i][0])
      return false
    }).then(function () {
      status.value='success'
    })
  } else {
    {
      errors.push("Все поля должны быть заполнены")
      console.log(surname.value, firstName.value , lastName.value
          , birthday.value, schoolClass.value, classID.value)
    }
  }
}
</script>

<template>
  <form class="container" @submit="submitAddStudentForm">
    <h1 >Добавить ученика</h1>
    <div class="alert alert-danger" role="alert" v-if="errors.length">
      <p v-for="error in errors">
        {{ error }}
      </p>
    </div>
     <div class="alert alert-success" role="alert" v-if="status.length">
        <p>
          Ученик был добавлен в систему
        </p>
    </div>
    <div class="row">
      <label for="surname">Фамилия</label>
      <input type="text" name="surname" v-model="surname">
    </div>
    <div class="row">
      <label for="first_name">Имя</label>
      <input type="text" name="first_name" v-model="firstName">
    </div>
    <div class="row">
      <label for="last_name">Отчество</label>
      <input type="text" name="first_name" v-model="lastName">
    </div>
    <div class="row">
      <label for="birthday">Дата рождения</label>
      <input type="date" name="birthday" v-model="birthday">
    </div>
    <div class="row">
      <label for="classes">Класс обучения</label>
      <select  name="classes"  v-model='classID' v-if="classes.length" >
        <option :value="schoolClass.id" v-for="schoolClass in classes">{{schoolClass.name}}</option>
      </select>
    </div>
    <input type="submit" value="Добавиить ученика" class="button">
  </form>
</template>

<style scoped>

</style>