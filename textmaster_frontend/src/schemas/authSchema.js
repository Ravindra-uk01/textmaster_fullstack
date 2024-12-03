import * as yup from 'yup';

export const loginSchema = yup.object({
    email : yup.string()
    .email('Invalid email format') // Validates that the input is in email format
    .required('Email is required'), 
    password:  yup.string()
    .min(8, 'Password must be at least 8 characters long') // Minimum length
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    //   'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    // )
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // At least one lowercase letter
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // At least one uppercase letter
    .matches(/[0-9]/, 'Password must contain at least one number') // At least one number
    .matches(/[\W_]/, 'Password must contain at least one special character') // At least one special character
    .required('Password is required'), 
})

export const registrationSchema = yup.object({
  first_name : yup.string()
  .required('First name is required'),
  email : yup.string()
    .email('Invalid email format') // Validates that the input is in email format
    .required('Email is required'), 
  password:  yup.string()
    .min(8, 'Password must be at least 8 characters long') // Minimum length
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'
    )
    .required('Password is required'), 
  confirm_password: yup.string()
    .required('Confirm Password is required') 
    .oneOf([yup.ref('password'), null], 'Passwords must match'), 
})

export const resetPasswordSchema = yup.object({
  password: yup.string()
   .min(8, 'Password must be at least 8 characters long') // Minimum length
   .matches(
     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
     'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'
   )
   .required('Password is required'), 
   confirm_password: yup.string()
   .required('Confirm Password is required') 
   .oneOf([yup.ref('password'), null], 'Passwords must match'), 
})