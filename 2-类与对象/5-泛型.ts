/** 泛型用于创建多种可重用数据类型的组件
 *  语法：function 函数名<T>(变量名:T):T
 *  这里的T随意
 */
// 下面这个函数接收两个T类型的变量，返回一个T类型的数组
// 默认T为number类型
function myFn<T = number>(a: T, b: T): T[] {
  return [a, b];
}
myFn<Number>(3, 4);
// 更简短的方法是，number可以省略，因为ts会自动判断你的泛型指定的类型
myFn(3, 4);

// 修改T为string类型
myFn<string>("3", "111");

// 可以设置多个类型
function myFn2<T, K>(a: T, b: K): void {
  console.log(a, b);
}
myFn2<number, string>(2, "2");
