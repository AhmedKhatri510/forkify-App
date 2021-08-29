import View from './view.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _message;
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
