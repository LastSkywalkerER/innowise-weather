export default function isArraysEqual(array1, array2) {
  return (
    !array1.find((item, i) => array1[i] !== array2[i]) &&
    array1.length === array2.length
  );
}
