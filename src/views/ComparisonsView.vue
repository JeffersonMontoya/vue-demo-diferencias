<template>
  <div class="container">
    <h1 class="title">
      <span class="gradient-text">Diferencias entre Vue y React</span>
    </h1>

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
    return { differences };
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
.title {
  font-size: 2.3rem;
  font-weight: 900;
  margin-top: 20px;
  margin-bottom: 40px;
  letter-spacing: -0.6px;
  text-align: center;
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

@media (max-width: 1024px) {
  .cards {
    gap: 20px;
    max-width: 900px;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 1.8rem;
  }
  .cards {
    flex-direction: column;
    align-items: center;
    gap: 25px;
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
