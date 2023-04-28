const MILLISECONDS_PER_DAY = 86400000

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

export function formatDate(timestamp, options = {}) {
    if (!Object.keys(options).length) {
        if (Date.now() - timestamp < MILLISECONDS_PER_DAY) {
            options = { timeStyle: "short" }
        } else {
            options = {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        }
    }

    return (new Date(timestamp)).toLocaleString("en-US", options);
}
