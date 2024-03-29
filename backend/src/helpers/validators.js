export const everyFiled = (values) => {
    const isError = values.some((value) => {
        return !value || String(value).trim() === ""
    });

    return isError;
}

export const emailCheck = (value) => !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value));

export const phoneCheck = (value) => !(/^\d{10}$/.test(value));