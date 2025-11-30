import { expect, jest } from "@jest/globals";

jest.unstable_mockModule("../../services/authServices.js", () => ({
  loginUser: jest.fn(),
  registerUser: jest.fn(),
  getCurrentUser: jest.fn(),
  logoutUser: jest.fn(),
  updateSubscription: jest.fn(),
  updateAvatar: jest.fn(),
}));

const authServices = await import("../../services/authServices.js");
const { loginController } = await import(
  "../../controllers/authControllers.js"
);

describe("loginController (unit)", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { email: "test@example.com", password: "password123" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  it("responds with token and user { email, subscription } as strings", async () => {
    authServices.loginUser.mockResolvedValue({
      accessToken: "fake-jwt-token",
      user: { email: "test@example.com", subscription: "starter" },
    });

    await loginController(req, res, next);
    expect(res.json).toHaveBeenCalledWith({
      accessToken: "fake-jwt-token",
      user: { email: "test@example.com", subscription: "starter" },
    });
  });
});
