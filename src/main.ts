import App from './components/app'
import './index.css'
const randomId = () => Math.random().toString(36).slice(2, 11);
const appId = "zaggesible-" + randomId();
const app = new App(appId);
document.querySelector<HTMLDivElement>('#app')!.appendChild(app.getElement());
