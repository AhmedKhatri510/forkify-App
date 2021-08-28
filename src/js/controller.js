import * as model from './model.js';
// import icons from '../img/icons.svg'; //parcel 1
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

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
    //0) update result view to mark selected search results
    resultView.update(model.getSearchResultsPage());

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

    //3) render the results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

    //4) Render initial Pagination buttons

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (gotoPage) {
  //1) render NEW results

  resultView.render(model.getSearchResultsPage(gotoPage));

  //2) Render NEW Pagination buttons
  paginationView.render(model.state.search);
};

const controlServing = function (newServing) {
  //Update the recipe serving (in state)
  model.updateServings(newServing);
  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

//Subcriber -> publisher (addHandlerrender)
const init = function () {
  recipeView.addHandlerrender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlLoadSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
