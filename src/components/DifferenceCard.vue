<template>
  <div class="card">
    <h2 class="title">{{ title }}</h2>
    <p class="desc">{{ desc }}</p>
    <pre class="code-block"><code>{{ code }}</code></pre>
  </div>
</template>

<script>
export default {
  name: "DifferenceCard",
  props: {
    title: String,
    desc: String,
    code: String
  }
};
</script>

<style scoped>
.card {
  background: linear-gradient(145deg, #1b1b1b, #111);
  border-radius: 18px;
  padding: 24px;
  width: 260px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
  border: 1px solid #2a2a2a;
  transition: all 0.3s ease;
  color: #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 260px;
}

.card:hover {
  transform: translateY(-6px);
  border-color: #3b82f6;
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.3);
}

.title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #f3f4f6;
  margin-bottom: 8px;
}

.desc {
  color: #9ca3af;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 14px;
}

.code-block {
  background: #0d1117;
  color: #93c5fd;
  padding: 12px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  border: 1px solid #1e293b;
  overflow-x: hidden;
}
</style>
