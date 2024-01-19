class Snake {
  // 表示蛇元素
  snakeEle: HTMLElement;
  // 蛇头（蛇元素内部第一个div）
  head: HTMLElement;
  // 所有蛇元素（包括蛇头）
  bodies: HTMLCollection;
  constructor() {
    this.snakeEle = document.getElementById("snake") as HTMLElement;
    this.head = document.querySelector("#snake > div") as HTMLElement; // 获取snake元素内的第一个div
    this.bodies = this.snakeEle.getElementsByTagName("div"); // 先获取父元素div，然后获取内部所有div
  }

  // 获取蛇头坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  // 设置蛇头坐标
  set X(val) {
    // 因为我们每次只改X和Y中的一个，所以当X/Y没变化时就不用赋值了，剪枝。
    if (this.X === val) {
      return;
    }

    // 检查val值，蛇头范围要在0-300以内
    if (0 <= val && val < 300) {
      // 新加的：移动身体
      this.moveBody();
      this.head.style.left = val + "px";
      // 检查是否撞到身体
      this.checkHeadBody();
    } else {
      // 如果蛇头坐标超过0-300范围，说明撞墙
      // 撞墙，抛出错误
      throw new Error("Game Over！");
    }
  }
  set Y(val) {
    if (this.Y === val) {
      return;
    }
    if (0 <= val && val < 300) {
      this.moveBody();
      this.head.style.top = val + "px";
      // 检查是否撞到身体
      this.checkHeadBody();
    } else {
      throw new Error("Game Over!");
    }
  }

  // 蛇增加身体
  addBody() {
    // insertAdjacentHTML用于向element里面添加HTML代码，beforeend表示插入在当前元素snakeEle的最后位置
    this.snakeEle.insertAdjacentHTML("beforeend", "<div></div>"); // 插入一个div元素
  }

  // 蛇的身体也要移动
  moveBody() {
    /**
     * 将后边的身体设置为前面的身体（如果先移动前面的，后面就找不到前面在哪了）
     * 第4节=第3节
     * 第3节=第2节
     * ...
     */
    // 遍历获取所有身体，从后往前遍历
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // 检查蛇头是否撞到身体：很简单，就是判断蛇头的坐标和蛇身的坐标是否相同
  checkHeadBody() {
    // 获取所有身体
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      // 依次遍历判断，蛇身和蛇头是否相撞
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("Game Over");
      }
    }
  }

  // 重置蛇头到原点，并删除多余的身体
  reset() {
    this.head.style.left = "0px";
    this.head.style.top = "0px";

    // 移除除了蛇头以外的蛇身部分
    while (this.bodies.length > 1) {
      // 遍历直到只剩下蛇头
      // removeChild: 这是一个 DOM 方法，用于从 DOM 元素中移除一个子元素。
      this.snakeEle.removeChild(this.bodies[1]); // 每次都移除第二个元素
    }
  }
}
export default Snake;
