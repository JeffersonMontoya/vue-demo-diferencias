<template>
  <div>
    <ComparisonsView />
  </div>
</template>

<script>
import ComparisonsView from './views/ComparisonsView.vue'

export default {
  name: 'App',
  components: {
    ComparisonsView
  }
}
</script>

<style>
body {
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 50%, #9ca3af 100%);
  font-family: 'Inter', system-ui, sans-serif;
  color: #1f2937;
  margin: 0;
  padding: 0;
}


</style>
