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

// 이미지 파일인지 확인
export const validateImageType = (file) => {
    return file.type.startsWith('image/');
};

// 이미지 크기 확인 (5MB 이하)
export const validateImageSize = (file, maxSizeMB = 3) => {
    const maxSize = maxSizeMB * 1024 * 1024; // MB -> Bytes 변환
    return file.size <= maxSize;
};