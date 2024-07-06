export const isEmpty = (value) => {
  return !value.trim();
};
export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const isPasswordValid = (password) => {
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long.",
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }
  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one digit.",
    };
  }
  if (!/[@$!%*?&]/.test(password)) {
    return {
      valid: false,
      message:
        "Password must contain at least one special character (@, $, !, %, *, ?, &).",
    };
  }
  return {
    valid: true,
    message: "Password is valid.",
  };
};
export const passwordcheck = (password, confirmPassword) => {
  return password !== confirmPassword;
};
