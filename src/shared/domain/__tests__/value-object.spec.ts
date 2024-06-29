import { ValueObject } from "../value-object";

class DummyValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexDummyValueObject extends ValueObject {
  constructor(readonly value: string, readonly value2: number) {
    super();
  }
}

describe("Value Object Unit Test", () => {
  it("should be equal", () => {
    const vo1 = new DummyValueObject("test");
    const vo2 = new DummyValueObject("test");
    expect(vo1.equals(vo2)).toBeTruthy();

    const cvo1 = new ComplexDummyValueObject("test", 1);
    const cvo2 = new ComplexDummyValueObject("test", 1);
    expect(cvo1.equals(cvo2)).toBeTruthy();
  });

  it("should not be equal", () => {
    const vo1 = new DummyValueObject("test");
    const vo2 = new DummyValueObject("test2");
    expect(vo1.equals(vo2)).toBeFalsy();
    expect(vo1.equals(null as any)).toBeFalsy();
    expect(vo1.equals(undefined as any)).toBeFalsy();

    const cvo1 = new ComplexDummyValueObject("test", 1);
    const cvo2 = new ComplexDummyValueObject("test", 2);
    expect(cvo1.equals(cvo2)).toBeFalsy();
    expect(cvo1.equals(null as any)).toBeFalsy();
    expect(cvo1.equals(undefined as any)).toBeFalsy();
  });
});
