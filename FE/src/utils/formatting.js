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

// export function calculateDate(timestamp) {
//   // 현재 날짜의 Unix 타임스탬프 가져오기
//   const now = new Date();
//   const nowTimestamp = Math.floor(now.getTime() / 1000);

//   // 주어진 타임스탬프를 현재 시간으로부터 얼마나 이전인지 계산
//   const secondsAgo = nowTimestamp - timestamp;
//   const daysAgo = Math.floor(secondsAgo / (60 * 60 * 24));

//   return daysAgo;
// }

export function calculateDate(givenTimestamp) {
  const givenDate = new Date(parseInt(givenTimestamp));
  const currentDate = new Date();

  // 두 날짜 간의 차이 계산 (milliseconds)
  const difference = givenDate - currentDate;

  // milliseconds를 일(day)로 변환
  const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (daysDifference < 1) {
    // 만약 하루보다 차이가 적다면 시간(hour) 단위로 반환
    const hoursDifference = Math.floor(difference / (1000 * 60 * 60));
    return `${hoursDifference}시간 전`;
  }

  return `${daysDifference}일 전`;
}


export function addCommas(number) {
  // 숫자를 문자열로 변환
  let numberString = number.toString();
  console.log(numberString)
  // 정규표현식을 사용하여 세 자리마다 쉼표 추가
  numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numberString;
}
