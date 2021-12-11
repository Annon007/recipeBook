import { API_URL,KEY,PAGE_LIMIT,KEY } from './configuration.js';
import { GET_URL,SEND_URL} from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: "",
    page:1,
    limitResult:PAGE_LIMIT,
    results: [],
    
  },bookMark:[],
};
const getRecipeObject=function(data){

  let { recipe } = data.data;
  return{
    id: recipe.id,
    title: recipe.title,
    cookingTime: recipe.cooking_time,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    servings: recipe.servings,
    ...(recipe.key && {key:recipe.key})
  };
}
export const loadRecipe = async id => {
  try {
    const data = await GET_URL(`${API_URL}${id.slice(1)}?key=${KEY}`);
    // console.log(data);
   state.recipe=getRecipeObject(data);
    if(state.bookMark.some(bookMark=>bookMark.id===id.slice(1))){
      state.recipe.bookMarked=true;
    }
    else state.recipe.bookMarked=false;
    // console.log(recipe);
  } catch (err) {
    console.error(`${err} ❌❌❌`);
    throw err;
  }
};

export const loadSearchRecipe = async function (query) {
  try {
    state.search.query = query;
    const data = await GET_URL(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url,
        ...(res.key && {key:res.key})
      }
    });
  } catch (err) {
    throw err;
  }
}
export const getSearchResultPage=function(page=state.search.page){
  state.search.page=page;
  // console.log(state.search.limitResult);
  let start=(page-1)* state.search.limitResult;
  let end=page* state.search.limitResult;
  return state.search.results.slice(start,end);
}
export const updateServings=function(newServings){
  state.recipe.ingredients.forEach(ing=>{
    ing.quantity=(ing.quantity*newServings)/state.recipe.servings;

  })
  state.recipe.servings=newServings;
}
const persistStorage=function(){
  localStorage.setItem("bookmark",JSON.stringify(state.bookMark))
}
export const addBookMark=function(recipe){
  state.bookMark.push(recipe);
  if(recipe.id=== state.recipe.id) state.recipe.bookMarked=true;
  persistStorage();
}

export const deleteBookMark=function(id){
  const index=state.bookMark.findIndex(f=>f.id===id)
  state.bookMark.splice(index,1)
  console.log(id)
  if(id===state.recipe.id) state.recipe.bookMarked=false;
  persistStorage();
}
const init=function(){
  const storage=localStorage.getItem("bookmark");
  if(storage) state.bookMark=JSON.parse(storage);
  console.log(state.bookMark)
}
init()
// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza

// loadSearchRecipe("pizza")

export const uploadRecipe=async function(newRecipe){
  try {
    const ingredients=Object.entries(newRecipe).filter(el=>{
      

      return el[0].startsWith("ingredient") && el[1]!==""?el:""
    }).map(([_,value])=>{
      const valueArr=value.split(",");
      // console.log(valueArr.length)
      if(valueArr.length!==3)throw new Error("Please match the correct Format! :)");
      const [quantity,unit,description]= valueArr
      return {quantity:quantity?+quantity:null,unit,description}
    });
    const recipe={
      title:newRecipe.title,
      source_url:newRecipe.sourceUrl,
      publisher:newRecipe.publisher,
      image_url:newRecipe.image,
      cooking_time:+newRecipe.cookingTime,
      servings:+newRecipe.servings,
      ingredients,
    }
    const data =await SEND_URL(`${API_URL}?key=${KEY}`,recipe);
    state.recipe=getRecipeObject(data);
    addBookMark(state.recipe)
    console.log(data)
    // console.log(recipe)
  } catch (error) {
    throw error
    
  }
}