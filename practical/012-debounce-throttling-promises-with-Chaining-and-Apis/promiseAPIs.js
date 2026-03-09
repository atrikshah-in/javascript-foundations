/**
 * Integration testing for async/await with native fetch API
 * Simulating real-world concurrent data requirements
 */

const fetchPublicIP = async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error("Networking issue");
    return response.json();
};

const fetchSamplePost = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/3');
    if (!response.ok) throw new Error("Post fetch failed");
    return response.json();
};

const fetchSampleComment = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments/1');
    return response.json();
};

const runConcurrentIntegrations = async () => {
    console.log("--- Initializing Real API Integration Tests ---");

    const activeRequests = [fetchPublicIP(), fetchSamplePost(), fetchSampleComment()];

    // 1. Strict Requirement Handling (Promise.all)
    try {
        const strictResults = await Promise.all(activeRequests);
        console.log("\n[Integration: all] Combined output from all endpoints:");
        console.dir(strictResults);
    } catch (error) {
        console.error("\n[Integration: all] A core endpoint failed:", error);
    }

    // 2. Comprehensive Status Capture (Promise.allSettled)
    const breakdown = await Promise.allSettled(activeRequests);
    console.log("\n[Integration: allSettled] Operations breakdown:");
    console.dir(breakdown);

    // 3. Fastest Response Handling (Promise.race)
    try {
        const fastest = await Promise.race(activeRequests);
        console.log("\n[Integration: race] First endpoint response received:");
        console.log(fastest);
    } catch (error) {
        console.error("\n[Integration: race] The fastest endpoint threw an error:", error);
    }

    // 4. Fallback Handling (Promise.any)
    try {
        const firstSuccess = await Promise.any(activeRequests);
        console.log("\n[Integration: any] First successful response captured:");
        console.dir(firstSuccess);
    } catch (error) {
        console.error("\n[Integration: any] All endpoints failed to respond:", error);
    }
};

runConcurrentIntegrations();