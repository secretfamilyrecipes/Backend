const supertest = require("supertest");

const server = require("./server.js");

describe("server", function () {
    it("runs the tests", function () {
        expect(true).toBe(true);
    });

    describe("GET /", function () {
        it("should respond with 200", function () {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it("should respond with api: 'up'", function () {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.body.api).toBe("up");
                });
        });
    });
});
