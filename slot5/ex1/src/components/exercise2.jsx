export function Exercise2() {
    const intArray = [14, -23, 5, 45, -7, 9, 12, -3, 8, -15];
    const names = ["ulicu", "Bobi", "Gharli", "David", "Eve", "Brank", "Grace", "eidi", "xvan", "Judy"];
    const　みなさん = [
        {id: 1, name: "Alice", age: 13 },
        {id: 2, name: "Bob", age: 14 },
        {id: 3, name: "Charlie", age: 32 },
        {id: 4, name: "David", age: 19 },
        {id: 5, name: "Eve", age: 13 },
        {id: 6, name: "Frank", age: 4 },
        {id: 7, name: "Grace", age: 17 },
        {id: 8, name: "Heidi", age: 102 },
        {id: 9, name: "Ivan", age: 18 },
        {id: 10, name: "Judy", age: 16 }
    ];
    const sum = intArray.reduce((acc, num) => acc + num, 0);
    const begaysungtrau = みなさん.filter(person => person.age >= 13 && person.age <= 19);
    const isTeen = (t) => t >= 13 && t <= 19;
    const p2 = みなさん[1];
    const isP2Teen = p2 => p2.age >= 13 && p2.age <= 19;
    return (
        <div>
            <h2>Chi tiết bài tập 2</h2>
            <ul>
                {intArray.map((num, index) => (<li key={index}>{num}</li>))}
            </ul>
            <p>Tong cac phan tu trong mang la: {sum}</p>

            <ul>
                {names.sort().map((name, index) => (<li key={index}>{name}</li>))}
            </ul>
            <p> Hiển thị danh sách người tuổi teen</p>
            <ul>
                {みなさん.map((person) => (<li key={person.id}>{person.name} - {person.age} tuổi</li>))}
            </ul>
            <p> Nhũng bro từ 13 tuổi đến tuổi bẻ gãy sừng trâu:</p>
            <ul>
                {begaysungtrau.map(person => (
                    <li key={person.id}>{person.name} - {person.age} tuổi</li>
                ))}
            </ul>
            <p>Số 2 phải tuổi teen không: {isP2Teen(p2) ? "Có" : "Không"}</p>
              
        </div>
    );

}

