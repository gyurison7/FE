export const onChangePasswordHandler = (e, password, confirm, setPassword, setConfirm, setPasswordError, setConfirmError) => {
  const { name, value } = e.target;
  if (name === 'password') {
    setPassword(value);
    passwordCheckHandler(value, confirm, setPasswordError, setConfirmError);
  } else {
    setConfirm(value);
    passwordCheckHandler(password, value, setPasswordError, setConfirmError);
  }
};

export const passwordCheckHandler = (password, confirm, setPasswordError, setConfirmError) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s)(?!.*[^a-zA-Z\d!@#$%^&*]).{8,16}$/;
  console.log('password', password); // TODO : 테스트 완료 후 삭제하기
  console.log('confirm', confirm);
  if (password === '') {
    setPasswordError('비밀번호를 입력해주세요.');
    return false;
  } else if (!passwordRegex.test(password)) {
    setPasswordError(
      '비밀번호는 8~16자의 영문, 숫자, 특수문자(!@#$%^&*)를 모두 포함하여야 합니다.'
    );
    return false;
  } else if (confirm !== password) {
    setPasswordError('');
    setConfirmError('비밀번호가 일치하지 않습니다.');
    return false;
  } else {
    setPasswordError('');
    setConfirmError('');
    return true;
  }
};
