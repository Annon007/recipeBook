import * as modal from '../js/module.js';
import recipeView from '../js/views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept()
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const conrollRecipe = async function () {
  try {
    const id = window.location.hash;
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(modal.getSearchResultPage());
    bookmarksView.update(modal.state.bookMark)

    await modal.loadRecipe(id);

    const { recipe } = modal.state;
    recipeView.render(recipe);
    // controllServings()

  } catch (err) {
    // alert(err);
    recipeView.renderError()
  }
};
// conrollRecipe();
// window.addEventListener('hashchange', conrollRecipe);
// window.addEventListener('load', conrollRecipe);

const controllSearchResults = async function () {
  try {
    resultsView.renderSpinner()
    const query = searchView.getQuery()
    if (!query) return;
    await modal.loadSearchRecipe(query)
    // console.log(modal.state.search.results)
    resultsView.render(modal.getSearchResultPage(1));
    paginationView.render(modal.state.search);
  } catch (err) {
    recipeView.renderError(err)

  }
}
const controllPagination=function(goToPage){
  resultsView.render(modal.getSearchResultPage(goToPage));
  paginationView.render(modal.state.search);
}
const controllServings=function(newServings){
  modal.updateServings(newServings);
  // recipeView.render(modal.state.recipe)
  recipeView.update(modal.state.recipe)

}
const controllBookMark=function(){
  // console.log(!modal.state.bookMarked)
  if(!modal.state.recipe.bookMarked) modal.addBookMark(modal.state.recipe)
  else modal.deleteBookMark(modal.state.recipe.id)
  // console.log("Clicked",modal.state.recipe)
  recipeView.update(modal.state.recipe)

  bookmarksView.render(modal.state.bookMark)
}
const controllBoorkMarkRender=function(){
  bookmarksView.render(modal.state.bookMark);
}
const controllAddRecipe=async function(newRecipe){
  try{
    console.log(newRecipe);

  await modal.uploadRecipe(newRecipe);
  recipeView.render(modal.state.recipe)
  bookmarksView.render(modal.state.bookMark)
  window.history.pushState(null,"",`#${modal.state.recipe.id}`)
  setTimeout(function(){
    addRecipeView.renderMessage();
  },1500)
  addRecipeView.renderSpinner();

  setTimeout(function(){
    addRecipeView.toggleWindow()
  },2500)
}catch(err){
    addRecipeView.renderError(err);
    console.error("❌",err)
  }
}
const init = function () {
  bookmarksView.addRenderHandeler(controllBoorkMarkRender)
  recipeView.addHendelerRender(conrollRecipe);
  recipeView.addHandelerUpdateServings(controllServings);
  recipeView.addHandelerBookMark(controllBookMark);
  searchView.addSearchHandeler(controllSearchResults);
  paginationView.addHandelerClick(controllPagination);
  addRecipeView.addHandelerUpload(controllAddRecipe);
  console.log("welcome");
}
init()