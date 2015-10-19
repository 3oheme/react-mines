module.exports = function SquareItem(id, value) {
    this.key = id;
    this.number = value;
    this.revealed = false;
    this.bomb = false;
    this.flag = false;
}
