// bind-polyfill.js
if (!Function.prototype.myBind) {
    Function.prototype.myBind = function (context, ...args) {
        const fn = this;

        return function (...newArgs) {
            return fn.apply(context, [...args, ...newArgs]);
        };
    };
}

const person = {
    name: "Atrik"
};

function greet(greeting, punctuation) {
    console.log(greeting + " " + this.name + punctuation);
}

const boundGreet = greet.myBind(person, "Hello");

boundGreet(" with extra arg");