<template>
  <div class="add-card-container">
    <h2>Пришло вдохновение? Добавьте новый стикер:</h2>
    <form @submit.prevent="addCard" class="add-card-form">
      <input v-model="newCardText" placeholder="Введите текст карточки" />
      <button type="submit" class="add-button">Добавить карточку</button>
    </form>
    <div class="card-container" :style="{ height: containerHeight }">
      <div v-if="cards.length === 0" class="empty-message">
        <span>Заполняйте поле выше и нажимайте "Добавить карточку"</span>
        <span class="small-text">*активно ждёт*</span>
        <img src="/img/wow.webp" alt="Sticker" class="sticker-image" />
      </div>
      <div v-for="card in [...cards].reverse()" :key="card.id" class="card">
        <div v-if="editingCardId === card.id" class="edit-container">
          <textarea v-model="editText" placeholder="Введите новый текст" />
          <div class="card-buttons">
            <button @click="saveCard(card.id)" class="save-button">
              Сохранить
            </button>
            <button @click="cancelEdit" class="cancel-button">Отмена</button>
          </div>
        </div>
        <div v-else>
          <p>{{ card.text }}</p>
          <p v-if="card.text === ''" class="point">...</p>
          <div class="card-buttons">
            <button @click="editCard(card.id, card.text)" class="edit-button">
              Редактировать
            </button>
            <button @click="deleteCard(card.id)" class="delete-button">
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="ear">2024 г. | @nutellovich</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCardsStore } from '@/stores/cardsStore';

const store = useCardsStore();
const cards = computed(() => store.cards);
const deleteCard = store.deleteCard;

// Состояние для редактирования
const editingCardId = ref(null);
const editText = ref('');
const newCardText = ref('');
const containerHeight = ref('');

// Функция для редактирования карточки
const editCard = (id, text) => {
  editingCardId.value = id;
  editText.value = text;
};

// Функция для сохранения изменений
const saveCard = (id) => {
  store.updateCard(id, editText.value);
  cancelEdit(); // Сбрасываем редактирование
};

const updateContainerHeight = () => {
  containerHeight.value = `${window.innerHeight - 330}px`;
};

// Функция для отмены редактирования
const cancelEdit = () => {
  editingCardId.value = null;
  editText.value = '';
};

// Функция для добавления новой карточки
const addCard = () => {
  if (newCardText.value.trim()) {
    store.addCard(newCardText.value);
    newCardText.value = '';
  }
};

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
$primary-color: #007bff;
$secondary-color: #ff4d4d;
$edit-button-color: #09295c;
$save-button-color: #8bb8b6;
$card-background: #fff;
$border-color: #ccc;

@mixin button-style($bg-color) {
  background-color: $bg-color;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
}

.small-text {
  font-size: 14px;
}

.empty-message {
  color: #666;
  font-size: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  align-items: center;
  height: 100%;
}

.sticker-image {
  width: 100px;
  height: auto;
}

.ear {
  margin-top: 10px;
  font-size: 14px;
}

.add-card-container {
  margin: 20px;
  text-align: center;
  padding: 0 80px;

  .add-card-form {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;

    input {
      padding: 10px;
      border: 1px solid $border-color;
      border-radius: 5px;
      margin-right: 10px;
      flex: 1;
    }

    .add-button {
      @include button-style($primary-color);
      padding: 10px 15px;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .edit-container {
    display: flex;
    justify-content: center;
    gap: 5px;
    flex-direction: column;
    align-items: center;

    input {
      padding: 10px;
      border: 1px solid $border-color;
      border-radius: 5px;
      margin-right: 5px;
    }
  }

  .cancel-button,
  .edit-button,
  .delete-button,
  .save-button {
    @include button-style($secondary-color);

    &.save-button {
      background-color: $save-button-color;

      &:hover {
        opacity: 0.8;
      }
    }

    &.edit-button {
      background-color: $edit-button-color;

      &:hover {
        opacity: 0.8;
      }
    }

    &:hover {
      opacity: 0.8;
    }
  }

  .card-buttons {
    display: flex;
    justify-content: center;
    gap: 5px;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  textarea {
    resize: vertical;
    width: 300px;
    height: 100px;
    border: 1px solid $border-color;
    border-radius: 5px;
    padding: 4px;
  }

  .point {
    color: #8aa6a5;
  }

  .end {
    margin-top: 15px;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    align-items: center;
    position: relative;
    margin: 0 10px;
    border: 2px solid rgb(0, 123, 255);
    border-radius: 14px;

    .card {
      background-color: $card-background;
      border: 1px solid $border-color;
      border-radius: 8px;
      padding: 15px;
      margin: 10px 0;
      width: 85%;
      max-width: 400px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
      animation: slideInFromTop 0.5s ease-out;

      @keyframes slideInFromTop {
        0% {
          transform: translateY(-100%);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
}

@media (max-width: 640px) {
  .add-card-container {
    padding: 0;
    margin: 0;

    .add-card-form {
      flex-direction: column;
      gap: 10px;

      input {
        margin: 0 40px;
      }

      .add-button {
        max-width: 300px;
        align-self: center;
      }
    }
  }
}
</style>
