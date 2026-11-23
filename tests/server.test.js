const request = require("supertest");
const app = require("../src/server");

describe("Server & Health Endpoints", () => {
  it("GET / returns running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/running/i);
  });

  it("GET /api/health returns success JSON", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Backend is running",
    });
  });

  it("handles CORS headers properly", async () => {
    const res = await request(app)
      .options("/api/health")
      .set("Origin", "https://madhuraecc.com")
      .set("Access-Control-Request-Method", "GET");

    expect(res.statusCode).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("https://madhuraecc.com");
  });
});
