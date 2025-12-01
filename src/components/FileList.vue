<template>
  <div class="zip-list-container">
    <h2 class="list-title">Archivos Descomprimidos ({{ files.length }})</h2>
    <div class="zip-list">
      <p v-if="files.length === 0" class="empty-text">No hay archivos aún.</p>
      <div v-else class="file-item-list">
        <div
          v-for="file in files"
          :key="file.id"
          @click="handleFileClick(file)"
          :class="['file-item', selectedFile === file ? 'active' : '']"
        >
          <!-- Si el archivo actual coincide con el seleccionado, se añade la clase 'active' 
  para resaltar visualmente el ítem. -->
          <span class="file-icon">📄</span>
          <div class="file-details">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">{{ formatBytes(file.size) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Variable reactiva que almacena el archivo seleccionado.
const selectedFile = ref(null);

const props = defineProps({
  files: {
    type: Array,
    required: true,
  },
  formatBytes: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["file-click"]);

const handleFileClick = (file) => {
  // Asigna el archivo clickeado a la variable reactiva.
  // Esto activa la reactividad y actualiza la clase 'active' en el template.
  selectedFile.value = file;
  emit("file-click", file);
};
</script>

<style scoped>
.zip-list-container {
  width: 100%;
  max-width: 600px;
  margin-top: 40px;
}

.list-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #e5e7eb;
}

.zip-list {
  background: #141414;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 4px 14px rgba(79, 70, 229, 0.25);
}

.empty-text {
  text-align: center;
  color: #9ca3af;
}

.file-item-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #1f1f1f;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.file-item:hover {
  background: #252525;
  border-color: #4f46e5;
  transform: translateX(5px);
}

.file-icon {
  font-size: 1.5rem;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.file-name {
  color: #e5e7eb;
  font-weight: 500;
}

.file-size {
  color: #9ca3af;
  font-size: 0.85rem;
}

.active {
  border-color: #4f46e5;
  background: #2d2d2d;
}
</style>
