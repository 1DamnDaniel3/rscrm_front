export function getAgeFromBirthdate(birthdateStr) {
  const birthdate = new Date(birthdateStr);
  const today = new Date();

  let age = today.getFullYear() - birthdate.getFullYear();

  // Проверяем, прошёл ли день рождения в этом году
  const hasBirthdayPassedThisYear =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());

  if (!hasBirthdayPassedThisYear) {
    age--;
  }

  return age;
}
