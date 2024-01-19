/** 1. 接口可以用作对象的类型模板（ts特有）
 *  之前我们是直接把接口赋值给了变量类型 let p:{}
 *
 *  接口仅用于定义类型和对象的样子（有几个函数，几个属性），不作具体实现
 */
interface X {
  name: string;
  age: number;
  sex: boolean;
}
// 接口中的方法必须全部实现
let employee: X = {
  name: "Tom",
  age: 24,
  sex: true,
};

/** 2. 接口作为类的模板
 *  接口的本质还是抽象类，它是对类的抽象。表示类中一部分共存的行为的抽象
 *  类继承接口在这里称为实现implements，实现可以和继承共存
 */
interface Alarm {
  alert(): void;
}
// 一个类可以实现多个接口
interface Light {
  lighton(): void;
}
// 汽车具有报警器和灯光功能
class Car implements Alarm, Light {
  alert(): void {
    console.log("Someone use car");
  }
  lighton() {
    console.log("Lights on!");
  }
}
class Door {}
// 防盗门是门的子类，同时也具有报警器的功能，因此可以同时继承/实现
class SecurityDoor extends Door implements Alarm {
  alert(): void {
    console.log("Someone knocked!");
  }
}
