<template>
  <div class="error-container">
    <div class="error">
      <div class="messages">
        <div class="code">{{ error.statusCode }}</div>
        <div>Ой! Ошибочка вышла...</div>
      </div>
      <img src="/img/oops.webp" alt="Sticker" class="sticker-image" />
    </div>
  </div>
</template>

<script setup>
defineProps(['error']);
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center; /* Центрирование по горизонтали */
  align-items: center; /* Центрирование по вертикали */
  height: 100vh; /* Занять всю высоту экрана */
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sticker-image {
  width: 300px;
  height: auto;
}

.messages {
  color: #09295c;
  text-align: center;
}

.code {
  font-weight: 500;
  font-size: 100px;
}
</style>
