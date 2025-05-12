import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  // Initialize theme based on system preference if no saved preference
  if (!localStorage.getItem('theme')) {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  // Watch for changes and update localStorage and document class
  watch(isDark, (newValue) => {
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
    updateTheme(newValue)
  })

  // Function to toggle theme
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  // Function to update theme
  function updateTheme(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Initialize theme on store creation
  updateTheme(isDark.value)

  return {
    isDark,
    toggleTheme
  }
}) 