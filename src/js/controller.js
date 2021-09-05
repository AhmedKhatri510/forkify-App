import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
// import icons from '../img/icons.svg'; //parcel 1
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

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

    //3) updating bookmark view
    bookmarkView.update(model.state.bookmarks);

    //1) loading the recipes
    await model.loadRecipe(id);

    //2) rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
    console.error(err);
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
  //1)Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // model.addBookmark(model.state.recipe);
  //2)Update recipe view
  recipeView.update(model.state.recipe);

  //3)Render the bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    //loading spinner
    addRecipeView.renderSpinner();

    //upload the new recipe data.
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render the recipe
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    //render bookmarkView
    bookmarkView.render(model.state.bookmarks);

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //clear the form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

//Subcriber -> publisher (addHandlerrender)
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerrender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlLoadSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
