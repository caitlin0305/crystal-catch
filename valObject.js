class ValObject {
    x;
    y;
    speed;
    image;
    isBom;

    constructor(_x, _y, _speed, _image, _isBom = false) {
        this.x = _x;
        this.y = _y;
        this.speed = _speed;
        this.image = _image;
        this.isBom = _isBom;
    }

    update() {
        this.y = this.y + this.speed;
    }

    show() {
        image(this.image, this.x, this.y, 80, 80);
    }
}