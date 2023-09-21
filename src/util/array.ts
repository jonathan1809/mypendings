export const replaceObject = <T>(
  array: T[],
  originIndex: number,
  destinationIndex: number
) => {
  if (originIndex >= 0 && destinationIndex >= 0) {
    const tempObject = array[originIndex];
    array[originIndex] = array[destinationIndex];
    array[destinationIndex] = tempObject;
  }

  return array;
};
