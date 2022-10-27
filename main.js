import './style.css'
import * as PIXI from "pixi.js"
import {config} from "./src/config.js";
import {Reels} from "./src/modules/reels.js";
import PlayButton from "./src/modules/PlayButton";


function createApplication() {
    const app = new PIXI.Application({
        backgroundColor: 0x23395D,
        width: config.gameWidth,
        height: config.gameHeight
    });
    app.renderer.view.style.position = 'absolute';

    return app;
}

function loadAssets(onComplete) {
    const loader = PIXI.Loader.shared;
    loader.onComplete.once(onComplete);
    loader.load();
}

window.onload = () =>
    loadAssets(() => {
        const app = createApplication();
        const stage = app.stage;

        const reels = new Reels(app.ticker, app.renderer);
        stage.addChild(reels);

        const button = new PlayButton();
        stage.addChild(button);

        button.on('pointerdown', function() {
            if (!reels.spinning) {
                this.setDisabled();
                reels.spin(() => {
                    this.setInactive();
                });
                reels.shuffle();
            }
        });

        document.body.appendChild(app.view);
    })
