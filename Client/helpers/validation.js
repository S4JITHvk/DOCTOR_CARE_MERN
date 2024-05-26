export const isEmpty = (value) => {
    return !value.trim();
};

export const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isPasswordValid = (password) => {
//     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return strongPasswordRegex.test(password);
    return password.length > 5;
};

export const passwordcheck = (password, confirmPassword) => {
    return password !== confirmPassword;
}
