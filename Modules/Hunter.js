
let LivingCreature = require('./LivingCreature')

module.exports = class Hunter extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 14;
    }


    move() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY
        }

        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }

 
    }
    eat() {
        var meatEaterCells = super.chooseCell(3);
        var newCell = meatEaterCells[Math.floor(Math.random() * meatEaterCells.length)]
        
        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            for (var i in hunterArr) {
                if (hunterArr[i].x == newX && hunterArr[i].y == newY) {
                    hunterArr.splice(i, 1)
                }
            }

            this.x = newX;
            this.y = newY;
            this.energy++;

            if (this.energy >= 16) {
                this.mul();
            }

        }
        else {
            this.move();
        }
    }

    mul() {
        let emptyCells = super.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 5
            hunterArr.push(new MeatEater(newX, newY, 5))
            if (weath == "winter") {
                this.energy = 12
            }else if (weath == "summer") {
                this.energy = 14
            }else{
                this.energy = 13
            }
        }


    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in hunterArr) {
            if (hunterArr[i].x == this.x && hunterArr[i].y == this.y) {
                hunterArr.splice(i, 1)
                break;
            }
        }
    }
}
