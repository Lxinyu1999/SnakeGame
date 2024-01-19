/** 1. object类型
 *  对于引用类型，直接注解声明为一个object其实没什么用，因为引用类型太多了。
 */
let notUse: object = {};
// 怎么赋值对象都行
notUse = { name: "asdwel" };
notUse = new Array();
// 函数也行
notUse = function () {};

/** 更好的作法是使用接口结构来定义对象类型，关于接口的详细内容在后续讲解
 *  语法：let 变量：{属性名：属性值；属性名，属性值...}
 *  出现在{}里面的属性必须都实现（和java的接口一样）
 */
// 定义了p的样式：必须有name，age，可以有sex
let p: {
  name: string;
  age: number;
  //？表示属性可选
  sex?: boolean;

  // 表示p可以有任意数量的其他属性，属性名是字符串类型，属性值随意
  [propName: string]: any;
  // readonly表示只读属性
  readonly id: string;
};

p = {
  id: "001",
  name: "rtg",
  age: 24,
  我是一个任意字符串: "1123",
};

/* 类型别名：可以为类型修改名称，增加代码可读性 */
type id = string;
type nameResolver = () => string;
// 经常用于联合类型，表示multiType的值是以下三个字符串中的任意一个
type multiType = "success" | "failure" | "pending";
// 也用于复杂的对象类型，规定所有User类型的type值必须按照如下规则取：
type User = {
  name: string;
  age: number;
  sex: boolean;
};

/** 2. 函数的类型规定：有两种方式
 *  ① 类似一种箭头函数
 *  语法：(形参:类型, 形参:类型) => 返回值类型
 *  此时的函数还没有定义，需要定义函数逻辑以后才能完成（和接口类似）。
 *
 *  ② 直接写表达式：function 函数名(形参:类型，形参:类型)：返回值类型{}，表达式就可以直接用了
 *
 *  注：函数是对象类型
 */
// 这里的a和b名称可以变，我们没设置名称的要求。只规定了add函数
let add: (a: number, b: number) => number;
// 这里还没有完成，必须要把add具体实现了才可以
add = function (x: number, y: number) {
  return x + y;
};
add(1, 2); // 3

// 直接定义函数，定义完就能用
function add2(a: number, b: number): number {
  return a + b;
}
add2(1, 2);

/* 可选参数：使用 变量名? 为形参设置可选参数，注意：可选参数必须写在最后面 */
function buildName(firstName: string, lastName?: string) {
  return firstName + " " + lastName;
}
/* 为形参添加默认值，此时ts会将其默认设置为可选参数。添加完默认值，可以不必放在最后 */
function buildName2(firstName: string = "John", lastName: string) {
  return firstName + " " + lastName;
}

/* 函数重载：在ts里面是通过先写多个函数签名，最后再实现的方式 */
function getInfo(name: string): string;
function getInfo(age: number);
function getInfo(sex: boolean);
// 最后一定要实现该函数，对所有的参数实现不同的操作
function getInfo(value: string | number | boolean) {
  if (typeof value === "number") {
    return `Age: ${value}`;
  } else if (typeof value === "string") {
    return `Name: ${value}`;
  } else {
    return `Sex: ${value}`;
  }
}
// 之后就可以重载调用了
getInfo("Tom");
getInfo(24);
getInfo(true);

/** 3. 数组类型
 *  数组同样是对象类型
 *
 *  有两种定义方法：let 数组名:元素类型[]
 *                 let 数组名: Array<元素类型>
 */
let numArr: number[];
// 所有类型必须为number
numArr = [1, 3, 4, 6, 8];
// 数组的一些方法也必须符合类型规定
// numArr.push("8") // 错误，必须传入number类型

// 如果要出现任意类型，可以使用any
let list: any[] = [1, true, "555"];

/* 元组tuple：ts新引入的数据类型，和数组的区别在于不能改变长度 
   定义元组时必须声明全部类型，依然使用数组的壳子
   let 元组名:[类型1，类型2，...]
*/
let tuple: [string, number, boolean];
tuple = ["111", 222, true];
// 直接对某一项进行赋值是可以的
tuple[2] = false;

/** 4. 枚举类型
 *  枚举用于设置一组取值范围，且可以赋值为你想要的，编程友好的名称
 *  枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
 */
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}
// 赋值为Color不是所有值，而是只有一个值。
let c: Color = Color.Green;
console.log(c); // 1
// 也可以手动赋值，此时后面没赋值的时候依次+1
enum Days2 {
  Mon = 3.14,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}
