
class TextResizer{
  private textNodes:[Node, number][]
  private sizeModifier = 1;
  constructor(){
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
        const newSize = node[1]*this.sizeModifier;
        node[0].parentElement!.setAttribute("style", `font-size:${newSize}px;`);
      });
    }else{
      this.sizeModifier -= 0.1;
      this.textNodes.forEach((node)=>{
        const newSize = node[1]*this.sizeModifier;
        node[0].parentElement!.setAttribute("style", `font-size:${newSize}px;`);
      }
      );
    }
  }
  private _resize(node:[Node, number]){
    const newSize = node[1]*this.sizeModifier;
    node[0].parentElement?.setAttribute("style", `font-size:${newSize}px;`);
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
  private getAllTextNodes(node: Node): [Node, number][] {
    const textNodes: [Node, number][] = [];
    const nodeFontSize = this.nodeFontSize;
    function traverse(node: Node) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "" && node.textContent?.trim() !== "\n") {
        let fontSize = nodeFontSize(node);
        if(fontSize){
          textNodes.push([node, fontSize]);
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