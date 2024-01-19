// 下方积分类
class ScorePanel {
  score = 0;
  level = 1;
  levelMax = 10;

  // 分数和等级所在的元素，在构造函数中进行初始化
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  constructor() {
    this.scoreEle = document.getElementById("score") as HTMLElement;
    this.levelEle = document.getElementById("level") as HTMLElement;
  }

  // 设置加分方法
  addScore() {
    this.score++;
    this.scoreEle.innerHTML = this.score + ""; // 转换为字符串
    // 每加3分升一级
    if (this.score % 3 === 0) {
      this.levelUp();
    }
  }
  // 设置等级提升方法
  levelUp() {
    // 设置等级上限
    if (this.level < this.levelMax) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  }

  // 重置所有计分板内容
  reset() {
    this.score = 0;
    this.level = 1;
    this.scoreEle.innerHTML = "0";
    this.levelEle.innerHTML = "1";
  }
}
// const sc = new ScorePanel();
// for (let i = 0; i < 200; i++) {
//   sc.addScore();
// }
export default ScorePanel;
