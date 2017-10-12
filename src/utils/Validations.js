
export const validateEmptyField = (fieldValue) => {
    return typeof fieldValue === 'string' && fieldValue.trim().length > 0 ? 'success' : 'error'
}