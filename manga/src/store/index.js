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
      state.totalPrice += price;
    },
  },
  actions: {
  },
  modules: {
  }
})
