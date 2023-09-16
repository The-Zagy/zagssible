import Component from "./component";
class Button extends Component {
    constructor(text: string, onClick: () => void, className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded") {
      super(`
        <button class="${className}">
          ${text}
          <div slot="main"></div>
        </button>
      `);
      this.element.addEventListener('click', onClick);
    }
  }
    export default Button;