// Import handle submit function from setDate.js 
import { setDate } from "../src/client/js/setDate";
// The setDate() function
describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        expect(setDate).toBeDefined();
    })
});