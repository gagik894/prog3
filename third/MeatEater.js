
let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 14
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
        var grassEaterCells = super.chooseCell(2);
        var newCell = grassEaterCells[Math.floor(Math.random() * grassEaterCells.length)]
        
        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }
            }

            this.x = newX;
            this.y = newY;
            this.energy++;

            if (this.energy >= 16) {
                this.mul();
                this.energy = 8
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
            matrix[newY][newX] = 2
            meatEaterArr.push(new MeatEater(newX, newY, 3))
            this.energy = 16;
            if (weath == "winter") {
                this.energy -= 4;
                this.multiply -= 4;
            }
            if (weath == "summer") {
                this.energy += 2;
                this.multiply += 2;
            }
        }


    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
                break;
            }
        }
    }
}
