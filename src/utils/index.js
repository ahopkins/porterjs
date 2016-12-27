export const findAttribute = (element, attribute) => {
    // let a = element.getAttribute(attribute)
    // if (a !== undefined) return a

    while (element.parentNode) {
        let a = element.getAttribute(attribute)
        if (a !== undefined && a !== null) {
            return a
        }
        element = element.parentNode
    }
    return null
}