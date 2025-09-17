const sum = (...nums) =>{
    return nums
    .filter(num => typeof num === 'number'&& !isNaN(num))
    .reduce((acc, curr) => acc + curr, 0);
}

const avg = (...nums) =>{
    const validNums = nums.filter(num => typeof num === 'number' && !isNaN(num));
    if (validNums.length === 0) return 0;
    const total = validNums.reduce((acc, curr) => acc + curr, 0);
    return (total / validNums.length).toFixed(2);
};
console.log(sum(1, 2, 3, 4, 5)); // Should print 15
console.log(sum(1, 'a', 3, null, 5)); // Should print 9
console.log(avg(1, 2, 3, 4, 5)); // Should print 3.00
console.log(avg(1, 'a', 3, null, 5));   // Should print 3.00
console.log(avg()); // Should print 0