<script setup>
import {useRouter} from "vue-router";
import store from "@/store.js";
const router = useRouter()

</script>

<template>
  <header>
        <nav class="container">
          <button type="button" class="btn btn-light col-4 border border-1"
                  @click="router.push({ name: 'classes' })">
            Классы
          </button>
          <button type="button" class="btn btn-light col-4 border border-1"
                  @click="router.push({ name: 'reports' })">
            Отчёты
          </button>
<!--          <button type="button" class="btn btn-light col-4 border border-1"-->
<!--                  @click="router.push({ name: 'login' })" v-if="store.role!=='admin'">-->
<!--            Войти-->
<!--          </button>-->
          <button type="button" class="btn btn-light col-4 border border-1"
                  @click="router.push({ name: 'adminPanel' })">
            Панель аминистратора
          </button>
        </nav>
  </header>
</template>

<style scoped>

</style>