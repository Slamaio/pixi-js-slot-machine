import * as PIXI from "pixi.js"

class Reel extends PIXI.TilingSprite {
    constructor(index, ticker, renderer, config) {
        super();

        const {
            reelCellHeight,
            totalReelCells,
            reelCellWidth,
            reelSpinFactor,
            reelSpeed,
            reelFeedback,
            reelFeedbackSpeed
        } = config;

        this.index = index;
        this.ticker = ticker;
        this.renderer = renderer;
        this.width = reelCellWidth;
        this.cellHeight = reelCellHeight;
        this.height = totalReelCells * reelCellHeight;
        this.totalCells = totalReelCells;
        this.texture = this._renderTexture();
        this.spinFactor = reelSpinFactor;
        this.speed = reelSpeed;
        this.x = index * this.width;

        this.feedback = reelFeedback;
        this.feedbackSpeed = reelFeedbackSpeed;

        this.shuffle();
    }

    _renderTexture() {
        return new PIXI.RenderTexture(
            new PIXI.BaseRenderTexture(
                this.width,
                this.height,
                PIXI.SCALE_MODES.LINEAR,
                1
            )
        );
    }

    // Generate a random array of reel cells.
    _genCells() {
        const cells = []
        for (let i = 0; i < this.totalCells; i++) {
            const num = i.toString().padStart(2, "0");
            const cell = PIXI.Sprite.from(`M${num}_000.jpg`);
            cells.push(cell);
        }
        this._shuffleArr(cells);
        return cells;
    }

    _shuffleArr(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    /**
     * Render a new reel texture with random cells.
     */
    shuffle() {
        this.cells = this._genCells();
        const reel = new PIXI.Container();
        for (let i = 0; i < this.totalCells; i++) {
            this.cells[i].y = this.cellHeight * i;
            reel.addChild(this.cells[i]);
        }

        this.renderer.render(reel, this.texture);
    }

    /**
     * Spins the reel set amount of times and calls the cb() after the animation
     * @see config.reelSpinFactor
     * @see config.reelSpeed
     * @see config.reelFeedback
     * @see config.reelFeedbackSpeed
     * @param cb callback function.
     */
    spin(cb){
        let animationCounter = this.height * this.spinFactor * (1 + this.index) + this.feedback;
        let feedbackCounter = this.feedback;

        // Spinning animation
        const animation = () => {
            if (animationCounter > 0) {
                this.tilePosition.y += this.speed;
                animationCounter -= this.speed;
            }
            else {
                this.tilePosition.y += animationCounter;
                this.ticker.remove(animation);
                this.ticker.add(feedback);
            }
        }

        // Visual feedback before the reel stops.
        const feedback = () => {
            if (feedbackCounter > 0) {
                this.tilePosition.y -= this.feedbackSpeed;
                feedbackCounter -= this.feedbackSpeed;
            }
            else {
                this.tilePosition.y -= feedbackCounter;
                this.ticker.remove(feedback);
                cb();
            }
        }

        this.ticker.add(animation);
    }
}

PIXI.Loader.shared.add('cells', './src/assets/cells.json');

export default Reel;