# Lexical Environment, Scope Chain, TDZ, and Block Scope

## 1. Lexical Environment

A **Lexical Environment** is an internal structure that JavaScript uses to store variables and their references. It is created whenever:

- Global code starts running.
- A function is executed.
- A code block `{}` is entered.

### It contains two parts:

1. **Environment Record**: Where the actual variables and function declarations are stored.
2. **Outer Reference**: A pointer to the parent Lexical Environment (the scope outside).

### Example:

```javascript
let globalVar = "I am global";

function outer() {
  let outerVar = "I am outer";

  function inner() {
    let innerVar = "I am inner";
    console.log(innerVar); // Accesses current environment record
  }
  inner();
}
outer();
```

_Every time `outer()` or `inner()` is called, a new Lexical Environment is created._

---

## 2. Scope Chain

The **Scope Chain** is the mechanism JavaScript uses to resolve variable values. When you try to access a variable, JS follows a specific search path:

1. Checks the **current** Lexical Environment.
2. If not found, it follows the **Outer Reference** to the parent environment.
3. This continues until it reaches the **Global Environment**.
4. If still not found, it throws a `ReferenceError`.

**Crucial Point:** The scope chain is defined by where the code is **written** (Lexically), not where it is called.

### Example:

```javascript
let name = "Rahul";

function sayName() {
  console.log(name); // Looks in sayName's scope -> Not found -> Looks in Global -> Found!
}

function anotherFunction() {
  let name = "Khatwani";
  sayName();
}

anotherFunction(); // Output: "Rahul" (because sayName was defined in the global scope)
```

---

## 3. Temporal Dead Zone (TDZ)

The **Temporal Dead Zone (TDZ)** is the period between entering a scope and the actual initialization of a `let` or `const` variable.

- `let` and `const` variables are hoisted, but they are **not initialized**.
- Attempting to access them before the line where they are declared results in a `ReferenceError`.

### Example:

```javascript
{
  // TDZ for 'a' starts here
  // console.log(a); // ReferenceError: Cannot access 'a' before initialization

  let a = 10; // TDZ for 'a' ends here
  console.log(a); // Output: 10
}
```

---

## 4. Block Scope

**Block Scope** refers to variables that are only accessible within the curly braces `{}` they were defined in. This applies to `let`, `const`, and `class`.

- `var` is **not** block-scoped (it is function-scoped).
- Every block `{}` creates its own Lexical Environment.

### Example:

```javascript
if (true) {
  var functionScoped = "I am available outside";
  let blockScoped = "I am trapped here";
  const alsoBlockScoped = "Me too";
}

console.log(functionScoped); // Output: "I am available outside"
// console.log(blockScoped); // ReferenceError: blockScoped is not defined
```

---

## 🔥 How They All Connect (The Big Picture)

1. **Entering a Scope**: When you enter a block or function, JS creates a **Lexical Environment**.
2. **Forming the Chain**: This environment points to its parent, creating a **Scope Chain**.
3. **Execution**: During execution, `let` and `const` remain in the **TDZ** until the engine reaches their declaration.
4. **Encapsulation**: Using `{}` creates **Block Scope**, ensuring variables don't leak out and are managed within their specific Lexical Environment.
