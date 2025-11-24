<template>
    <div class="zip-card">
      <div class="zip-card-content">
        <div class="field">
          <label class="label">Seleccionar ZIP</label>
          <input
            ref="fileInputRef"
            type="file"
            accept=".zip"
            @change="handleFileChange"
            class="input-file"
          />
        </div>
  
        <p v-if="selectedFile" class="file-info">
          Archivo seleccionado: {{ selectedFile.name }}
        </p>
  
        <button 
          @click="handleUploadClick" 
          :disabled="!selectedFile || uploading"
          class="btn-upload"
        >
          {{ uploading ? 'Subiendo y descomprimiendo...' : 'Subir Archivo' }}
        </button>
  
        <p v-if="uploadMessage" :class="uploadMessage.type === 'success' ? 'success-msg' : 'error-msg'">
          {{ uploadMessage.text }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    selectedFile: Object,
    uploading: Boolean,
    uploadMessage: Object
  })
  
  const emit = defineEmits(['file-change', 'upload'])
  
  const fileInputRef = ref(null)
  
  const handleFileChange = (event) => {
    emit('file-change', event)
  }
  
  const handleUploadClick = async () => {
    const success = await emit('upload')
    if (success) {
      fileInputRef.value.value = ''
    }
  }
  
  watch(() => props.selectedFile, (newVal) => {
    if (!newVal && fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  })
  </script>
  
  <style scoped>
  .zip-card {
    width: 100%;
    max-width: 600px;
    background: #141414;
    border-radius: 16px;
    box-shadow: 0px 4px 14px rgba(79, 70, 229, 0.25);
  }
  
  .zip-card-content {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .label {
    color: #d1d5db;
    font-weight: 600;
    font-size: 0.95rem;
  }
  
  .input-file {
    padding: 10px;
    background: #1f1f1f;
    border: 1px solid #2d2d2d;
    border-radius: 10px;
    color: #e5e7eb;
    cursor: pointer;
  }
  
  .file-info {
    font-size: 0.9rem;
    color: #9ca3af;
  }
  
  .btn-upload {
    width: 100%;
    padding: 14px 0;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    background: linear-gradient(90deg, #2563eb, #4f46e5);
    color: white;
    cursor: pointer;
    border: none;
    transition: all 0.25s ease-in-out;
    box-shadow: 0px 4px 14px rgba(79, 70, 229, 0.4);
  }
  
  .btn-upload:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0px 6px 18px rgba(79, 70, 229, 0.6);
  }
  
  .btn-upload:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .success-msg {
    color: #10b981;
    font-size: 0.9rem;
    padding: 10px;
    background: rgba(16, 185, 129, 0.1);
    border-radius: 8px;
    border-left: 3px solid #10b981;
  }
  
  .error-msg {
    color: #ef4444;
    font-size: 0.9rem;
    padding: 10px;
    background: rgba(239, 68, 68, 0.1);
    border-radius: 8px;
    border-left: 3px solid #ef4444;
  }
  </style>