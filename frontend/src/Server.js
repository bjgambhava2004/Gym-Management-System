// server.js

const validatePassword = (password) => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordCriteria.test(password);
};

const login=async ( email,password) => { 
    const response = await fetch(`http://localhost:8000/account/api/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,  // Include seller if needed
        }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return  (await response.json())
}

const checkIfAlreadyEnrolled = async (userId) => {
    const response = await fetch(`http://localhost:8000/account/api/check_enrollment/${userId}`);
    const data = await response.json();

    if (data.enrolled) {
      return true  // User is already enrolled
    }

    return false
  };

module.exports = { validatePassword,
                    login,
                    checkIfAlreadyEnrolled,

                }; // Export the function
