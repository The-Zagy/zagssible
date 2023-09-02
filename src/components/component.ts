
class Component {
    protected element: HTMLElement;
    private children: Component[];
    private slot: HTMLElement;
    constructor(template?: string) {
        this.element = document.createElement('div');
        this.children = [];
        this.slot = this.element;
        if (template) {
            this.element.innerHTML = template;
            //search for slot attribute with main value
            const slot = this.element.querySelector('[slot="main"]');
            if (slot) {
                this.slot = slot as HTMLElement;
            }
        }
    }
    getElement(): HTMLElement {
        return this.element;
    }
    addChild(child: Component): void {
        this.children.push(child);
        this.slot.appendChild(child.getElement());
    }
    removeChild(child: Component): void {
        const index = this.children.indexOf(child);
        if (index !== -1) {
        this.children.splice(index, 1);
        this.slot.removeChild(child.getElement());
        }
    }
    setSlot(name: string, component: Component): void {
        const slot = this.element.querySelector(`[slot="${name}"]`);
        if (slot) {
        slot.appendChild(component.getElement());
        }else{
            const newSlot = document.createElement('div');
            newSlot.setAttribute('slot', name);
            newSlot.appendChild(component.getElement());
            this.element.appendChild(newSlot);
        }
    }
}
export default Component;