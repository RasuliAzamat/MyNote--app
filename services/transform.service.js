export class TransformService {
    static firebaseObjectToArray(firebaseObject) {
        return Object.keys(firebaseObject).map((key) => {
            const item = firebaseObject[key];
            item.id = key;

            return item;
        });
    }
}
