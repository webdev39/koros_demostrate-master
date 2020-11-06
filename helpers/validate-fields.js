export function validateFields(errors) {
    Object.keys(errors).map(function (objectKey, index) {
        if (document.getElementsByName(objectKey)[0]) {
            let className = document.getElementsByName(objectKey)[0].className;
            document.getElementsByName(objectKey)[0].className = className + ' inputError';

            let error = document.createElement('div');
            error.className = 'inputErrorMessage';
            error.innerHTML = errors[objectKey];

            document.getElementsByName(objectKey)[0].parentElement.append(error);
        }
    });
}

export function removeValidationsMessages() {
    let inputErrors = document.querySelectorAll('.inputError');
    inputErrors.forEach(function (data) {
        data.classList.remove('inputError');
    });
    let inputErrorMessages = document.querySelectorAll('.inputErrorMessage');
    inputErrorMessages.forEach(function (data) {
        data.remove();
    });
}

export function validateTextInput(e) {
    let char = e.key;
    let flag = /^[\d+.'-]$/i.test(char);
    if (flag) {
        e.preventDefault();
    }
}