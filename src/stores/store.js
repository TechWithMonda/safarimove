import { reactive } from 'vue'

const state = reactive({
  entries: JSON.parse(localStorage.getItem('eggTrackerEntries')) || [],
  flockData: JSON.parse(localStorage.getItem('eggTrackerFlockData')) || {
    currentTotal: 0,
    history: []
  },
  customerSales: JSON.parse(localStorage.getItem('eggTrackerCustomerSales')) || []
})

export function useStore() {
  return {
    // State
    entries: state.entries,
    flockData: state.flockData,
    customerSales: state.customerSales,

    // Production methods
    addProductionEntry(entry) {
      if (!entry.eggsTakenForSale) {
        entry.eggsTakenForSale = 0  // default if missing
      }

      state.entries.unshift(entry)
      saveToLocalStorage()
    },

    getRecentProduction(count) {
      return state.entries
        .filter(entry => entry.eggsLaid !== undefined)
        .slice(0, count)
    },

    getTodayStats() {
      const today = new Date().toLocaleDateString()
      const todayEntry = state.entries.find(entry =>
        new Date(entry.date).toLocaleDateString() === today
      )

      if (!todayEntry) {
        return {
          eggsLaid: 0,
          eggsTakenForSale: 0,
          revenue: 0
        }
      }

      const totalRevenue = (todayEntry.customers || []).reduce(
        (sum, customer) => sum + (customer.price || 0),
        0
      )

      return {
        eggsLaid: todayEntry.eggsLaid || 0,
        eggsTakenForSale: todayEntry.eggsTakenForSale || 0,
        revenue: totalRevenue
      }
    },

    // Customer methods
    addCustomerSale(sale) {
      state.customerSales.unshift(sale)

      const today = new Date().toLocaleDateString()
      const saleDate = new Date(sale.date).toLocaleDateString()

      if (today === saleDate) {
        const todayEntry = state.entries.find(entry =>
          new Date(entry.date).toLocaleDateString() === today
        )

        if (todayEntry) {
          if (!todayEntry.customers) todayEntry.customers = []
          todayEntry.customers.push(sale)
        }
      }

      saveToLocalStorage()
    },

    updateCustomerSale(oldSale, newSale) {
      const index = state.customerSales.findIndex(s =>
        s.date === oldSale.date &&
        s.name === oldSale.name &&
        s.eggsSold === oldSale.eggsSold
      )

      if (index !== -1) {
        state.customerSales.splice(index, 1, newSale)
        saveToLocalStorage()
      }
    },

    // Flock methods
    updateFlock(entry) {
      state.flockData.currentTotal = entry.total
      state.flockData.history.push(entry)
      saveToLocalStorage()
    },

    // Analytics methods
    getMonthlyProfit() {
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

      return state.entries
        .filter(entry => new Date(entry.date) >= monthStart)
        .reduce((profit, entry) => profit + ((entry.revenue || 0) - (entry.expenses || 0)), 0)
    },

    getRecentActivities(count) {
      return state.entries
        .slice(0, count)
        .map(entry => ({
          date: entry.date,
          description: this.getActivityDescription(entry)
        }))
    },

    getActivityDescription(entry) {
      if (entry.eggsLaid) {
        return `Recorded ${entry.eggsLaid} eggs collected`
      }
      if (entry.customers && entry.customers.length) {
        return `Made ${entry.customers.length} customer sale(s)`
      }
      return 'Farm activity recorded'
    }
  }
}

function saveToLocalStorage() {
  localStorage.setItem('eggTrackerEntries', JSON.stringify(state.entries))
  localStorage.setItem('eggTrackerFlockData', JSON.stringify(state.flockData))
  localStorage.setItem('eggTrackerCustomerSales', JSON.stringify(state.customerSales))
}
