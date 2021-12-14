
import View from "./View";
import previewView from './previewView.js';
class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list");
    _errMessage = "No bookmars yet. Choose a recipe and add it to bookmark. ;)";
    _message = "";
    _generateMarkup() {
        // console.log(this._data)
        return this._data.map(bookmark => 
         previewView.render(bookmark,false)
        ).join("")
    }
    addRenderHandeler(handeler){
      window.addEventListener("load",handeler)
    }
}
export default new BookmarksView();