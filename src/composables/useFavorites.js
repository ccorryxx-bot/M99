import { ref, computed } from 'vue'

const FAV_KEY = 'iw99_fav_games'

const favIds = ref(JSON.parse(localStorage.getItem(FAV_KEY) || '[]'))

export function useFavorites() {
  const isFav = (gameCode) => favIds.value.includes(gameCode)

  const toggleFav = (gameCode) => {
    const idx = favIds.value.indexOf(gameCode)
    if (idx === -1) {
      favIds.value = [...favIds.value, gameCode]
    } else {
      favIds.value = favIds.value.filter(id => id !== gameCode)
    }
    localStorage.setItem(FAV_KEY, JSON.stringify(favIds.value))
  }

  const favCount = computed(() => favIds.value.length)

  const filterFavGames = (games) => games.filter(g => favIds.value.includes(g.game_code))

  return { favIds, isFav, toggleFav, favCount, filterFavGames }
}
