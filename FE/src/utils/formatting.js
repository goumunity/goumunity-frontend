export function formatBirthDate(value) {

    const birthDate = value

    const parts = [
        birthDate.slice(0, 4),
        birthDate.slice(4, 6),
        birthDate.slice(6),
      ];

      const formatted = parts.join('.');

    return formatted
}

export function calculateAge(birthdate) {
  // birthdate는 'YYYYMMDD' 형식의 문자열로 전달됨
  const year = parseInt(birthdate.substring(0, 4), 10);
  const month = parseInt(birthdate.substring(4, 6), 10) - 1; // 월은 0부터 시작하므로 1을 빼줌
  const day = parseInt(birthdate.substring(6, 8), 10);

  const birthDate = new Date(year, month, day);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // 현재 날짜가 생일 전이라면 나이에서 1을 빼줌
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
