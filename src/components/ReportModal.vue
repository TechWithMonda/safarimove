<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Report Traffic Incident</h3>
          <button @click="close" class="modal-close">
            &times;
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="submitReport">
            <div class="form-group">
              <label>Location</label>
              <input v-model="form.location" type="text" required>
            </div>
            
            <div class="form-group">
              <label>Incident Type</label>
              <select v-model="form.type" required>
                <option value="accident">Accident</option>
                <option value="congestion">Heavy Traffic</option>
                <option value="roadwork">Road Works</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="form.description"></textarea>
            </div>
            
            <button type="submit" class="submit-btn">Submit Report</button>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'submit']);

const isOpen = ref(false);
const form = ref({
  location: '',
  type: 'accident',
  description: ''
});

const open = () => isOpen.value = true;
const close = () => {
  isOpen.value = false;
  emit('close');
};

const submitReport = () => {
  emit('submit', form.value);
  close();
};

defineExpose({ open });
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 90%;
  max-width: 500px;
  background: #1e293b;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-close {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #e2e8f0;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  background: #334155;
  border: 1px solid #475569;
  border-radius: 0.25rem;
  color: white;
}

.submit-btn {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

/* Transition effects */
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
</style>