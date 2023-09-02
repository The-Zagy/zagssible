type TextNode = [Node:Node, FontSize:number, LineHeight:number];
class TextResizer{
  private textNodes:TextNode[]
  private sizeModifier = 1;
  constructor(private appId:string){
    const body = document.querySelector("body");
    this.textNodes = this.getAllTextNodes(body!);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        //set observer for new text nodes
        mutation.addedNodes.forEach((addedNode)=>{
          //check if added node is a text node, if so apply resize and append to textNodes
          if(addedNode.hasChildNodes() && addedNode instanceof Element){
            //traverse and check if any children are text nodes
            const textNodes = this.getAllTextNodes(addedNode);
            textNodes.forEach((textNode)=>{
              this._resize(textNode);
              this.textNodes.push(textNode);
            } 
            );
          }
        });
        //remove text nodes that are removed from the dom
        mutation.removedNodes.forEach((removedNode)=>{
        
          if(removedNode.nodeName === "#text"){
            const index = this.textNodes.findIndex((node)=>node[0] === removedNode);
            this.textNodes.splice(index,1);
          }
        }
        );
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    //on case of client side routing
    window.addEventListener("popstate",()=>{
      const body = document.querySelector("body");
      this.textNodes = this.getAllTextNodes(body!);
    }
    );

  }
  resize(inOrOut:"in"|"out" = "in"){
    if(inOrOut ==="in") {
      this.sizeModifier += 0.1;
      this.textNodes.forEach((node)=>{
        this._resize(node);
      });
    }else{
      this.sizeModifier -= 0.1;
      this.textNodes.forEach((node)=>{
        this._resize(node);
      }
      );
    }
  }

  reset(){
    this.sizeModifier = 1;
    this.textNodes.forEach((node)=>{
      this._resize(node);
    }
    );
  }
  private _resize(node:TextNode){
    const newSize = node[1]*this.sizeModifier;
    const newLineHeight = node[2]*this.sizeModifier;
    //get current style attribute
    const style = node[0].parentElement?.getAttribute("style");
    //check if style attribute exists
    if (style) {
      const updatedStyle = [];
      const styles = style.split(';');
      for (const s of styles) {
        const trimmed = s.trim();
        if (trimmed.startsWith("font-size:")) {
          updatedStyle.push(`font-size:${newSize}px;`);
        } else if (trimmed.startsWith("line-height:")) {
          updatedStyle.push(`line-height:${newLineHeight}px;`);
        } else {
          updatedStyle.push(trimmed);
        }
      }
      node[0].parentElement?.setAttribute("style", updatedStyle.join(' '));
    } else {
      node[0].parentElement?.setAttribute("style", `font-size:${newSize}px; line-height:${newLineHeight}px;`);
    }
  }
  private nodeFontSize(node:Node){
    let sizeInPx =  getComputedStyle(node.parentElement!).getPropertyValue("font-size");
    sizeInPx = sizeInPx.slice(0,sizeInPx.length-2);
    let number = parseInt(sizeInPx);
    if(Number.isNaN(number) || number ===0) {
      return null
    };
    return number;
  }
  private nodeLineHeight(node:Node){
    let sizeInPx =  getComputedStyle(node.parentElement!).getPropertyValue("line-height");
    sizeInPx = sizeInPx.slice(0,sizeInPx.length-2);
    let number = parseInt(sizeInPx);
    if(Number.isNaN(number) || number ===0) {
      return null
    };
    return number;
  }
  private getAllTextNodes(node: Node): TextNode[] {
    const textNodes: TextNode[] = [];
    const nodeFontSize = this.nodeFontSize;
    const nodeLineHeight = this.nodeLineHeight;
    const appId = this.appId;
    function traverse(node: Node) {
      //check if id is the same as the app id, if so skip
      if(node.parentElement?.id === appId) return;
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "" && node.textContent?.trim() !== "\n") {
        let fontSize = nodeFontSize(node);
        let lineHeight = nodeLineHeight(node);
        if(fontSize && lineHeight){
          textNodes.push([node, fontSize, lineHeight]);
        }
      } else {
        for (const childNode of (node as Element).childNodes) {
          traverse(childNode);
        }
      }
    }
  
    traverse(node);
    return textNodes;
  }
  
  
}

export  default TextResizer;