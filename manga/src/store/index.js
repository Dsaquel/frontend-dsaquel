import { createStore } from 'vuex'

export default createStore({
  state: { 
    secondId: 0,
    recapArticle: [],
    totalPrice: 0,
    newName: "Micro",
    newPrice: 60,
    numberOfArticle: 0,
  },
  getters: {
  },
  mutations: {
    getArticle: function (state ,{name, price}) {
      let isNameMatched = state.recapArticle.find(function (article) {
        return article.about === name;
      });
      if (isNameMatched) {
        isNameMatched.number++;
      } else {
        state.recapArticle.push({
          id: state.secondId++,
          about: name,
          price: price,
          number: 1,
        });
      }
      state.totalPrice += Number(price);
    },
    deleteArticle: function (state, {id, price, numberLeft}) {
      if (numberLeft > 1) {
        const article = state.recapArticle.find((article) => article.id == id);
        article.number--;
      } else {
        state.recapArticle = state.recapArticle.filter((arr) => arr.id != id);
      }
      state.totalPrice -= Number(price);
    },
    getLastId : function () {
      return store.secondId
    }
  },
  actions: {
  },
  modules: {
  }
})
