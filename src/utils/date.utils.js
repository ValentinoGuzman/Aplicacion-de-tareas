export function getParsedDate(dateString) {
    return new Date(dateString);
}

export function isValidDate(date) {
    return !isNaN(date.getTime());
}