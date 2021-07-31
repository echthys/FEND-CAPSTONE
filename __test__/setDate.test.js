// Import setDate function from setDate.js 
import { setDate } from "../src/client/js/setDate";
// The setDate() function
describe("Testing the setDate function ", () => {
    test("ensure set date exists", () => {
        expect(setDate).toBeDefined();
    })
});