const getById = (id) => {
    return document.getElementById(id)
}

const passwordInputField = getById('password')
const confirmPasswordInputField = getById('confirm-password')
const form = getById('form')
const container = getById('container')
const loader = getById('loader')
const button = getById('submit')

const error = getById('error')
const success = getById('success')

error.style.display = 'none' 
success.style.display = 'none' 
container.style.display = 'none' 

let toke, userId;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/

window.addEventListener('DOMContentLoaded', async () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => {
            return searchParams.get(prop)
        }
    })
    token = params.token
    userId = params.userId

    const res = await fetch("/auth/verify-pass-reset-token",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token, userId })
        });
    if (!res.ok) {
        console.log(res)
        const { message } = await res.json()
        loader.innerText = message
        return
    }

    loader.style.display = "none";
    container.style.display = "block";

    
});

const displayError = (errorMessage) => {
    //remove if there is succes message
    success.style.display = "none";
    error.innerText = errorMessage;
    error.style.display = "block";
}


const displaySuccess = (successMessage) => {
    //remove if there is succes message
    error.style.display = "none";
    success.innerText = successMessage;
    success.style.display = "block";
}

const handleSubmit = async (evt) => {
    evt.preventDefault();

    //validate
    if (!passwordInputField.value.trim()) {
        //render error
        return displayError("Password is missing!")
    }
    if (!passwordRegex.test(passwordInputField.value)) {
        //render error
        return displayError("Password is too simple! Use alpha numeric with special characters.")
    }
    if (passwordInputField.value !== confirmPasswordInputField.value) {
        //render error
        return displayError("Passwords do not match!")
    }

    button.disable = true;
    button.innerText = "Please wait..."

    const res = await fetch("/auth/update-password",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token, userId, password: passwordInputField.value })
        });
    button.disable = false;
    button.innerText = "Reset password"

    if (!res.ok) {
        const { message } = await res.json()
        return displayError(message)
    }

    displaySuccess("Your password reset was successfull")
    passwordInputField.value = "";
    confirmPasswordInputField.value = "";

}

form.addEventListener('submit', handleSubmit)