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
    foo: 0,
    rawHtml: 'Using mustaches: <span style="color: red">This should be red.</span>',
    isButtonDisable: true,
    msage: "hello world",
    isRed: false
}

var app_2 = new Vue({
    el: "#app_2",
    data: app_2_data,
    /**
     * 计算属性:
     *      和普通的属性一样调用,但是其实是一个函数
     */
    computed: {
        reverMsageAttr: function () {
            return this.msage.split('').reverse().join("-");
        },
        now: function () {
            return new Date();
        },
        fullName: {
            // 计算属性的另外的写法, 一个属性可以有一个 get 和set 方法
            get: function () {
                return this.msage + "-" + foo;
            },
            set: function (foo) {
                this.foo = foo;
            }
        }
    },
    methods: {
        reverMsage: function () {
            return this.msage.split('').reverse().join("-");
        },
        getNow: function () {
            return new Date();
        }
    },
    /**
     * 监听器
     */
    watch: {
        foo: function (newFoo, oldFoo) {
            //监听 foo ,foo发生变化调用此方法
            console.log(newFoo, oldFoo)
            if (newFoo % 2 == 0) {
                this.isRed = true;
            }
        }
    },
    beforeCreate: function () {
        console.log('init')
    },
    created: function () {
        console.log('(created) a foo is:', this.foo);
    },
    /**
     * 加载的时候会触发
     */
    beforeMount: function () {
        console.log("beforeMount")
    },
    /**
     * 和上面的一样,加载的时候会触发,不知道两者有什么区别
     */
    mounted: function () {
        console.log("mounted");
    },
    /**
     * 数值的变化也会触发update 事件
     */
    beforeUpdate: function () {
        console.log('beforeUpdate')
    },
    updated: function () {
        console.log('updated');
    },
    beforeDestroy: function () {
        console.log('beforeDestroy')
    },
    destroyed: function () {
        console.log('destroyed')
    }
});

