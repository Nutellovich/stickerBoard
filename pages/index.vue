<template>
  <div
    class="container"
    :class="{ empty: cards.length === 0 }"
    :style="{ height: containerHeight }"
  >
    <div class="card-container">
      <div v-if="cards.length === 0" class="empty-message">
        <p>Вы пока не добавили ни одного стикера. Добавьте его!</p>
        <img src="/img/go.webp" alt="Sticker" class="sticker-image" />
      </div>
      <div
        v-for="card in [...cards].reverse()"
        :key="card.id"
        class="card"
        :style="{ backgroundColor: card.color }"
      >
        <div class="message">{{ card.text }}</div>
        <div class="timestamp">{{ formatDate(card.id) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCardsStore } from '@/stores/cardsStore';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { format } from 'date-fns';

const store = useCardsStore();
const cards = computed(() => store.cards);

// Состояние для высоты контейнера
const containerHeight = ref('');

// Функция для обновления высоты контейнера
const updateContainerHeight = () => {
  containerHeight.value = `${window.innerHeight - 200}px`;
};

// Функция для форматирования даты
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Неверная дата';
  }
  return format(date, 'dd.MM.yyyy HH:mm');
};

// Обновляем высоту при монтировании компонента
onMounted(() => {
  updateContainerHeight();
  window.addEventListener('resize', updateContainerHeight);
});

// Убираем слушатель при размонтировании компонента
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateContainerHeight);
});
</script>

<style scoped lang="scss">
$border-color: #007bff;
$card-border-color: #ccc;
$message-color: #333;
$delete-button-bg: #ff4d4d;
$delete-button-hover-bg: #ff1a1a;

@mixin button-styles($bg-color, $hover-bg-color) {
  background-color: $bg-color;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: $hover-bg-color;
  }
}

.container {
  border: 2px solid $border-color;
  margin: 17px;
  border-radius: 14px;
  overflow-y: auto;

  &.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.empty-message {
  color: #666;
  font-size: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card {
  border: 1px solid $card-border-color;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  width: 200px;
  height: 200px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &:hover {
    transform: translateY(-2px);
  }
}

.message {
  font-size: 16px;
  color: $message-color;
  word-wrap: break-word;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-all;
}

.timestamp {
  margin-top: 10px;
  font-size: 14px;
  background: $border-color;
  border-radius: 6px;
  padding: 4px;
  color: #fff;
  align-self: end;
}

.delete-button {
  @include button-styles($delete-button-bg, $delete-button-hover-bg);
}

.sticker-image {
  width: 100px;
  height: auto;
}
</style>
