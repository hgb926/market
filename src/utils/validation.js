// 이메일 검증
export const validateEmail = (email) => {
    return email && email.includes("@") && email.includes(".") && email.endsWith("com");
};

// 비밀번호 검증
export const validatePassword = (password) => {
    return {
        hasNumber: /\d/.test(password), // 숫자 포함 여부
        isValidLength: password.length >= 8, // 길이 검증
        hasSpecialChar: /[!@#$%^&*?_~]/.test(password) // 특수문자 포함 여부
    };
};

// 닉네임 검증
export const validateNickname = (nickname) => {
    return {
        isValidLength: nickname.length >= 4 && nickname.length <= 10, // 글자수 4~10
        hasNotSpecialChar: /^[a-zA-Z0-9]+$/.test(nickname) // 특수문자 미포함
    };
};