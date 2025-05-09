// Form validation rules
export const validators = {
  // Required field validation
  required: (value) => {
    if (value === undefined || value === null || value === '') {
      return 'This field is required';
    }
    return '';
  },

  // Email validation
  email: (value) => {
    if (!value) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  },

  // Password validation
  password: (value) => {
    if (!value) return '';
    if (value.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number';
    }
    return '';
  },

  // Minimum length validation
  minLength: (min) => (value) => {
    if (!value) return '';
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return '';
  },

  // Maximum length validation
  maxLength: (max) => (value) => {
    if (!value) return '';
    if (value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return '';
  },

  // Todo title validation
  todoTitle: (value) => {
    if (!value) return 'Title is required';
    if (value.length < 3) {
      return 'Title must be at least 3 characters';
    }
    if (value.length > 100) {
      return 'Title must be no more than 100 characters';
    }
    return '';
  },

  // Todo description validation
  todoDescription: (value) => {
    if (!value) return '';
    if (value.length > 500) {
      return 'Description must be no more than 500 characters';
    }
    return '';
  },

  // Category name validation
  categoryName: (value) => {
    if (!value) return 'Category name is required';
    if (value.length < 2) {
      return 'Category name must be at least 2 characters';
    }
    if (value.length > 50) {
      return 'Category name must be no more than 50 characters';
    }
    return '';
  },

  // Due date validation
  dueDate: (value) => {
    if (!value) return '';
    const date = new Date(value);
    const today = new Date();
    if (date < today) {
      return 'Due date cannot be in the past';
    }
    return '';
  },

  // Confirm password validation
  confirmPassword: (password) => (value) => {
    if (!value) return 'Please confirm your password';
    if (value !== password) {
      return 'Passwords do not match';
    }
    return '';
  },

  // Username validation
  username: (value) => {
    if (!value) return 'Username is required';
    if (value.length < 3) {
      return 'Username must be at least 3 characters';
    }
    if (value.length > 30) {
      return 'Username must be no more than 30 characters';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return '';
  }
};

// Helper function to validate a field with multiple rules
export const validateField = (value, rules) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return '';
};

// Helper function to validate a form
export const validateForm = (values, rules) => {
  const errors = {};
  Object.keys(rules).forEach(field => {
    const fieldErrors = validateField(values[field], rules[field]);
    if (fieldErrors) {
      errors[field] = fieldErrors;
    }
  });
  return errors;
};