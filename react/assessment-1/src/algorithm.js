const arrayOfInts = [1, 2, 3, 4, 9, 5, 3, 1];
const target = 11;

const addsToTarget = (arr, k) => {
  let compliments = {};

  for (let i = 0; i < arr.length; i++) {
    const diff = k - arr[i];
    if (compliments[diff]) return [compliments[diff], i];
    else compliments[arr[i]] = i;
  }
  return [];
};

console.log(addsToTarget(arrayOfInts, target));
