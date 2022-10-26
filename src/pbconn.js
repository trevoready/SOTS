import PocketBase from "pocketbase";
const client = new PocketBase('http://10.0.0.33:8292');
console.log(client);
// Export the client as a module
export default client;