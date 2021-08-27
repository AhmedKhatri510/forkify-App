import View from './view';

import icons from '../../img/icons.svg'; //parcel 1
// import icons from 'url:../img/icons.svg'; //parcel 2
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _message;
  _errorMessage =
    'we could not find that recipe, please try again another one!';

  addHandlerrender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkupIngredient(ing) {
    return `
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
      `;
  }
}

export default new RecipeView();
