import * as PIXI from "pixi.js"
import Reel from "./Reel";

class Reels extends PIXI.Container {
    constructor(ticker, renderer, config) {
        super();

        this.totalReels = config.totalReels;
        this.maskWidth = config.reelCellWidth * config.totalReels;
        this.maskHeight = config.reelCellHeight * config.reelVisibleCells;

        this.spinning = false;

        for (let i = 0; i < this.totalReels; i++) {
            const reel = new Reel(i, ticker, renderer, config);
            this.addChild(reel);
        }
        this.mask = this._rectangleMask();

        this.position = config.reelsPosition;
    }

    _rectangleMask(){
        const square = new PIXI.Graphics();
        square.beginFill();
        square.drawRect(0, 0, this.maskWidth, this.maskHeight);
        square.endFill();
        this.addChild(square);

        return square;
    }

    /**
     * Shuffle the cells in each reel.
     * @see Reel.shuffle
     */
    shuffle() {
        for (let i = 0; i < this.totalReels; i++) {
            this.getChildAt(i).shuffle();
        }
    }

    /**
     * Spins the reels and calls the cb after the animation.
     * @param cb callback function.
     * @see Reel.spin
     */
    spin(cb) {
        this.spinning = true;

        let spinningReels = this.totalReels;
        const onStop = () => {
            spinningReels --;
            if (!spinningReels) {
                cb();
                this.spinning = false;
            }
        }

        for (let i = 0; i < this.totalReels; i++) {
            this.getChildAt(i).spin(onStop);
        }
    }
}

export default Reels;