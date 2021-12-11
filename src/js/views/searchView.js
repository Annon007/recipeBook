class SearchView {
    _parentEl = document.querySelector(".search")

    getQuery() {
        const query = this._parentEl.querySelector(".search__field").value;
        this._cleanInput();
        return query;
    }
    _cleanInput() {
        this._parentEl.querySelector(".search__field").value = "";
    }
    addSearchHandeler(handeler) {
        this._parentEl.addEventListener("submit", function (e) {
            e.preventDefault()
            handeler()
        })
    }

}
export default new SearchView();