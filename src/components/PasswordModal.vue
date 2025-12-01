<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <h3 class="modal-title">🔒 Ingrese la contraseña</h3>
      <p class="modal-subtitle">
        Archivo: <strong>{{ selectedFile?.name }}</strong>
      </p>
      <p v-if="showPasswordHint" class="modal-hint">
        💡 Pista: La contraseña es el nombre del archivo
      </p>

      <input
        ref="passwordInputRef"
        v-model="passwordValue"
        type="password"
        placeholder="Contraseña"
        class="modal-input"
        @keyup.enter="handleDownload"
      />

      <p v-if="error" class="error-msg">{{ error }}</p>

      <div class="modal-actions">
        <button @click="handleClose" class="btn-cancel">Cancelar</button>
        <button
          @click="handleDownload"
          :disabled="isDownloadButtonDisabled"
          class="btn-download"
        >
          {{ downloading ? "Descargando..." : "Descargar" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const isDownloadButtonDisabled = computed(() => {
  // El botón está deshabilitado si:
  // 1. Está en proceso de descarga (props.downloading es true).
  // 2. El campo de la contraseña está vacío (passwordValue está vacío).
  return props.downloading || !passwordValue.value;
});

const showPasswordHint = computed(() => {
  // Muestra la pista solo si el campo de la contraseña está vacío.
  // Cuando passwordValue.value tiene texto, se convierte en false (ocultando la pista).
  return !passwordValue.value;
});

const props = defineProps({
  show: Boolean,
  selectedFile: Object,
  password: String,
  downloading: Boolean,
  error: String,
});

const emit = defineEmits(["update:password", "close", "download"]);

const passwordInputRef = ref(null);
const passwordValue = ref("");

watch(
  () => props.password,
  (newVal) => {
    passwordValue.value = newVal;
  }
);

watch(passwordValue, (newVal) => {
  emit("update:password", newVal);
});

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        passwordInputRef.value?.focus();
      }, 100);
    }
  }
);

const handleClose = () => {
  emit("close");
};

const handleDownload = () => {
  emit("download");
};

defineExpose({
  passwordInputRef,
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0px 10px 30px rgba(79, 70, 229, 0.5);
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #e5e7eb;
}

.modal-subtitle {
  font-size: 0.9rem;
  color: #9ca3af;
  margin-bottom: 8px;
}

.modal-hint {
  font-size: 0.85rem;
  color: #fbbf24;
  margin-bottom: 20px;
  padding: 8px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 6px;
}

.modal-input {
  width: 100%;
  padding: 12px;
  background: #0d0d0d;
  border: 1px solid #2d2d2d;
  border-radius: 10px;
  color: #e5e7eb;
  font-size: 1rem;
  margin-bottom: 20px;
}

.modal-input:focus {
  outline: none;
  border-color: #4f46e5;
}

.error-msg {
  color: #ef4444;
  font-size: 0.9rem;
  padding: 10px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  border-left: 3px solid #ef4444;
  margin-bottom: 15px;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.btn-cancel,
.btn-download {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-cancel {
  background: #2d2d2d;
  color: #e5e7eb;
}

.btn-cancel:hover {
  background: #3a3a3a;
}

.btn-download {
  background: linear-gradient(90deg, #2563eb, #4f46e5);
  color: white;
}

.btn-download:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0px 4px 14px rgba(79, 70, 229, 0.6);
}

.btn-download:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
