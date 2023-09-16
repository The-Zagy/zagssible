type TextNode = [Node: Node, FontSize: number, LineHeight: number];
const MIN_FONT_SIZE = 5;
const MAX_FONT_SIZE = 60;
class TextResizer {
    private textNodes: TextNode[];
    private sizeModifier = 1;
    
    constructor(private appId: string) {
        const body = document.querySelector('body');
        this.textNodes = this.getAllTextNodes(body!);
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                //set observer for new text nodes
                mutation.addedNodes.forEach((addedNode) => {
                    //check if added node is a text node, if so apply resize and append to textNodes
                    if (addedNode.hasChildNodes() && addedNode instanceof Element) {
                        //traverse and check if any children are text nodes
                        console.log(addedNode)
                        const textNodes = this.getAllTextNodes(addedNode);
                        console.log(textNodes)
                        textNodes.forEach((textNode) => {
                            this._resize(textNode);
                            this.textNodes.push(textNode);
                        });
                    }
                });
                //remove text nodes that are removed from the dom
                mutation.removedNodes.forEach((removedNode) => {
                    if (removedNode.nodeName === '#text') {
                        const index = this.textNodes.findIndex((node) => node[0] === removedNode);
                        this.textNodes.splice(index, 1);
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
            const body = document.querySelector('body');
            this.textNodes = this.getAllTextNodes(body!);
        });
    }
    resize(inOrOut: 'in' | 'out' = 'in') {
        if (inOrOut === 'in') {
            this.sizeModifier += 0.1;
            this.textNodes.forEach((node) => {
                this._resize(node);
            });
        } else {
            this.sizeModifier -= 0.1;
            this.textNodes.forEach((node) => {
                this._resize(node);
            });
        }
    }

    reset() {
        this.sizeModifier = 1;
        this.textNodes.forEach((node) => {
            this._resize(node);
        });
    }
    private _resize([node, fontSize, lineHeight]: TextNode): boolean {
        const newSize = fontSize * this.sizeModifier;
        if (newSize < MIN_FONT_SIZE || newSize > MAX_FONT_SIZE) return false;
        const newLineHeight = lineHeight * this.sizeModifier;
        const style = node.parentElement?.getAttribute('style') ?? '';
        const updatedStyle = style
            .split(';')
            .filter(Boolean)
            .map((s) => s.trim())
            .filter((s) => !s.startsWith('font-size:') && !s.startsWith('line-height:'))
            .concat([`font-size:${newSize}px; line-height:${newLineHeight}px;`])
            .join('; ');
        node.parentElement?.setAttribute('style', updatedStyle);
        return true;
    }
    private nodeFontSize(node: Node) {
        let sizeInPx = getComputedStyle(node.parentElement!).getPropertyValue('font-size');
        sizeInPx = sizeInPx.slice(0, sizeInPx.length - 2);
        let number = parseInt(sizeInPx);
        if (Number.isNaN(number) || number === 0) {
            return null;
        }
        return number;
    }
    private nodeLineHeight(node: Node) {
        let sizeInPx = getComputedStyle(node.parentElement!).getPropertyValue('line-height');
        if(sizeInPx === 'normal') {
            // Depends on the user agent. Desktop browsers (including Firefox) use a default value of roughly 1.2, depending on the element's font-family.
            // https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
           const fontSize =  this.nodeFontSize(node);
              if(fontSize) {
                return fontSize * 1.2;
              }else {
                return null;
              }
        }
        sizeInPx = sizeInPx.slice(0, sizeInPx.length - 2);
        let number = parseInt(sizeInPx);
        if (Number.isNaN(number) || number === 0) {
            return null;
        }
        return number;
    }
    private getAllTextNodes(node: Node): TextNode[] {
        const textNodes: TextNode[] = [];

        const appId = this.appId;
        const traverse = (node: Node) => {
            //check if id is the same as the app id, if so skip
            if (node.parentElement?.id === appId) return;
            if (
                node.nodeType === Node.TEXT_NODE &&
                node.textContent?.trim() !== '' &&
                node.textContent?.trim() !== '\n'
            ) {
                let fontSize = this.nodeFontSize(node);
                let lineHeight = this.nodeLineHeight(node);
                if (fontSize && lineHeight) {
                    textNodes.push([node, fontSize, lineHeight]);
                }
            } else {
                for (const childNode of Array.from((node as Element).childNodes)) {
                    traverse(childNode);
                }
            }
        }
        traverse(node);
        return textNodes;
    }
}

export default TextResizer;
