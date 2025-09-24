export function Exercise1() {
  const double = (num) => num * 2;
  const isPositive = (num) => num > 0;

  return (
    <div>
      <p>こんばんわ／こにちわ／おはよよ, 先生!</p>
      <h2>Chi tiết bài tập 1</h2>
      <p>Ham double(5): {double(5)}</p>
      <p>
        isPositive 5: {isPositive(5) ? "Số Dương" : "Số Âm"}
      </p>
    </div>
  );
}