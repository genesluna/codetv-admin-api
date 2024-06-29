import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe("Uuid Value Object Unit Tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");
  it("should throw error when uuid is empty", () => {
    expect(() => new Uuid("")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
  it("should throw error when uuid is invalid", () => {
    expect(() => new Uuid("invalid-uuid")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should accept valid uuid", () => {
    const uuid = new Uuid("6db17410-eddd-42b4-8e2c-b99ba3a876a8");
    expect(uuid.id).toBe("6db17410-eddd-42b4-8e2c-b99ba3a876a8");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
