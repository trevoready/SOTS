import PocketBase from "pocketbase";
const client = new PocketBase('http://127.0.0.1:8422');
console.log(client);
// Export the client as a module
export default client;