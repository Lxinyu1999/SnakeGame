import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
// 控制之前的所有元素
class GameControl {
  // 定义三个属性
  score: ScorePanel; // 蛇
  food: Food; // 食物
  snake: Snake; // 计分牌
  constructor() {
    this.score = new ScorePanel();
    this.food = new Food();
    this.snake = new Snake();
  }

  // 创建一个属性存储蛇的移动方向
  direction: string = "";
  // 判定是否存活，true的时候移动，否则不移动
  isLive: boolean = true;

  //   keydownHandler(event: KeyboardEvent) {
  //     // 检查：用户按其他不合法键时，
  //     this.direction = event.key;
  //   }

  // 创建键盘按下的回调函数，用户按下按键时，修改direction属性
  keydownHandler(event: KeyboardEvent) {
    // 允许的方向键映射
    const allowedKeys: { [key: string]: string } = {
      ArrowUp: "Up",
      ArrowDown: "Down",
      ArrowLeft: "Left",
      ArrowRight: "Right",
    };
    let key = event.key;
    let newDirection = allowedKeys[key];
    if (newDirection && this.canChangeDirection(newDirection)) {
      this.direction = newDirection;
    }
  }

  // 检查是否可以改变方向
  canChangeDirection(newDirection: string): boolean {
    // 如果当前没有方向（游戏刚开始），允许任何方向
    if (this.direction == "") {
      return true;
    }
    // 长度为1时可以随意换方向
    if (this.snake.bodies.length === 1) {
      return true;
    }
    // 定义不允许的方向改变
    const forbiddenChanges: { [key: string]: string } = {
      Up: "Down",
      Down: "Up",
      Left: "Right",
      Right: "Left",
    };
    return this.direction !== forbiddenChanges[newDirection];
  }

  // 游戏初始化，调用后，游戏即开始
  init() {
    // 绑定键盘按键按下事件
    document.addEventListener("keydown", this.keydownHandler.bind(this)); // 注意，传入的回调函数是document，所以要么bind指向当前this，要么直接用箭头函数

    // 开始移动
    this.run();
  }
  // 让蛇移动
  run() {
    // 向上：top值减少，向下：top值增加。向左：left减少；向右：left增加。
    // 先获取蛇头现在坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    // 根据你的方向选择
    switch (this.direction) {
      case "Up":
        Y -= 10;
        break;

      case "Down":
        Y += 10;
        break;

      case "Left":
        X -= 10;
        break;

      case "Right":
        X += 10;
        break;
    }

    // 检查是否吃了食物
    this.checkEat(X, Y);

    /* 尝试修改蛇的坐标：这里会进行两项检查，第一个是蛇是否撞墙，第二个是蛇是否撞到自身。
       如果遇到上述两种情况就throw错误被catch到，随后重启整个游戏reset()       
    */
    try {
      //修改蛇的坐标（如果按的话）
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      // 出现错误，游戏结束, 把flag设为false
      alert(`${e.message} Your score is ${this.score.score}.`);
      this.isLive = false;
    }

    /*
        在定时器里面再次调用run方法，让它不停移动run()。
        为什么会不停移动？因为你按下了某个方向（假设为右）以后，init被激活，direction随之被修改并一直储存你上一次按下的结果。
        之后开始每隔300ms调用run方法，如果你不按其他键，那么会按照300ms的频率一直往direction的方向run()，也就是移动
        因此时间间隔越短，表示每次run的间隔就越短，蛇的移动速度就越快。
  */
    // flag为true说明蛇还存活，游戏继续
    if (this.isLive) {
      setTimeout(() => {
        this.run();
      }, 300 - (this.score.level - 1) * 30); // 设置一个根据level使得间隔越来越小的表达式，最高速是30ms
    } else {
      // flag为false的情况，说明游戏结束了，启用reset方法
      this.reset();
    }
  }

  /* 检查是否吃到食物 */
  checkEat(X: number, Y: number) {
    // 如果食物坐标和蛇头坐标相同，则说明吃到了食物
    if (this.food.X === X && this.food.Y === Y) {
      // 改变食物位置
      this.food.change();
      // 增加分数
      this.score.addScore();
      // 蛇要增加一节
      this.snake.addBody();
    }
  }

  // 重置方法
  reset() {
    this.snake.reset();
    this.food.reset();
    this.score.reset();

    this.direction = "";
    this.isLive = true;

    // 重新启动游戏
    // 注意：监听键盘事件从一开始编译以后就一直存在，所以只需用重启run方法即可，它会根据direction移动。
    this.run();
  }
}
export default GameControl;
