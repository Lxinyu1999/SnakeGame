// 食物类
class Food {
  // 食物所对应的html元素
  element: HTMLElement; // HTMLElement 代表了所有 HTML 元素的类型。
  constructor() {
    // 获取html页面id为food的div元素
    this.element = document.getElementById("food") as HTMLElement; // 最好断言一下，要不ts不放心
  }

  /* 获取坐标轴：我们用访问器属性即get关键字，不使用数据属性 */
  // 获取X坐标（left，离左侧的距离）
  get X() {
    return this.element.offsetLeft; // offsetLeft 是一个只读属性，元素左边界相对于其最近的祖先元素的左边界的偏移量，通常以像素为单位
  }

  get Y() {
    return this.element.offsetTop;
  }

  // 随机移动食物的位置
  change() {
    // 食物的范围是0-290，random()生成(0-1)，我们乘29再用round四舍五入即可获取0-29的随机数
    // 最后要×10，为什么不直接乘290？因为我们希望食物的坐标是10的倍数（因为蛇的大小是10的倍数），不要过小的其他像素点。
    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10; // 生成两次
    // 最后设置element的坐标，这里必须用style.left/top,因为它是可修改的。
    this.element.style.left = left + "px"; // 转换为px
    this.element.style.top = top + "px";
  }

  // 食品的重置就是随机生成一下
  reset() {
    this.change(); // 假设 change 方法会随机设置食物的新位置
  }
}
// 测试一下
// const f = new Food();
// console.log(f.X, f.Y);
// f.change();
// console.log(f.X, f.Y);

export default Food;
