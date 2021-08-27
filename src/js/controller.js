import * as model from './model.js';
// import icons from '../img/icons.svg'; //parcel 1
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import { initial } from 'lodash';

// console.log(icons);

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();
    //1) loading the recipes
    await model.loadRecipe(id);

    //2) rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

//Subcriber -> publisher (addHandlerrender)
const init = function () {
  recipeView.addHandlerrender(controlRecipe);
};

init();
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
