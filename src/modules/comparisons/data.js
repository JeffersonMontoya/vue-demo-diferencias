
export const differences = [
    {
      title: 'Templates (Vue) vs JSX (React)',
      desc: 'Vue usa plantillas HTML declarativas; React utiliza JSX para componer la interfaz.',
      code: `<template>
    <div>
      <h1>{{ message }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return { message: 'Hola desde Vue' }
    }
  }
  </script>`
    },
    {
      title: 'Reactividad (Vue) vs Hooks/State (React)',
      desc: 'Vue tiene un sistema de reactividad basado en proxies; React usa hooks como useState y useEffect.',
      code: `<script setup>
  import { ref } from 'vue'
  
  const count = ref(0)
  </script>
  
  <template>
    <button @click="count++">Clicks: {{ count }}</button>
  </template>`
    },
    {
      title: 'Framework vs Librería',
      desc: 'Vue es un framework completo con herramientas integradas (router, store, etc.), mientras React es solo una librería para la vista.',
      code: `<router-link to="/home">Ir a Home (ejemplo)</router-link>`
    },
    {
      title: 'SFCs y estilos locales',
      desc: 'Vue agrupa template, lógica y estilos en un solo archivo .vue (Single File Component).',
      code: `<style scoped>
  .title { color: teal; }
  </style>
  
  <template>
    <h2 class="title">Estilos locales en Vue</h2>
  </template>`
    }
  ]
  