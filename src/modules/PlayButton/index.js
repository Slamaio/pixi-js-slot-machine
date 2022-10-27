import * as PIXI from "pixi.js";
import {config} from "../../config.js";
import Button from "../Button";

class PlayButton extends Button {
    constructor() {
        super(
            PIXI.Texture.from('btn_active.png'),
            PIXI.Texture.from('btn_inactive.png'),
            PIXI.Texture.from('btn_disabled.png')
        );
        this.position.set(config.playButtonPosition.x, config.playButtonPosition.y);
    }
}

PIXI.Loader.shared.add('playbutton', './src/assets/playbutton.json');

export default PlayButton;