/** ts中的类
 *  可以为属性和方法设置变量类型
 */
class Person {
  // 定义实例属性,必须构造对象才能使用
  name: string = "孙悟空";
  age: number; // 可以不赋初始值，一般我们都这么写
  readonly noUse: number; // readonly表示只读

  // 注意：es6以前，constructor里面就是实例属性，只不过后面允许在外面使用了。
  // 如果你要用
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 定义静态属性，或者说类属性。由类名.id直接调用
  static id: string = "10001";

  // 定义实例方法
  sayHello(): void {
    console.log("hello world");
  }
  // 定义静态方法
  static sayHello(): void {
    console.log("Hello world by static");
  }
}
const p1 = new Person("dd", 1);
console.log(p1);
console.log(Person.id); // 类属性

/**
 * 修饰符：public（默认），protected（只允许子类使用），private（任何人不能使用）
 * 可以描述属性/方法
 */
class Animal {
  private id: string = "动物";

  protected name: string;
  protected age: number;
  //   public sex: boolean;

  /* 构造函数默认就是public，可以不写；如果你写private的构造函数，则该类不能被任何类继承/实例化；如果用protected，只能被继承 */
  constructor(name: string, public sex: boolean) {
    // 可以直接把类中的定义过程public sex:boolean放到构造函数里面，相当于主程序直接执行
    this.name = name;
    this.sex = sex;
  }

  protected eat(): void {
    console.log("Need eat!");
  }
}

/* 抽象类abstract：不允许被实例化，且方法都是抽象方法（函数签名）
   必须被继承，继承之后必须实现所有方法 */
abstract class People {
  public name;
  public age;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  // 抽象方法必须被后续子类实现，或者说叫做重写
  public abstract eat();
  public abstract sleep();
}
class Student extends People {
  public sno;
  constructor(name: string, age: number, sno: string) {
    super(name, age);
    this.sno = sno;
  }
  public eat() {
    console.log("I'm eating");
  }
  public sleep() {
    console.log("I'm sleeping");
  }
}
