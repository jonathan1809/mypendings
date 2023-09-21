import { replaceObject } from "./array";

describe("replaceObject", () => {
  it("replaces objects at given indices correctly", () => {
    const array = [1, 2, 3, 4];

    // Replace object at index 1 with object at index 3
    const result = replaceObject(array, 1, 3);

    expect(result).toEqual([1, 4, 3, 2]);
  });

  it("returns the original array when one or both indices are negative", () => {
    const array = [1, 2, 3, 4];

    // Negative originIndex
    const result1 = replaceObject(array, -1, 2);
    expect(result1).toEqual(array);

    // Negative destinationIndex
    const result2 = replaceObject(array, 1, -1);
    expect(result2).toEqual(array);

    // Both indices negative
    const result3 = replaceObject(array, -1, -2);
    expect(result3).toEqual(array);
  });
});
