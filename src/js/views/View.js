import icons from '../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    this._data = data;
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // this._generateMarkup();
    if (!render) return this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      this._generateMarkup()
    );
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));
    newElement.forEach((el, i) => {
      const curEL = curElement[i];
      if (!el.isEqualNode(curEL) && el.firstChild?.nodeValue.trim() !== '') {
        curEL.textContent = el.textContent;
      }
      if (!el.isEqualNode(curEL)) {
        Array.from(el.attributes).forEach(att =>
          curEL.setAttribute(att.name, att.value)
        );
      }
    });
  }
  renderSpinner() {
    const markUp = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(err = this._errMessage) {
    const errMarkup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p> ${err}</p>
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', errMarkup);
  }
}
