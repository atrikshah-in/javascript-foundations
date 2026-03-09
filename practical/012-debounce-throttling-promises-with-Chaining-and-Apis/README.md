# Advanced JavaScript Concepts Repository

This project contains practical implementations of core asynchronous patterns and event optimization techniques in JavaScript. Rather than just theory, these are functional scripts demonstrating how these mechanics behave in a browser environment.

## Event Optimization Techniques

### Debouncing (`index.js`)
When binding heavy operations to high-frequency events (like a search input typing or window resizing), debouncing prevents the function from firing until the user pauses for a given duration. This greatly reduces unnecessary function calls and potential API spam.
- Tested by typing in the search bar. The console will only log the value after a continuous pause in typing.

### Throttling (`index.js`)
Throttling guarantees that a function will not fire more than once within a specified time frame, no matter how aggressively the event triggers.
- Tested by spam-clicking the action button. The logged action will strictly lock itself to the cooldown timer.

## Asynchronous Data Strategies

### Promise Chains
Demonstrates standard non-blocking control flow using Promises, `setTimeout` for pseudo-delays, and standard `.then()` `.catch()` chaining to sequence distinct pipeline steps.

### Concurrency Modifiers (`index.js` & `promiseRealAPIsTest.js`)
JavaScript offers tools to manage multiple async operations running parallelly. I've tested these using both simulated local timers and external API calls (`fetch` via `async`/`await`).

- **`Promise.all`**: Used when you have a strict requirement for all requests to succeed. Fails immediately if one request rejects.
- **`Promise.allSettled`**: Ideal for dashboards or batch systems. Waits for everything to finish processing and returns the status of each, ignoring individual failures.
- **`Promise.race`**: Locks onto the absolute fastest response (whether it's a success or a failure). Handful for setting strict timeouts against slow requests.
- **`Promise.any`**: An optimistic pattern. It returns the very first *successful* operation, ignoring initial rejections unless every single promise fails.

## Setup
Simply open `index.html` in any modern web browser and open the developer tools (F12) console to observe the asynchronous outputs and input interactions.
