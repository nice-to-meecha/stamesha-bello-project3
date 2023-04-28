export function formatErrorMessage(errData) {
    if (typeof errData === "string") {
        return errData;
    }

    let message = "";
    const { errors } = errData
    if (errors) {
        message = Object.keys(errors)
            .map(key => errors[key].message || "")
            .join('\n')
            .trim();
        console.log("Message", message);
    }

    return message || errData.message || "";
}