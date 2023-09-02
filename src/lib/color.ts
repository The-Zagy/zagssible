class Color{
    private saturation: number = 1;
    private contrast: number = 1;
    private brightness: number = 1;
    private inverted: boolean = false;

    invertColor(){
        this.inverted = !this.inverted;
        this.updateColor();
    }
    setSaturation(value:number){
        this.saturation = value;
        this.updateColor();
    }
    setContrast(value:number){
        this.contrast = value;
        this.updateColor();
    }
    setBrightness(value:number){
        this.brightness = value;
        this.updateColor();
    }
    highContrast(){
        this.saturation = 0;
        this.contrast = 2;
        this.brightness = 1;
        this.updateColor();
    }
    lowContrast(){
        this.saturation = 0;
        this.contrast = 1;
        this.brightness = 1;
        this.updateColor();
    }
    highSaturation(){
        this.saturation = 2;
        this.contrast = 1;
        this.brightness = 1;
        this.updateColor();
    }
    lowSaturation(){
        this.saturation = 0;
        this.contrast = 1;
        this.brightness = 1;
        this.updateColor();
    }
    saturate(){
        this.saturation += 0.1;
        this.updateColor();
    }
    desaturate(){
        this.saturation -= 0.1;
        this.updateColor();
    }
    contrastUp(){
        this.contrast += 0.1;
        this.updateColor();
    }
    contrastDown(){
        this.contrast -= 0.1;
        this.updateColor();
    }
    brightnessUp(){
        this.brightness += 0.1;
        this.updateColor();
    }
    brightnessDown(){
        this.brightness -= 0.1;
        this.updateColor();
    }
    reset(){
        this.saturation = 1;
        this.contrast = 1;
        this.brightness = 1;
        this.inverted = false;
        this.updateColor();
    }

    private updateColor(){
        const bodyStyle = document.body.style;
        bodyStyle.filter = `saturate(${this.saturation}) contrast(${this.contrast}) brightness(${this.brightness}) filter(${this.inverted?"invert(1)":"invert(0)"})`;
    }

}

export default Color;