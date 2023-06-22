export const ValidationMessages = {

    Login: {
        email: {
            required: 'Email is required',
            pattern: ' Please enter a valid email address',
        },
        password: {
            required: 'Password is required',
            pattern: ' Password must have 8 characters and contain at least one uppercase, one lowercase, one number, and one special character.',
        },
    },

    Registration: {
        firstName: {
            required: 'First name is required.',
        },
        lastName: {
            required: ' Last name is required.',
        },
        phoneNumber: {
            required: 'Phone number is required.',
            pattern: 'Invalid phone number. Please enter a 10-digit numeric value.'
        },
        email: {
            required: 'Email is required',
            pattern: ' Please enter a valid email address',
        },
        password: {
            required: 'Password is required',
            pattern: ' Password must have 8 characters and contain at least one uppercase, one lowercase, one number, and one special character.',
        },
        confirmPassword: {
            required: 'Confirm password is required.',
            pattern: 'Passwords do not match.'
        },
    },

    LostPassword: {
        email: {
            required: 'Email is required',
            pattern: ' Please enter a valid email address',
        }
    },

    ResetPassword: {
        password: {
            required: 'Password is required',
            pattern: ' Password must have 8 characters and contain at least one uppercase, one lowercase, one number, and one special character.',
        },
        confirmPassword: {
            required: 'Confirm password is required.',
            pattern: 'Passwords do not match.'
        },
    }

}