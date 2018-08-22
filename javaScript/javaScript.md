# 继承的实现  
## [源自博客][fromBlog] 
``` javaScript
    // 定义一个动物类
    function Animal (name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function(){
        console.log(this.name + '正在睡觉！');
    }
    }
    // 原型方法
    Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃：' + food);
    };
```
---
### 原型链继承
* 核心: 将父类的实例作为子类的原型
```javaScript
    function Cat(){ 
    }
    
    Cat.prototype = new Animal();
    Cat.prototype.name = 'cat';

    //　Test Code
    var cat = new Cat();
    console.log(cat.name);
    console.log(cat.eat('fish'));
    console.log(cat.sleep());
    console.log(cat instanceof Animal); //true 
    console.log(cat instanceof Cat); //true
```
* 特点：

1. 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
2. 父类新增原型方法/原型属性，子类都能访问到
3. 简单，易于实现
* 缺点：

1. 要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中
无法实现多继承
2. 来自原型对象的引用属性是所有实例共享的（详细请看附录代码： 示例1）
4. 创建子类实例时，无法向父类构造函数传参

* 个人理解
这里比较好理解,原型定义的时候,就是一个对象,此方法将原型的方法对象替换成了父类的实例,父类中有的方法 在子类中也是有的,同事通过赋值的方法,将原型中的值替换,形成了子类独有的原型方法,
可以视为重写,其缺点中说明了,子类无法实现多继承,这一点对于使用java比较多的我觉的可能不是什么问题.


### 构造继承
```javaScript

function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true

```
* 特点：

1. 解决了1中，子类实例共享父类引用属性的问题
2. 创建子类实例时，可以向父类传递参数
3. 可以实现多继承（call多个父类对象）
* 缺点：
1. 实例并不是父类的实例，只是子类的实例
2. 只能继承父类的实例属性和方法，不能继承原型属性/方法
3. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

### 实例继承
* 核心：为父类实例添加新特性，作为子类实例返回
```javaScript
function Cat(name){
  var instance = new Animal();
  instance.name = name || 'Tom';
  return instance;
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // false
```

* 特点：

1. 不限制调用方式，不管是new 子类()还是子类(),返回的对象具有相同的效果
* 缺点：

1. 实例是父类的实例，不是子类的实例
2. 不支持多继承
* 个人理解 
此种继承的方式利用 javascript new 关键字的特性,在构造函数中返回一个父类的实例,复写是直接更改实例的属性指向达到复写的效果,给我的感觉像是继承更像是直接操作父类,只是更换了一个属性的名称
### 拷贝继承
```javascript
function Cat(name){
  var animal = new Animal();
  for(var p in animal){
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true
``` 

* 特点：

1. 支持多继承
* 缺点：

2. 效率较低，内存占用高（因为要拷贝父类的属性）
3. 无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）

### 组合继承
* 核心：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
```javascript
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Cat.prototype = new Animal();

// 感谢 @学无止境c 的提醒，组合继承也是需要修复构造函数指向的。

Cat.prototype.constructor = Cat;

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
```

* 特点：

1.弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
既是子类的实例，也是父类的实例
2. 不存在引用属性共享问题
3. 可传参
4. 函数可复用
* 缺点：

1. 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）


### 寄生组合继承

* 核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

```javascript
function Cat(name){
    // 在new 的时候执行,已经获取了父类的所有原型,所以此时执行初始化,拥有父类所有的方法
  Animal.call(this);
  this.name = name || 'Tom';
}
//此处会在加载的时候执行, 获取父类的原型
(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
})();

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true



Cat.prototype.constructor = Cat; // 需要修复下构造函数
``` 
* 特点：

1. 堪称完美
缺点：

2. 实现较为复杂


附录代码：
示例一：
``` javascript
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
  //实例引用属性
  this.features = [];
}
function Cat(name){
}
Cat.prototype = new Animal();

var tom = new Cat('Tom');
var kissy = new Cat('Kissy');

console.log(tom.name); // "Animal"
console.log(kissy.name); // "Animal"
console.log(tom.features); // []
console.log(kissy.features); // []

tom.name = 'Tom-New Name';
tom.features.push('eat');

//针对父类实例值类型成员的更改，不影响
console.log(tom.name); // "Tom-New Name"
console.log(kissy.name); // "Animal"
//针对父类实例引用类型成员的更改，会通过影响其他子类实例
console.log(tom.features); // ['eat']
console.log(kissy.features); // ['eat']
``` 

* 原因分析：

关键点：属性查找过程

执行tom.features.push，首先找tom对象的实例属性（找不到），
那么去原型对象中找，也就是Animal的实例。发现有，那么就直接在这个对象的
features属性中插入值。
在console.log(kissy.features); 的时候。同上，kissy实例上没有，那么去原型上找。
刚好原型上有，就直接返回，但是注意，这个原型对象中features属性值已经变化了。

[fromBlog]:https://www.cnblogs.com/humin/p/4556820.html "源自博客"