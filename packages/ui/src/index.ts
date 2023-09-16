import App from "./components/app";
const appId = "zaggesible" + Math.random().toString(36).substring(2, 15);
function mount() {
    const app = new App(appId);
    document.body.appendChild(app.getElement());
}
export { mount };
