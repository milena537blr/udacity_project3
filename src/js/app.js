import helpers from './helpers';


class Rectangle {
  constructor(x1, x2, y1, y2) {
    (this.x1 = x1), (this.x2 = x2), (this.y1 = y1), (this.y2 = y2);
  }
}

class Hero {
  constructor(
    sprite = "images/enemy-bug.png",
    x = 10,
    y = 200,
    width = 101,
    height = 83,
    speed = 1
  ) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

class Enemy {
  constructor(
    sprite = "images/enemy-bug.png",
    x = 10,
    y = 200,
    width = 101,
    height = 83,
    speed = 1
  ) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  update() {
    this.x += this.speed;
    let rect1 = new Rectangle(
      this.x,
      this.x + this.width,
      this.y,
      this.y + this.height
    );
    let rect2 = new Rectangle(
      player.x,
      player.x + player.width,
      player.y,
      player.y + player.height
    );

    if (game.checkCollision(rect1, rect2)) {
      player.reset();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  setPosition(y) {
    this.y = y;
  }

  setSpeed(speed) {
    this.speed = speed;
  }
}

class Player {
  constructor(
    sprite = "images/char-princess-girl.png",
    width = 101,
    height = 80,
    x = game.initialX,
    y = game.initialY
  ) {
    this.sprite = sprite;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  update() {
    if (this.y <= 0) {
      this.reset(this);
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(movement) {
    switch (movement) {
      case "left":
        if (this.checkPosition(this.x, game.leapX)) {
          this.x -= game.leapX;
        }
        break;
      case "right":
        if (
          this.checkPosition(canvas.width - this.x - this.width, game.leapX)
        ) {
          this.x += game.leapX;
        }
        break;
      case "up":
        if (this.checkPosition(this.y, game.leapY)) {
          this.y -= game.leapY;
        }
        break;
      case "down":
        if (
          this.checkPosition(canvas.height - this.y - this.height, game.leapY)
        ) {
          this.y += game.leapY;
        }
        break;
      default:
        console.log("This key is not allowed");
    }
  }

  reset() {
    this.x = game.initialX;
    this.y = game.initialY;
  }

  checkPosition(position, leap) {
    return position >= leap;
  }
}

class Canvas {
  constructor(width = 505, height = 606) {
    this.width = 505;
    this.height = 606;
  }
}

class Game {
  constructor(
    amountEnemies = 3,
    leapX = 101,
    leapY = 80,
    initialX = 303,
    initialY = 320
  ) {
    this.amountEnemies = amountEnemies;
    this.leapX = leapX;
    this.leapY = leapY;
    this.initialX = initialX;
    this.initialY = initialY;
  }

  checkCollision(obj1, obj2) {
    return (
      helpers.checkIntersection(obj1.x1, obj1.x2, obj2.x1, obj2.x2) &&
      helpers.checkIntersection(obj1.y1, obj1.y2, obj2.y1, obj2.y2)
    );
  };

  cloneHero(amount) {
    for (let i = 1; i <= amount; i++) {
      allEnemies.push(new Enemy());
    }

    allEnemies.map(item => {
      item.setPosition(helpers.generateNumbers(300));
      item.setSpeed(helpers.generateNumbers(5));
      return item;
    });
  }
}

let game = new Game();
let canvas = new Canvas();
let player = new Player();
let allEnemies = [];

game.cloneHero(game.amountEnemies);

console.log(game);

document.addEventListener("keyup", function(e) {
  let allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

export { allEnemies, player };