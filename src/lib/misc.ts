class Misc{
    private animationsEnabled: boolean = true;
    private appId: string;
    constructor(appId: string){
        this.appId = appId;
    }
    disableAnimations(){
        this.animationsEnabled = false;
        let style = `
        *, *:before, *:after {
            transition-property: none !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
            animation-duration: 0s !important;
            animation-play-state: paused;
          }
        `
        let styleElement = document.createElement("style");
        styleElement.setAttribute("id", `${this.appId}-disable-animations`);
        styleElement.innerHTML = style;
        document.head.appendChild(styleElement);
    }
    enableAnimations(){
        this.animationsEnabled = true;
        let styleElement = document.getElementById(`${this.appId}-disable-animations`);
        if(styleElement){
            styleElement.remove();
        }
    }
    toggleAnimations(){
        if(this.animationsEnabled){
            this.disableAnimations();
        }else{
            this.enableAnimations();
        }
    }

}
export default Misc;