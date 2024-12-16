export class TouristPlacesUtils {
    static localStorageKey = "touristPlacesData";

    // Save data to localStorage
    static saveToLocalStorage(data) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    }

    // Load data from localStorage
    static loadFromLocalStorage(defaultData = []) {
        const storedData = localStorage.getItem(this.localStorageKey);
        const localStorageData = storedData ? JSON.parse(storedData) : [];

        // Merge defaultData with localStorageData, avoiding duplicates
        const mergedData = [...localStorageData];
        defaultData.forEach((defaultPlace) => {
            if (!localStorageData.some((place) => place.name === defaultPlace.name)) {
                mergedData.push(defaultPlace);
            }
        });

        // Save the merged data back to localStorage to persist it
        this.saveToLocalStorage(mergedData);
        return mergedData;
    }

    // Convert image file to Base64 string
    static async getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }
}
