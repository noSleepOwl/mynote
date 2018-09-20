var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
var data = { a: 1 }
// 创建一个 vue 的实例
var vm = new Vue({
    data: data
});

console.log("vm.a == data.a", vm.a == data.a);
console.log("vm.a=", vm.a)
console.log("data.a=", data.a);
data.a = 3
console.log("data.a=", data.a)
console.log("vm.a=", vm.a)

var app_2_data = {
    foo: "bar"
}

var app_2 = new Vue({
    el: "#app_2",
    data: app_2_data
});
