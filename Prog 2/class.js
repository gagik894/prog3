class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        if (this.multiply >= 6) {
            this.mult()
        }
    }
    mult() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            let newGrass = new Grass(newX, newY, this.index);
            grassArr.push(newGrass);
            matrix[newY][newX] = this.index;
            this.multiply = 0;
        }
    }
}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    };

    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (this.energy >= 12 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            let newGrassEater = new GrassEater(newX, newY, this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newY][newX] = this.index;
            this.energy = 8
        };
    };

    eat() {
        let grass = this.chooseCell(1);
        if (!grass[0]) {
            this.move()
            return
        }
        let newCell = random(grass)
        let newX = newCell[0];
        let newY = newCell[1];

        matrix[this.y][this.x] = 0;
        matrix[newY][newX] = this.index;

        this.x = newX;
        this.y = newY
        this.energy++;
        for (const i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }

    }

    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells)
        if (!newCell) {
            return
        }
        let newX = newCell[0];
        let newY = newCell[1];

        matrix[this.y][this.x] = 0;
        matrix[newY][newX] = this.index;

        this.x = newX;
        this.y = newY
        this.energiminus();
    };

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (const i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    };

    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    };

    energiminus() {
        if (this.energy > 6) {
            this.energy -= 2
        } else {
            this.energy--
        }
    }
}

class MeatEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 14;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    };

    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (this.energy >= 16 && newCell) {
            console.log(1, meatEaterArr)
            let newX = newCell[0];
            let newY = newCell[1];
            let newMeatEater = new MeatEater(newX, newY, this.index);
            meatEaterArr.push(newMeatEater);
            matrix[newY][newX] = this.index;
            this.energy = 14
            console.log(2, meatEaterArr)
        };
    };

    eat() {
        let meat = this.chooseCell(2);
        if (!meat[0]) {
            this.move()
            return
        }
        let newCell = random(meat)
        let newX = newCell[0];
        let newY = newCell[1];

        matrix[this.y][this.x] = 0;
        matrix[newY][newX] = this.index;

        this.x = newX;
        this.y = newY
        this.energy += 2;
        for (const i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
        console.log(this.energy, "energi")
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells)
        if (!newCell) {
            return
        }
        let newX = newCell[0];
        let newY = newCell[1];

        matrix[this.y][this.x] = 0;
        matrix[newY][newX] = this.index;

        this.x = newX;
        this.y = newY;
        this.energiminus();
    };

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (const i in meatEaterArr) {
                if (this.x == meatEaterArr[i].x && this.y == meatEaterArr[i].y) {
                    meatEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    };

    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    };

    energiminus() {
        this.energy--
    }
}

class AllEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    };

    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (this.energy >= 30 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            let newAllEater = new AllEater(newX, newY, this.index);
            allEaterArr.push(newAllEater);
            matrix[newY][newX] = this.index;
            this.energy = 6
        };
    };

    eat() {
        let meat = this.chooseCell(2);
        let meatEater = this.chooseCell(3);
        let grass = this.chooseCell(1);
        if (!meat[0] && !grass[0] && !meatEater[0]) {
            this.move()
            return
        }
        if (meatEater[0]) {
            let newCell = random(meatEater)
            var newX = newCell[0];
            var newY = newCell[1];
            this.energy += 3;
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            this.x = newX;
            this.y = newY
            for (const i in meatEaterArr) {
                if (this.x == meatEaterArr[i].x && this.y == meatEaterArr[i].y) {
                    meatEaterArr.splice(i, 1);
                    break;
                }
            }
        } else if (meat[0]) {
            let newCell = random(meat)
            var newX = newCell[0];
            var newY = newCell[1];
            this.energy += 2;
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            this.x = newX;
            this.y = newY
            for (const i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        } else if (grass[0]) {
            let newCell = random(grass)
            var newX = newCell[0];
            var newY = newCell[1];
            this.energy++;
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            this.x = newX;
            this.y = newY
            for (const i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells)
        if (!newCell) {
            return
        }
        let newX = newCell[0];
        let newY = newCell[1];

        matrix[this.y][this.x] = 0;
        matrix[newY][newX] = this.index;

        this.x = newX;
        this.y = newY;
        this.energiminus();

    };

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (const i in allEaterArr) {
                if (this.x == allEaterArr[i].x && this.y == allEaterArr[i].y) {
                    allEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    };

    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    };

    energiminus() {
        if (this.energy > 8) {
            this.energy -= 2
        } else {
            this.energy--;
        }
    }
}