export function formatBirthDate(value) {
  const birthDate = value;

  const parts = [
    birthDate.slice(0, 4),
    birthDate.slice(4, 6),
    birthDate.slice(6),
  ];

  const formatted = parts.join('.');

  return formatted;
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

export function calculateDate(inputDate) {
  // 입력된 날짜를 밀리초로 변환
  const inputTime = new Date(inputDate).getTime();
  
  // 현재 날짜를 밀리초로 변환
  const currentTime = new Date().getTime();
  
  // 두 날짜 간의 차이 계산 (밀리초)
  const timeDifference = currentTime - inputTime;
  
  // 밀리초를 초로 변환
  const seconds = Math.floor(timeDifference / 1000);
  
  // 초를 분으로 변환
  const minutes = Math.floor(seconds / 60);
  
  // 분을 시간으로 변환
  const hours = Math.floor(minutes / 60);
  
  // 시간, 일, 달, 년으로 변환
  if (hours < 1) {
    return '방금';
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (hours < 24 * 30) {
    return `${Math.floor(hours / 24)}일 전`;
  } else if (hours < 24 * 30 * 12) {
    return `${Math.floor(hours / (24 * 30))}달 전`;
  } else {
    return `${Math.floor(hours / (24 * 30 * 12))}년 전`;
  }
}

export function addCommas(number) {
  // 숫자를 문자열로 변환
  let numberString = number.toString();
  // 정규표현식을 사용하여 세 자리마다 쉼표 추가
  numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return numberString;
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const formattedDate = date.toISOString().split('T')[0]; // "yyyy-mm-dd" 형식으로 변환

  return formattedDate;
}

