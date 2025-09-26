export function Exercise8() {
    const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

    const stats = ages.reduce(
        (acc, age) => {
            acc.total += age;
            if (age < acc.min) acc.min = age;
            if (age > acc.max) acc.max = age;
            return acc;
        },
        { total: 0, min: Infinity, max: -Infinity }
    );

    const buckets = ages.reduce(
        (acc, age) => {
            if (age >= 13 && age <= 19) acc.teen += 1;
            if (age >= 20) acc.adult += 1;
            return acc;
        },
        { teen: 0, adult: 0 }
    );

    return (
        <div>
            <h1>Exercise 8</h1>
            <p>Total: {stats.total}, Min: {stats.min}, Max: {stats.max}</p>
            <p>Buckets: {JSON.stringify(buckets)}</p>
        </div>
    );
}