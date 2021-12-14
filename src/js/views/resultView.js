
import View from "./View";
import previewView from './previewView.js';

class ResultView extends View {
    _parentElement = document.querySelector(".results");
    _errMessage = "No recipe found for your Query! Please try again :)";
    _message = "";
    _generateMarkup() {
      // console.log(this._data)
      return this._data.map(bookmark => 
       previewView.render(bookmark,false)
      ).join("")
  }
}
export default new ResultView();