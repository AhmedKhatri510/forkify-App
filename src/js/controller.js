import * as model from './model.js';
// import icons from '../img/icons.svg'; //parcel 1
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';

import 'core-js/stable';
import { initial } from 'lodash';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    //1) loading the recipes
    await model.loadRecipe(id);

    //2) rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
};

const controlLoadSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //1) get the query
    const query = searchView.getQuery();
    if (!query) return;

    //2) load the search results
    await model.loadSearchResults(query);

    //3) render the query

    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());
  } catch (err) {
    console.error(err);
  }
};

//Subcriber -> publisher (addHandlerrender)
const init = function () {
  recipeView.addHandlerrender(controlRecipe);
  searchView.addHandlerSearch(controlLoadSearchResults);
};

init();
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
