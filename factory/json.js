


export const getElementById = (jsonFile, id) => {
    const foundElement = jsonFile.find(element => element.id == id);
    if (foundElement) {
        return foundElement;
    } else {
        return null;
    }

}