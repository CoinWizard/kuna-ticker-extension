export class ObjectUtility {

    static updateObject(oldObject: any, newValues: any): any {
        return Object.assign({}, oldObject, newValues);
    }

    static updateItemInArray(array: Array<any>, itemId: any, updateItemCallback: Function): Array<any> {
        return array.map(item => {
            if (item.id !== itemId) {
                // Since we only want to update one item, preserve all others as they are now
                return item;
            }

            return updateItemCallback(item);
        });
    }
}
