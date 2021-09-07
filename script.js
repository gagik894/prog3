let matrix = [];
function matrixGen(matSz, gr, grEat, mtEat, allEat) {
    for (let y = 0; y < matSz; y++) {
        matrix[y] = [];
        for (let x = 0; x < matSz; x++) {
            matrix[y][x] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let y = Math.floor(Math.random() * matSz);
        var x = Math.floor(Math.random() * matSz);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let y = Math.floor(Math.random() * matSz);
        var x = Math.floor(Math.random() * matSz);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < mtEat; i++) {
        let y = Math.floor(Math.random() * matSz);
        var x = Math.floor(Math.random() * matSz);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < allEat; i++) {
        let y = Math.floor(Math.random() * matSz);
        var x = Math.floor(Math.random() * matSz);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
}

matrixGen(40, 1000, 400, 90, 2)
let side = 10;
var grassArr = [];
let grassEaterArr = [];
let meatEaterArr = [];
let allEaterArr = [];
let wather = false
function setup() {
    frameRate(4);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gre = new GrassEater(x, y, 2);
                grassEaterArr.push(gre);
            }
            else if (matrix[y][x] == 3) {
                var mee = new MeatEater(x, y, 3);
                meatEaterArr.push(mee);
            } else if (matrix[y][x] == 4) {
                var alle = new AllEater(x, y, 4);
                allEaterArr.push(alle);
            }
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0 && !wather) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 0 && wather) {
                fill("blue");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 4) {
                fill("whyte");
                rect(x * side, y * side, side, side);
            }
        }
    }

    let r = random(1)




    for (let i in meatEaterArr) {
        meatEaterArr[i].eat();
        meatEaterArr[i].mul();
        meatEaterArr[i].die();
    }
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();

    }


    for (let i in allEaterArr) {
        allEaterArr[i].eat();
        allEaterArr[i].mul();
        allEaterArr[i].die();
    }
    if (r > 0.9) {
        console.log(r)
        wather = true
        setTimeout(function () { wather = false }, 500);
        for (let i in allEaterArr) {
            allEaterArr[i].energiminus();
        }
        for (let i in meatEaterArr) {
            meatEaterArr[i].energiminus();
        }
        for (let i in grassEaterArr) {
            grassEaterArr[i].energiminus();
        }
        for (let i in grassArr) {
            grassArr[i].mult();
        }

    }
}

