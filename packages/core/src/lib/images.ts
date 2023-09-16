//some images may be hidden by design.
type Image = [Element: HTMLImageElement, Visiblity: string];
class Images {
    private images: Image[];
    private visible = true;
    constructor(private appId: string) {
        this.images = this.getAllImages(document.body);
        //watch for new images
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                //set observer for new text nodes
                mutation.addedNodes.forEach((addedNode) => {
                    if (addedNode instanceof HTMLImageElement) {
                        const visibilityStyle = window.getComputedStyle(addedNode).getPropertyValue('visibility');
                        const image:Image = [addedNode, visibilityStyle];
                        this.images.push(image);
                    } else if (addedNode.hasChildNodes() && addedNode instanceof Element) {
                        //traverse and check if any children are text nodes
                        const imageElements = this.getAllImages(addedNode);
                        imageElements.forEach((imageElement) => {
                            this.images.push(imageElement);
                            this.applyState(imageElement);
                        });
                    }
                });
                //remove text nodes that are removed from the dom
                mutation.removedNodes.forEach((removedNode) => {
                    if (removedNode instanceof HTMLImageElement) {
                        const index = this.images.findIndex((image) => image[0] === removedNode);
                        this.images.splice(index, 1);
                    }
                });
            });
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
        //on case of client side routing
        window.addEventListener('popstate', () => {
            this.images = this.getAllImages(document.body);
        });
    }
    private getAllImages(element: Element): Image[] {
        const imageElements: Image[] = [];
        const appId = this.appId;
        function traverse(element: Element) {
            //check if id is the same as the app id, if so skip
            if (element.id === appId) return;
            if (element instanceof HTMLImageElement) {
                //get image visibility
                const visibilityStyle = window.getComputedStyle(element).getPropertyValue('visibility');
                const image:Image = [element, visibilityStyle];
                imageElements.push(image);
            } else {
                for (const child of Array.from(element.childNodes)) {
                    if (child instanceof Element) traverse(child);
                }
            }
        }
        traverse(element);
        return imageElements;
    }
    hide() {
        this.images.forEach((image) => {
           this._hide(image);
        });
        this.visible = false;
    }
    private _hide(image: Image) {
        image[0].style.visibility = "hidden";
    }
    show() {
        this.images.forEach((image) => {
            this._show(image);
        });
        this.visible = true;
    }
    _show(image: Image) {
        image[0].style.visibility = image[1];
    }

    toggle() {
        this.visible ? this.hide() : this.show();
    }
    applyState(image: Image) {
        this.visible ? this._show(image) : this._hide(image);
    }


}

export default Images;