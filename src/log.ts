export function log(...args: any[]) {
    console.log(new Date().toLocaleTimeString(), ...args);
}