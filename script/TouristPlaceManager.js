class TouristPlaceManager {
  constructor() {
      this.localStorageKey = "touristPlaces";
      this.defaultDataFile = "./data/default_places.json"; // Adjust path as needed
      this.loadInitialData();
  }

  // Load default data into localStorage if it doesn't exist
  async loadInitialData() {
      const storedData = localStorage.getItem(this.localStorageKey);
      if (!storedData) {
          const response = await fetch(this.defaultDataFile);
          const defaultData = await response.json();
          localStorage.setItem(this.localStorageKey, JSON.stringify(defaultData));
      }
  }

  // Fetch all tourist places
  getAllPlaces() {
      return JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  // Add a new place to the list
  addPlace(newPlace) {
      const places = this.getAllPlaces();
      places.push(newPlace);
      localStorage.setItem(this.localStorageKey, JSON.stringify(places));
  }
}

export default TouristPlaceManager;
