export function readFromStorage(key) {
    if (typeof window.sessionStorage !== 'undefined') {
        console.log(`Reading ${key} from local storage`);
        // Code for sessionStorage/sessionStorage.
        let jsonString = sessionStorage.getItem(key);
        let deserialisedValue = JSON.parse(jsonString);
        return deserialisedValue;
    } else {
        // Sorry! No Web Storage support..
        throw new Error('Cant read local storage!');
    }
}

export function writeToStorage(key, value) {
    if (typeof window.sessionStorage !== 'undefined') {
        // Code for sessionStorage/sessionStorage.
        let serialised = JSON.stringify(value);
        return sessionStorage.setItem(key, serialised);
    } else {
        // Sorry! No Web Storage support..
        throw new Error('Cant write to local storage!');
    }
}