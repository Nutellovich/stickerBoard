import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useCardsStore = defineStore('cardsStore', () => {
    const cards = ref([])

    const loadCards = () => {
        if (process.client) {
            const storedCards = localStorage.getItem('cards')
            if (storedCards) {
                cards.value = JSON.parse(storedCards)
            }
        }
    }

    const saveCards = () => {
        if (process.client) {
            localStorage.setItem('cards', JSON.stringify(cards.value))
        }
    }

    watch(cards, saveCards, { deep: true })

    if (process.client) {
        loadCards()
    }

    // Функция для генерации случайного пастельного цвета
    const getRandomPastelColor = () => {
        const r = Math.floor(Math.random() * 55 + 200); 
        const g = Math.floor(Math.random() * 55 + 200);
        const b = Math.floor(Math.random() * 55 + 200);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const addCard = (text) => {
        cards.value.push({
            id: Date.now(),
            color: getRandomPastelColor(),
            text
        })
    }

    const deleteCard = (id) => {
        cards.value = cards.value.filter(card => card.id !== id)
    }

    // Функция для обновления текста карточки
    const updateCard = (id, newText) => {
        const card = cards.value.find(card => card.id === id)
        if (card) {
            card.text = newText
        }
    }

    return { cards, addCard, deleteCard, updateCard }
})
