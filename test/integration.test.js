const request = require('supertest');
const app = require('../src/app');


describe("GET /bingo/call ", () => {
  test("It should respond with an Int call and array of Int calls with status 200", async () => {
    const response = await request(app).get("/bingo/call");
      expect(response.statusCode).toBe(200);
      expect(response.body.call).toBeTruthy()
      expect(response.body.calls[0]).toEqual(response.body.call)
  });
});

describe("GET /bingo/cards/take ", () => {
  test("It should respond with an array int with center Free and cardNumber with status 200", async () => {
    const response = await request(app).get("/bingo/cards/take");
      expect(response.statusCode).toBe(200);
      expect(response.body.cardNumber).toBeTruthy()
      const card = response.body.card;
      for (let a = 0; a < 5; a++) {
        expect(card[a]).toHaveLength(5)
        for (let b = 0; b < 5; b++) {
          expect(card[a][b]).toBeTruthy()
        }
      }
      expect(card).toHaveLength(5)
      const center = card[2][2]
      expect(center).toEqual("FREE")
  });
});