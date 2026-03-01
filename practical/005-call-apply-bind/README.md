# JavaScript bind() Polyfill

## 📌 What is bind?

`bind()` creates a new function where:

- `this` is permanently bound to provided context
- Optional arguments can be pre-filled

---

## 🔎 Why Polyfill?

To understand how bind works internally.

---

## 🛠 Implementation Logic

```js
Function.prototype.myBind = function (context, ...args) {
  const fn = this;

  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};