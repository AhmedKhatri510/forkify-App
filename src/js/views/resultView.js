import View from './view.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _message;
  _errorMessage = 'No recipes found for your query! Please try again! :)';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
