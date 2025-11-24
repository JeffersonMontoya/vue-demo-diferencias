<template>
  <div class="zip-container">
    <div class="zip-header">
      <h1 class="zip-title">
        <span class="gradient-text">Cargar Archivo ZIP</span>
      </h1>
    </div>

    <UploadCard
      :selected-file="selectedFile"
      :uploading="uploading"
      :upload-message="uploadMessage"
      @file-change="handleFile"
      @upload="uploadFile"
    />

    <FileList
      :files="unzippedFiles"
      :format-bytes="formatBytes"
      @file-click="openPasswordModal"
    />

    <PasswordModal
      :show="showPasswordModal"
      :selected-file="selectedFileForDownload"
      v-model:password="password"
      :downloading="downloading"
      :error="downloadError"
      @close="closeModal"
      @download="downloadFile"
    />
  </div>
</template>

<script setup>
import { useZipManager } from '../composables/useZipManager'
import UploadCard from '../components/UploadCard.vue'
import FileList from '../components/FileList.vue'
import PasswordModal from '../components/PasswordModal.vue'

const {
  selectedFile,
  uploading,
  uploadMessage,
  showPasswordModal,
  selectedFileForDownload,
  password,
  downloading,
  downloadError,
  unzippedFiles,
  handleFile,
  uploadFile,
  openPasswordModal,
  closeModal,
  downloadFile,
  formatBytes
} = useZipManager()
</script>

<style scoped>
.zip-container {
  min-height: 100vh;
  background: linear-gradient(160deg, #0d0d0d, #1a1a1a);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 60px;
  color: #e5e7eb;
}

.zip-header {
  text-align: center;
  margin-bottom: 40px;
}

.zip-title {
  font-size: 2.3rem;
  font-weight: 900;
  margin-bottom: 20px;
  letter-spacing: -0.6px;
}

.gradient-text {
  background: linear-gradient(90deg, #60a5fa, #818cf8, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 768px) {
  .zip-title {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .zip-container {
    padding: 30px 15px;
  }
  .zip-title {
    font-size: 1.5rem;
  }
}
</style>