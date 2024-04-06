class Validators {
    phoneCheck = (value) => !(/^\d{10}$/.test(value));
    emailCheck = (value) => !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value));
    everyFiled = (values) => {
        const isError = values.some((value) => {
            return !value || String(value).trim() === ""
        });

        return isError;
    }
}

export default new Validators();