export const generateRandomNumber = () => {
  // 1~9까지 숫자 이용
  const candidates = [1,2,3,4,5,6,7,8,9];

  // 4자리 숫자 이용
  const pickedNumbers = shuffle(candidates).splice(0, 4); 
  return pickedNumbers;
}

const shuffle = (array) => {
  // 숫자 랜덤하게 뽑음
  return array.sort(() => {
    return Math.random() - 0.5 // 범위 : -0.5 ~ 0.5
  })
}