/**
 * Utility functions for performance optimization
 */

const createDebounce = (callback, wait) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, wait);
  };
};

const searchElement = document.getElementById("searchInput");
if (searchElement) {
  searchElement.addEventListener("input", createDebounce((event) => {
    console.log("[Debounce] Simulating search query:", event.target.value);
  }, 1000));
}


const createThrottle = (callback, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      callback.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

const actionBtn = document.getElementById("throttleBtn");
if (actionBtn) {
  actionBtn.addEventListener("click", createThrottle(() => {
    console.log("[Throttle] Action executed securely. Cooling down...");
  }, 2000));
}


/**
 * Core Promise behaviors and chaining
 */

const simulateInitialRequest = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Config loaded successfully");
  }, 1500);
});

console.log("--> Starting initial application phase");

simulateInitialRequest
  .then((result) => {
    console.log("Phase 1 Complete:", result);
    return "Parsing config metadata";
  })
  .then((metadata) => {
    console.log("Phase 2 Complete:", metadata);
  })
  .then(() => {
    console.log("Initialization sequence finalized.");
  })
  .catch((error) => {
    console.error("Critical error during init:", error);
  });

console.log("--> Background tasks initiated");


/**
 * Simulating concurrent async processes
 */

const loadModuleA = () => new Promise(resolve => setTimeout(() => resolve("Module A Active"), 1200));
const loadModuleB = () => new Promise(resolve => setTimeout(() => resolve("Module B Active"), 2200));
const loadModuleC = () => new Promise(resolve => setTimeout(() => resolve("Module C Active"), 3500));


// Testing Promise.all requirements
Promise.all([loadModuleA(), loadModuleB(), loadModuleC()])
  .then(results => console.log("\n[Promise.all Success] All modules running:", results))
  .catch(err => console.error("[Promise.all Failure] Loading aborted:", err));


// Testing Promise.allSettled behavior
Promise.allSettled([loadModuleA(), loadModuleB(), loadModuleC()])
  .then(results => console.log("\n[Promise.allSettled] Module loading statuses:", results));


// Testing Promise.race behavior
Promise.race([loadModuleA(), loadModuleB(), loadModuleC()])
  .then(fastest => console.log("\n[Promise.race] Quickest module to respond:", fastest));


// Testing Promise.any fallback
Promise.any([loadModuleA(), loadModuleB(), loadModuleC()])
  .then(firstComplete => console.log("\n[Promise.any] First module completed:", firstComplete))
  .catch(err => console.error(err));