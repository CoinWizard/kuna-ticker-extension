/**
 * @param oldObject
 * @param newValues
 * @returns {({}&U)|({}&U&V&W)|({}&U&V)|any}
 */
export function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return Object.assign({}, oldObject, newValues);
}

/**
 * @param array
 * @param itemId
 * @param updateItemCallback
 */
export function updateItemInArray(array, itemId, updateItemCallback) {
    return array.map(item => {
        if (item.id !== itemId) {
            // Since we only want to update one item, preserve all others as they are now
            return item;
        }

        return updateItemCallback(item);
    });
}