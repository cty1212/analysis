export default {
  setItem: (key, value) => {
    if (typeof value === `object`) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  },
  getItem: (key) => {
    const data = window.localStorage.getItem(key)
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
  }
}
