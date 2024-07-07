import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Entity Unit Tests", () => {
  let validateSpy: jest.SpyInstance;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });
  describe("Constructor", () => {
    it("should create a category with default values", () => {
      const category = Category.create({
        name: "Movie",
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it("should create a category with all values", () => {
      const created_at = new Date();
      const category = Category.create({
        name: "Movie",
        description: "Movie description",
        is_active: false,
        created_at,
      });

      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(created_at);
    });
  });

  describe("Static Methods", () => {
    describe("create", () => {
      it("should create a category", () => {
        const category = Category.create({
          name: "Movie",
        });
        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(category.name).toBe("Movie");
        expect(category.description).toBeNull();
        expect(category.is_active).toBeTruthy();
        expect(category.created_at).toBeInstanceOf(Date);
        expect(validateSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Methods", () => {
    describe("activate", () => {
      it("should activate a category", () => {
        const category = Category.create({
          name: "Movie",
          is_active: false,
        });
        expect(category.is_active).toBeFalsy();
        category.activate();
        expect(category.is_active).toBeTruthy();
      });
    });

    describe("deactivate", () => {
      it("should deactivate a category", () => {
        const category = Category.create({
          name: "Movie",
        });
        expect(category.is_active).toBeTruthy();
        category.deactivate();
        expect(category.is_active).toBeFalsy();
      });
    });

    describe("changeName", () => {
      const category = Category.create({
        name: "Movie",
      });

      it("should change name when name is valid", () => {
        expect(category.name).toBe("Movie");
        category.changeName("Movie 2");
        expect(category.name).toBe("Movie 2");
        expect(validateSpy).toHaveBeenCalledTimes(1);
      });

      it("should throw error when name is null", () => {
        expect(() => category.changeName(null)).containsErrorMessages({
          name: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        });
      });

      it("should throw error when name is undefined", () => {
        expect(() => category.changeName(undefined)).containsErrorMessages({
          name: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        });
      });

      it("should throw error when name is empty", () => {
        expect(() => category.changeName("")).containsErrorMessages({
          name: ["name should not be empty"],
        });
      });

      it("should throw error when name is not a string", () => {
        expect(() => category.changeName(123 as any)).containsErrorMessages({
          name: [
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        });
      });

      it("should throw error when name is longer than 255 characters", () => {
        expect(() =>
          category.changeName("a".repeat(256))
        ).containsErrorMessages({
          name: ["name must be shorter than or equal to 255 characters"],
        });
      });
    });

    describe("changeDescription", () => {
      const category = Category.create({
        name: "Movie",
      });

      it("should change description when description is valid", () => {
        expect(category.description).toBeNull();
        category.changeDescription("Movie description");
        expect(category.description).toBe("Movie description");
        expect(validateSpy).toHaveBeenCalledTimes(1);
      });

      it("should throw error when description is not a string", () => {
        expect(() =>
          category.changeDescription(123 as any)
        ).containsErrorMessages({
          description: ["description must be a string"],
        });
      });
    });

    describe("toJSON", () => {
      it("should convert a category to json", () => {
        const category = Category.create({
          name: "Movie",
          description: "Movie description",
          is_active: false,
        });

        expect(category.toJSON()).toStrictEqual({
          category_id: category.category_id.id,
          name: category.name,
          description: category.description,
          is_active: category.is_active,
          created_at: category.created_at,
        });
      });
    });
  });

  describe("Fields", () => {
    describe("category_id", () => {
      const arrange = [
        { category_id: null },
        { category_id: undefined },
        { category_id: new Uuid() },
      ];
      it.each(arrange)("id = %j", ({ category_id }) => {
        const category = Category.create({
          name: "Movie",
          category_id: category_id as any,
        });
        expect(category.category_id).toBeInstanceOf(Uuid);
        expect(validateSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("name", () => {
      it("should throw error when name is null", () => {
        expect(() => Category.create({ name: null })).containsErrorMessages({
          name: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        });
      });

      it("should throw error when name is undefined", () => {
        expect(() =>
          Category.create({ name: undefined })
        ).containsErrorMessages({
          name: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        });
      });

      it("should throw error when name is empty", () => {
        expect(() => Category.create({ name: "" })).containsErrorMessages({
          name: ["name should not be empty"],
        });
      });

      it("should throw error when name is not a string", () => {
        expect(() => Category.create({ name: 5 as any })).containsErrorMessages(
          {
            name: [
              "name must be a string",
              "name must be shorter than or equal to 255 characters",
            ],
          }
        );
      });

      it("should throw error when name is longer than 255 characters", () => {
        expect(() =>
          Category.create({ name: "a".repeat(256) })
        ).containsErrorMessages({
          name: ["name must be shorter than or equal to 255 characters"],
        });
      });
    });

    describe("description", () => {
      it("should throw error when description is not a string", () => {
        expect(() =>
          Category.create({ description: 5 } as any)
        ).containsErrorMessages({
          description: ["description must be a string"],
        });
      });
    });

    describe("is_active", () => {
      it("should throw error when is_active is not a boolean", () => {
        expect(() =>
          Category.create({ is_active: 5 } as any)
        ).containsErrorMessages({
          is_active: ["is_active must be a boolean value"],
        });
      });
    });
  });
});
