// 콘솔창 계산기
// 사용법: 개발자 도구 Console에서 start() 실행
function start() {
  const expression = prompt(
    "계산식을 입력하세요.",
    "1 + 2 * 3 - 5 / 6"
  );

  if (expression === null) {
    console.log("계산을 취소했습니다.");
    return;
  }

  const trimmedExpression = expression.trim();

  if (trimmedExpression === "") {
    console.log("계산식을 입력해 주세요.");
    return;
  }

  // 숫자, 소수점, 사칙연산, 괄호, 공백만 허용합니다.
  if (!/^[0-9+\-*/().\s]+$/.test(trimmedExpression)) {
    console.log("숫자와 +, -, *, /, 괄호만 사용할 수 있습니다.");
    return;
  }

  try {
    // JavaScript의 연산 우선순위에 따라 *, /가 먼저 계산됩니다.
    const result = Function(`"use strict"; return (${trimmedExpression})`)();

    if (!Number.isFinite(result)) {
      console.log("0으로 나눌 수 없습니다.");
      return;
    }

    console.log(`${trimmedExpression} = ${result}`);
  } catch (error) {
    console.log("올바른 계산식을 입력해 주세요.");
  }
}

console.log("콘솔 계산기 준비 완료! start()를 입력하세요.");
