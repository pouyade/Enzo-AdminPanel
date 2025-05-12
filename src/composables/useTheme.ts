import { ref, watch, onMounted } from 'vue'
import { useEventBus } from './useEventBus'

const isDark = ref(localStorage.getItem('theme') === 'dark')
const eventBus = useEventBus()

export function useTheme() {
  // Function to apply theme to document
  const applyTheme = (darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme(isDark.value)
    // Emit theme change event
    eventBus.emit('theme-changed', isDark.value)
  }

  // Watch for theme changes from other components
  watch(isDark, (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
    applyTheme(newValue)
  })

  // Apply theme on initial load
  onMounted(() => {
    applyTheme(isDark.value)
  })

  return {
    isDark,
    toggleTheme
  }
} 