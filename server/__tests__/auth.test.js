import app from "../app"
import supertest from "supertest";

const request = supertest(app)

describe("POST /auth/setuserkey", () => {
    it("should return a 200", async () => {
        const response = await request
            .post("/auth/setuserkey")
            .set('Accept', 'application/json')
            .send({ uid: "1" })

        expect(response.status).toBe(200);
    })
})

describe("POST /auth/checkuserkey valid key", () => {
    it("should return a 200", async () => {
        const responseSetUserKey = await request
            .post("/auth/setuserkey")
            .set('Accept', 'application/json')
            .send({ uid: "testUser" })

        responseSetUserKey.text

        const response = await request
            .post("/auth/checkuserkey")
            .set('Accept', 'application/json')
            .send({ uid: "testUser", key: responseSetUserKey.text })

        expect(response.status).toBe(200);
    })
})

describe("POST /auth/checkuserkey invalid key", () => {
    it("should return a 401", async () => {
        const response = await request
            .post("/auth/checkuserkey")
            .set('Accept', 'application/json')
            .send({ uid: "testUser", key: "aaa" })

        expect(response.status).toBe(401);
    })
})