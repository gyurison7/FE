export const onChangeNicknameHandler = (e, setNickname, setNicknameError) => {
    const value = e.target.value;
    setNickname(value);
    nicknameCheckHandler(value, setNicknameError);
};

export const nicknameCheckHandler = (nickname, setNicknameError) => {
    const nicknameCheck = /^.{1,10}$/;
    if (nickname === '') {
        setNicknameError('닉네임을 입력해주세요.');
        return false;
    } else if (!nicknameCheck.test(nickname)) {
        setNicknameError('닉네임은 10자 이하로 입력해주세요.');
        return false;
    } else {
        setNicknameError('');
        return true;
    }
};

export const imageHandler = (e, setChosenFile, setProfileImage) => {
    const file = e.target.files[0];
    setChosenFile(file);
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
};