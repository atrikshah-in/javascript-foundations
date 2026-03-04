# Async, Defer and Higher Order Functions

## 1. Script Loading: Without `async` and `defer`

By default, when the browser encounters a `<script>` tag, it pauses HTML parsing, fetches the script, executes it, and only then continues parsing the remaining HTML.

```html
<!-- HTML parsing pauses here until script is fetched & executed -->
<script src="script.js"></script>
```

**Problem:** This can lead to a "render-blocking" issue where the page remains blank or unresponsive while a large script is loading.

---

## 2. Using `async`

The `async` attribute allows the script to be downloaded in the background (asynchronously) while HTML parsing continues. However, as soon as the script finishes downloading, **HTML parsing pauses** to execute the script.

```html
<script async src="script.js"></script>
```

- **Execution Order:** Scripts execute as soon as they are ready. If you have multiple scripts, the order is not guaranteed.
- **Best for:** Independent scripts like ads, analytics (GA), or tracking pixels.

---

## 3. Using `defer`

The `defer` attribute also downloads the script in the background while HTML parsing continues. The key difference is that the script **only executes after the HTML parsing is completely finished**.

```html
<script defer src="script.js"></script>
```

- **Execution Order:** Scripts are executed in the exact order they appear in the HTML.
- **Best for:** Scripts that depend on the DOM being fully built or scripts that depend on each other.

### Comparison Summary

| Attribute   | HTML Parsing          | Execution Time          | Order Guaranteed? |
| ----------- | --------------------- | ----------------------- | ----------------- |
| **None**    | Paused (Fetch + Exec) | Immediately             | Yes               |
| **`async`** | Continued (Fetch)     | Immediately after fetch | No                |
| **`defer`** | Continued (Fetch)     | After DOM completion    | Yes               |

---

## 4. `type="module"`

When you use `type="module"`, the script behaves like it has the `defer` attribute by default. It also enables ES6 modules (`import`/`export`).

```html
<script type="module">
  import { hello } from "./module.js";
  hello();
</script>
```

- Modules are always deferred.
- They execute in strict mode.
- They support top-level `await`.

---

## 5. Higher Order Functions (HOF)

A **Higher Order Function** is a function that does at least one of the following:

1. Takes one or more functions as arguments.
2. Returns a function as its result.

### Example 1: Function as an Argument

```javascript
function greet(name) {
  return `Hello, ${name}`;
}

function processUserInput(callback) {
  const name = "Rahul";
  console.log(callback(name));
}

// processUserInput is the HOF
processUserInput(greet);
```

### Example 2: Built-in HOFs

Common array methods in JavaScript are Higher Order Functions.

```javascript
const radius = [1, 2, 3, 4];

// map is a Higher Order Function
const area = radius.map((r) => Math.PI * r * r);

console.log(area);
```

### Example 3: Returning a Function

```javascript
function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10
```
