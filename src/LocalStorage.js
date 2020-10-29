export function readFromStorage(key) {
    if (typeof window.localStorage !== 'undefined') {
        console.log(`Reading ${key} from local storage`);
        // Code for localStorage/sessionStorage.
        //return JSON.parse(localStorage.getItem(key)); //this also works. but sir did like below
        let jsonString = localStorage.getItem(key);
        let deserialisedValue = JSON.parse(jsonString);
        return deserialisedValue; 
    } else {
        // Sorry! No Web Storage support..
        throw new Error('Cant read local storage!');
    }
}

export function writeToStorage(key, value) {
    if (typeof window.localStorage !== 'undefined') {
        // Code for localStorage/sessionStorage.
        //return localStorage.setItem(key, JSON.stringify(value)); //this also works. but sir did like below

        let serialised = JSON.stringify(value);
        return localStorage.setItem(key, serialised);

    } else {
        // Sorry! No Web Storage support..
        throw new Error('Cant write to local storage!');
    }
}