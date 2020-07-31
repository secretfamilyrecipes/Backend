const supertest = require ("supertest")
const auth = require("./authRouter")
const db = require ("../data/dbConfig")

const creds = {
    username: "karana",
    email: "karanacesin@yahoo.com",
    password: "andros"
}

describe("POST /register", function () {
    beforeEach(async () => {
        await db("users")
      });

    it(" should respond with 201", function (){
        return supertest (auth)
        .post("/register")
        .send(creds)
        .then(res => {
            expect(res.status).toBe(201)
        })
        .catch(err => {
            console.log(err)
        })
    })

    it("should return token", function (){
        return supertest (auth)
        .post("/register")
        .send(creds)
        .then(res => {
            expect(res.body.token).toBeTruthy()
        })
        .catch(err => {
            console.log(err)
        })
    })
})

describe("POST /login", function () {
    beforeEach(async () => {
        await db("users")
      });

    it(" should respond with 200", function (){
        return supertest (auth)
        .post("/login")
        .send(creds)
        .then(res => {
            expect(res.status).toBe(200)
        })
        .catch(err => {
            console.log(err)
        })
    })

    it("should return token", function (){
        return supertest (auth)
        .post("/login")
        .send(creds)
        .then(res => {
            expect(res.body.token).toBeTruthy()
        })
        .catch(err => {
            console.log(err)
        })
    })
})