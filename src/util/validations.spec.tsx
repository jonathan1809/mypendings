import { isDueTodayOrTomorrow } from "./validations";

describe("isDueTodayOrTomorrow", () => {
  it.each([
    [`${new Date().toISOString().split("T")[0]}`, true],

    [
      `${
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
      }`,
      true,
    ],
    [
      `${new Date(
        new Date().getTime() + 2 * 24 * 60 * 60 * 1000
      ).toISOString()}`,
      false,
    ],

    // Test cases where date is not due today or tomorrow
    ["2021-11-30T12:34:56.789Z", false],
    ["2021-12-02T12:34:56.789Z", false],
  ])("returns %p when date is %p", (date: string, expected: boolean) => {
    expect(isDueTodayOrTomorrow(date)).toBe(expected);
  });
});
