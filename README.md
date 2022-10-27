# pixi-js-slot-machine

Slot machine simulation made while learning Pixi.js

Game parameters are configurable through a configuration file.

![Gameplay](screenshots/gameplay.gif)

## Configuration
The [configuration file](./src/config.js) allows you to change, for
example, the game dimensions (width, height), the number of reels or visible reel cells.

### gameWidth
Game width in pixels.

### gameHeight
Game height in pixels.

### totalReels
Total number of reels.

### totalReelCells
Total number of reel cells.

### reelVisibleCells
Number of reel cells that are visible in the screen.

### reelSpinFactor
Number of full rotations each reel makes relative to its position.
Example:
Given `1` - The first reel will make one full rotation, 
the second reel will make 2 rotations and so on.

### reelSpeed
Number of pixels each reel will spin by at a time.

### reelCellWidth
Width of a reel cell item in pixels.

### reelCellHeight
Height of a reel cell item in pixels.

### reelsPosition
Position of the reels' container.

### buttonPosition
Position of the button container.

### reelFeedback
Number of pixels each reel will overshoot by to give the reels a visual feedback.

### reelFeedbackSpeed
Speed in pixels at which reels will return to the pivot position after overshooting.


## USAGE

1. Run `npm install`.
2. Run `npm run dev`.
