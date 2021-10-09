

let LivingCreature = require('./LivingCreature')

module.exports = class AllEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 6;
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
        var meatEaterCells = super.chooseCell(3);
        var grassCells = super.chooseCell(1);
        for(let i = 0; i < meatEaterCells.length; i++){
            grassEaterCells.push(meatEaterCells[i])
        }
        for(let i = 0; i < grassCells.length; i++){
            grassEaterCells.push(grassCells[i])
        }
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

            if (this.energy >= 25) {
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
            matrix[newY][newX] = 4
            allEaterArr.push(new AllEater(newX, newY, 4))

            if (weath == "winter") {
                this.energy = 6;
                this.multiply =6;
            }else if (weath == "summer") {
                this.energy = 8;
                this.multiply = 8;
            }else{
                this.energy = 7;
                this.multiply = 7;
            }
        }


    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in allEaterArr) {
            if (allEaterArr[i].x == this.x && allEaterArr[i].y == this.y) {
                allEaterArr.splice(i, 1)
                break;
            }
        }
    }
}
