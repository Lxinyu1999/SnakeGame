/** ts里面会自动对数据进行类型限定，如果你已经给变量赋值了某种类型，就不可以再更改
 *  当然，为了防止你忘记你的限定，你可以使用注解，方法是一个冒号 let 变量:类型
 */
let w: number;
w = 100; // 没问题
// w = "one hundred" // 报错

/* 声明完变量可以直接赋值，此时会自动检测类型是否正确 */
let z: number = 100;

/* 即使你没有明确的指定类型，TypeScript也会依照类型推论的规则推断出一个类型。 
   换句话说：如果你直接赋值的话，可以省略变量类型的注解。
*/
// 我已经赋值String，不可修改为其他类型（即使你没有注解也会判定类型）
let x = "seven";
// x = 7; // Type 'number' is not assignable to type 'string'.

/* 如果你没有赋值，只是声明，也没有注解，那默认为any类型（相当于js中的变量，随便使用）*/
let a;
a = "seven";
a = 7;

/* 在函数形参中也可以使用类型注解，返回值也可以设置类型 */
function sum(a: number, b: number): number {
  // 最后的number表示返回值类型
  return a + b;
}
// 在js当中，函数的形参数量无限制；在ts里面，必须严格按照数量输入，多/少都会报错
console.log(sum(10, 20));

/* number: 包括小数，16进制等都算 */
let decimal: number = 6;
let hex: number = 0xf00d;
let double: number = 3.14;
/* boolean */
let flag: boolean = true;
/* string */
let str: string = "阿斯顿";

/* 可以使用或符号“ | ” 表示多种可能的类型
   该方法也可以用于表示值，被叫做字面量
*/
let multi: "red" | "blue" | "yellow";
// 多种类型可以混合
let x1: string | number;
// 使用字面量就表示值，此时用的还是冒号，不是等号
let x2: "one hundred" | 100; // x2只能等于这两个，有点类似于常量

/* 注意：基本类型应该都使用小写。大写表示包装类型，是对象！ */
let myBooleanObject: Boolean = new Boolean(true); // 不推荐使用
let myNumberObject: Number = new Number(42); // 不推荐使用
let myStringObject: String = new String("Hello"); // 不推荐使用

/* any表示任意类型，可以任意赋值。默认只声明就是any */
let an: any; // 等同于let an；相当于关闭了ts的类型检测
/* unknown表示未知类型，用法和any类似可以用任意值赋值，但不可赋值给其他变量 */
let au: unknown;
// x1 = au; // 不能将类型“unknown”分配给其他变量

/* null和undefined：这两个是所有类型的子类型。
也就是说 undefined 类型的变量，可以赋值给 number 类型的变量(但是我们的版本报错) */
let n: null;
let un: undefined;
// let x3: number = n; // 还是报错

/* void：用于表示没有任何返回值的函数。
   一般不用void给变量设置类型，如果设置只能赋值undefined或null
*/
function sayHi(): void {
  console.log("Hello,world");
}
/* never: 和void类似，也是表示不返回。
   特点在于：never真的什么都不返回，而void还返回一个undefined 
   经常配合throw抛出错误   
*/
function sayHi2(): never {
  throw "Never return";
}
/* 类型断言：用于明确告诉ts当前变量的类型（有时候ts无法推断你的数据类型） 
   经常用于从通用类型转换为更具体的类型
*/
let someValue: any = "This is a string";
let strLength = (someValue as string).length;
