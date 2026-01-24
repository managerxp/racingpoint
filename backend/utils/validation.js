export const validateRegistration = (data) => {
  const errors = [];
  
  // Required fields
  if (!data.firstName?.trim()) {
    errors.push('First name is required');
  }
  
  if (!data.lastName?.trim()) {
    errors.push('Last name is required');
  }
  
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!data.password) {
    errors.push('Password is required');
  } else if (data.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!data.confirmPassword) {
    errors.push('Confirm password is required');
  }
  
  if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  // Optional fields validation
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Please enter a valid phone number');
  }
  
  if (data.dob) {
    const dobDate = new Date(data.dob);
    const today = new Date();
    
    if (dobDate > today) {
      errors.push('Date of birth cannot be in the future');
    }
    
    // Check if user is at least 13 years old
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 13);
    
    if (dobDate > minAgeDate) {
      errors.push('You must be at least 13 years old');
    }
  }
  
  return errors;
};

export const validateLogin = (data) => {
  const errors = [];
  
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!data.password) {
    errors.push('Password is required');
  }
  
  return errors;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Export all validation functions
export default {
  validateRegistration,
  validateLogin,
  isValidEmail,
  isValidPhone
};