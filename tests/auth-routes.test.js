const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const User = require('../models/User')

const USER_MOCK =
{
  email: "tester@example.com",
  password: "12345678",
}
let USER_MOCK_TOKEN;

beforeAll(() => {

});
beforeEach(() => {
  jest.setTimeout(4000);
});

describe("GET / ", () => {
  test("It should respond with an Ok", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
describe("GET /profile ", () => {
  test("It should respond with unauthorized", async () => {
    const response = await request(app).get("/profile");
    expect(response.unauthorized).toBe(true);
  });
});



describe("POST /signup ", () => {
  test("It should respond with an Ok", async () => {
    const response = await request(app)
      .post("/signup")
      .set({ "content-type": "application/x-www-form-urlencoded" })
      .send(`email=${USER_MOCK.email}&password=${USER_MOCK.password}`)
    expect(response.unauthorized).toBe(false);
  });
});

describe("POST /login ", () => {
  test("It should sign in user", async () => {
    const response = await request(app)
      .post("/login")
      .set({ "content-type": "application/x-www-form-urlencoded" })
      .send(`email=${USER_MOCK.email}&password=${USER_MOCK.password}`)
    USER_MOCK_TOKEN = response.body.token
    expect(response.body.token).not.toBe(null);
  });
});

describe("GET /profile ", () => {
  test("It should respond with an Ok", async () => {
    const response = await request(app)
      .get("/profile")
      .set({
        "authorization": `Bearer ${USER_MOCK_TOKEN}`
      })
    expect(response.unauthorized).toBe(false);
  });
});

afterAll(async () => {
  const result = await User.deleteOne({ email: USER_MOCK.email })
  console.log(result)
  await mongoose.connection.close();
});



