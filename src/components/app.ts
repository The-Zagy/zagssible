import Component from "./component";
import TextResizer from "../lib/font";

class App extends Component{
    private showButton: HTMLElement;
    private widget: HTMLElement;
    private textResizer: TextResizer;
    private widgetOpen: boolean;
    private smallerButton: HTMLElement;
    private biggerButton: HTMLElement;
    private resetButton: HTMLElement;
    private close: HTMLElement;
    constructor(private appId: string){
        super(`
        <div id="${appId}">
            <button id="show" class="bg-gray-200 shadow-sm rounded-full p-4 fixed right-0 bottom-0 m-4">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM120.5 247.2c12.4-4.7 18.7-18.5 14-30.9s-18.5-18.7-30.9-14C43.1 225.1 0 283.5 0 352c0 88.4 71.6 160 160 160c61.2 0 114.3-34.3 141.2-84.7c6.2-11.7 1.8-26.2-9.9-32.5s-26.2-1.8-32.5 9.9C240 440 202.8 464 160 464C98.1 464 48 413.9 48 352c0-47.9 30.1-88.8 72.5-104.8zM259.8 176l-1.9-9.7c-4.5-22.3-24-38.3-46.8-38.3c-30.1 0-52.7 27.5-46.8 57l23.1 115.5c6 29.9 32.2 51.4 62.8 51.4h5.1c.4 0 .8 0 1.3 0h94.1c6.7 0 12.6 4.1 15 10.4L402 459.2c6 16.1 23.8 24.6 40.1 19.1l48-16c16.8-5.6 25.8-23.7 20.2-40.5s-23.7-25.8-40.5-20.2l-18.7 6.2-25.5-68c-11.7-31.2-41.6-51.9-74.9-51.9H282.2l-9.6-48H336c17.7 0 32-14.3 32-32s-14.3-32-32-32H259.8z"/></svg>
            </button>
            <div id="widget" class="bg-gray-200 shadow-sm rounded-lg p-4 fixed right-0 bottom-0 hidden h-full">
                <div class="flex flex-col h-full">
                    <button id="close" class="bg-gray-200 shadow-sm rounded-full p-4 fixed right-0 bottom-0 m-4">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM368 320.5L320.5 368L256 303.5L191.5 368L144 320.5L208.5 256L144 191.5L191.5 144L256 208.5L320.5 144L368 191.5L303.5 256L368 320.5z"/></svg>
                    </button>
                    <button id="smaller" class="bg-gray-200 shadow-sm rounded-full p-4 font-bold text-sm">
                    A-
                  </button>
                  <button id="bigger" class="bg-gray-200 shadow-sm rounded-full p-4 font-bold text-lg">
                    A+
                  </button>
                  <button id="reset" class="bg-gray-200 shadow-sm rounded-full p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6zm-1.5-7h3v-1.5h-3V11z" />
                    </svg>
                  </button>
                </div>
            </div>
        </div>
        `);
        this.widgetOpen = false;
        this.textResizer = new TextResizer(this.appId);
        this.showButton = this.element.querySelector('#show')!;
        this.widget = this.element.querySelector('#widget')!;
        this.smallerButton = this.element.querySelector('#smaller')!;
        this.biggerButton = this.element.querySelector('#bigger')!;
        this.resetButton = this.element.querySelector('#reset')!;
        this.close = this.element.querySelector('#close')!;
        this.showButton.addEventListener('click', () => {
            if(this.widgetOpen){
                this.widget.classList.add('hidden');
                this.widgetOpen = false;
            }else{
                this.widget.classList.remove('hidden');
                this.widgetOpen = true;
            }
        });

        this.smallerButton.addEventListener('click', () => {
            console.log(this.textResizer)
            this.textResizer.resize("out");
        });

        this.biggerButton.addEventListener('click', () => {
            this.textResizer.resize("in");
        });

        this.resetButton.addEventListener('click', () => {
            this.textResizer.reset();
        });

        this.close.addEventListener('click', () => {
            this.widget.classList.add('hidden');
            this.widgetOpen = false;
        }
        );
    }
        
}
export default App;

