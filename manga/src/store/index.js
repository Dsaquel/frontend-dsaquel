import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    secondId: 0,
    recapArticle: [],
    totalPrice: 0,
    newName: "Micro",
    newPrice: 60,
    numberOfArticle: 0,
    budget: null,
    error: false,
  },
  getters: {
    getLastId: function () {
      return store.secondId
    },
  },
  mutations: {
    getArticle: function (state, {
      name,
      price
    }) {
      if (state.budget - price >= 0) {
        state.error = false
        let isNameMatched = state.recapArticle.find(function (article) {
          return article.about === name;
        });
        if (isNameMatched) {
          isNameMatched.number++;
        } else if (!isNameMatched) {
          state.recapArticle.push({
            id: state.secondId++,
            about: name,
            price: price,
            number: 1,
          });
        }
        state.totalPrice += Number(price);
        state.budget -= Number(price);
        console.log(state.error)
      } else {
        return state.error = true
      }
    },
    deleteArticle: function (state, {
      id,
      price,
      numberLeft
    }) {
      if (numberLeft > 1) {
        const article = state.recapArticle.find((article) => article.id == id);
        article.number--;
      } else {
        state.recapArticle = state.recapArticle.filter((arr) => arr.id != id);
      }
      state.totalPrice -= Number(price);
      state.budget += Number(price);
    },
    newBudget: (store, budget) => {
      store.budget = budget;
    }
  },
  actions: {
  },
  modules: {}
})