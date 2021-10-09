let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {

    mul() {
        this.multiply++;
        if (this.multiply >= 6) {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (newCell) {
                    let x = newCell[0]
                    let y = newCell[1]
                    matrix[y][x] = 1
                    grassArr.push(new Grass(x, y, 1))
                    this.multiply = 0;
                if (weath == "winter") {
                    this.energy -= 2;
                    this.multiply =0;
                }
                if (weath == "spring") {
                    this.energy += 5;
                    this.multiply =0;
                }
                if (weath == "summer") {
                    this.energy += 3;
                    this.multiply =0;
                }
                if (weath == "autumn") {
                    this.energy--;
                    this.multiply = 0;
                }
            }

        }
    }
}