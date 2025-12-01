import { ref, onMounted, nextTick } from "vue";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  connectFirestoreEmulator,
} from "firebase/firestore";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  connectStorageEmulator,
} from "firebase/storage";

export const useZipManager = () => {
  const storage = getStorage();
  // Conectar al Storage Emulator si estamos en localhost
  if (window.location.hostname === "localhost") {
    connectFirestoreEmulator(db, "localhost", 8081);
    connectStorageEmulator(storage, "localhost", 9199);
  }

  const selectedFile = ref(null);
  const uploading = ref(false);
  const uploadMessage = ref(null);

  const showPasswordModal = ref(false);
  const selectedFileForDownload = ref(null);
  const password = ref("");
  const downloading = ref(false);
  const downloadError = ref("");
  const passwordInput = ref(null);

  const unzippedFiles = ref([]);

  const formatBytes = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleFile = (event) => {
    selectedFile.value = event.target.files[0];
    uploadMessage.value = null;
  };

  const uploadFile = async () => {

    if (!selectedFile.value) return;
  
    uploading.value = true;
    uploadMessage.value = null;
  
    try {
      const file = selectedFile.value;
      const cleanFileName = file.name.replace(/[^\w-.()]/g, "_");
      const filePath = `zipUploads/${Date.now()}_${cleanFileName}`;
  
      const fileRef = storageRef(storage, filePath);
  
      await uploadBytes(fileRef, file, {
        contentType: "application/zip",
      });
  
      uploadMessage.value = {
        type: "success",
        text: "ZIP subido correctamente al Storage Emulator. El backend lo procesará.",
      };
  
      selectedFile.value = null;

      return true;
  
    } catch (error) {
      console.error("Error al subir ZIP:", error);
      uploadMessage.value = {
        type: "error",
        text: "Error al subir ZIP: " + error.message,
      };
    } finally {
      uploading.value = false;
    }
  };
  

  const openPasswordModal = async (file) => {
    selectedFileForDownload.value = file;
    showPasswordModal.value = true;
    password.value = "";
    downloadError.value = "";

    await nextTick();
    passwordInput.value?.focus();
  };

  const closeModal = () => {
    showPasswordModal.value = false;
    password.value = "";
    downloadError.value = "";
    selectedFileForDownload.value = null;
  };

  const downloadFile = async () => {

    const file = selectedFileForDownload.value;

    if (!file) return;
  
    try {
      const res = await fetch("http://localhost:3000/download-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId: file.id,
          password: password.value
        })
      });
  
      const data = await res.json();
  
      if (!data.downloadURL) throw new Error("Backend no devolvió URL");
  
      // Descargar
      const link = document.createElement("a");
      link.href = data.downloadURL;
      link.download = file.name;
      link.click();
  
    } catch (error) {
      downloadError.value = error.message;
    }
  };
  

  const loadFiles = () => {
    const filesCollection = collection(db, "unzippedFiles");

    onSnapshot(filesCollection, (snapshot) => {
      unzippedFiles.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      unzippedFiles.value.sort((a, b) => {
        if (!a.uploadedAt || !b.uploadedAt) return 0;
        return b.uploadedAt.toMillis() - a.uploadedAt.toMillis();
      });

      console.log(
        "Nombres de archivos:",
        unzippedFiles.value.map((file) => file.name)
      );
    });
  };

  onMounted(() => {
    loadFiles();
  });

  return {
    selectedFile,
    uploading,
    uploadMessage,

    showPasswordModal,
    selectedFileForDownload,
    password,
    downloading,
    downloadError,
    passwordInput,

    unzippedFiles,

    handleFile,
    uploadFile,
    openPasswordModal,
    closeModal,
    downloadFile,
    formatBytes,
  };
};
