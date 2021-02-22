export default function makeid() {
    // length: Entre 5 e 10 caracteres
    const length = Math.floor(Math.random() * (6) + 5);
    const result = (Date.now().toString(36) + Math.random().toString(36)).substr(-length)
    return result;
 }