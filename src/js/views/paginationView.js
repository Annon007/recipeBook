import icons from 'url:../../img/icons.svg';

import View from "./View";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");
    addHandelerClick(handeler){
        this._parentElement.addEventListener("click",function(e){
            const btn= e.target.closest(".btn--inline");
            if(!btn)return;
            const goTo=+btn.dataset.goto;
            // console.log(goTo);
            handeler(goTo)
        })
    }
   
    _generateMarkup(){
        const currentPage=this._data.page;
        const totalPage=Math.ceil(this._data.results.length/this._data.limitResult);
        // console.log(totalPage);

        if(currentPage===1 && totalPage>1){
            return`
            <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage+1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }
        if(currentPage<totalPage){
            return`
            <button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                <span>Page ${currentPage-1}</span>
            </button>
            <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage+1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }
        if(currentPage===totalPage && totalPage>1){
            return`
            <button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                <span>Page ${currentPage-1}</span>
            </button>
            `;
        }
        return `<button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage+1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`
    }
}
export default new PaginationView();