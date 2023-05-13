import * as PIXI from "pixi.js"

class Button extends PIXI.Sprite {
    constructor(activeTexture, inactiveTexture, disabledTexture) {
        super();
        this.activeTexture = activeTexture;
        this.inactiveTexture = inactiveTexture;
        this.disabledTexture = disabledTexture;
        this.buttonMode = true;
        this.setInactive();
    }

    // Use with switches
    setActive() {
        this.texture = this.activeTexture;
        this.interactive = true;
    }

    setInactive() {
        this.texture = this.inactiveTexture;
        this.interactive = true;
    }

    setDisabled() {
        this.texture = this.disabledTexture;
        this.interactive = false;
    }
}

export default Button;