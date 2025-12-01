<template>
  <div class="container">
    <div class="header">
      <h1 class="title">
        <!-- Titulo dinamico renderizado cxon mustache -->
        <span class="gradient-text">{{ title }}</span>
      </h1>
      <router-link to="/zip-file" class="zip-btn">
        🚀 Ir al Gestor ZIP
      </router-link>
    </div>

    <div class="cards">
      <DifferenceCard
        v-for="(item, index) in differences"
        :key="index"
        :title="item.title"
        :desc="item.desc"
        :code="item.code"
      />
    </div>
  </div>
</template>

<script>
import { differences } from "../modules/comparisons/data";
import DifferenceCard from "../components/DifferenceCard.vue";

export default {
  name: "ComparisonsView",
  components: { DifferenceCard },
  data() {
    return {
      // Datos importados para generar las tarjetas del comparativo
      differences,
      // Texto del encabezado renderizado mediante interpolación {{ }}
      title: "Diferencias entre Vue y React",
    };
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(160deg, #0d0d0d, #1a1a1a);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 20px 60px;
  color: #e5e7eb;
  overflow: hidden;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 2.3rem;
  font-weight: 900;
  margin-bottom: 20px;
  letter-spacing: -0.6px;
}

.zip-btn {
  display: inline-block;
  padding: 14px 26px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  color: white;

  background: linear-gradient(90deg, #2563eb, #4f46e5);
  box-shadow: 0px 4px 14px rgba(79, 70, 229, 0.4);

  transition: all 0.25s ease-in-out;
  cursor: pointer;
}

.zip-btn:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0px 6px 18px rgba(79, 70, 229, 0.6);
}

.cards {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 30px;
  flex-wrap: wrap;
  max-width: 1200px;
}

.gradient-text {
  background: linear-gradient(90deg, #60a5fa, #818cf8, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 30px 15px;
  }
  .title {
    font-size: 1.5rem;
  }
}
</style>
