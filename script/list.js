import { touristPlaces } from "../data/data.js";

class TouristPlacesTable {
    constructor(data) {
        this.localStorageKey = "touristPlacesData";
        this.originalData = this.loadFromLocalStorage() || [...data];
        this.data = [...this.originalData];
        this.tableBody = document.querySelector("tbody");
        this.searchInput = document.getElementById("search-bar");

        // Modal and form elements
        this.modal = document.getElementById("update-modal");
        this.form = document.getElementById("update-form");
        this.nameInput = document.getElementById("update-name");
        this.addressInput = document.getElementById("update-address");
        this.ratingInput = document.getElementById("update-rating");
        this.pictureInput = document.getElementById("update-picture");
        this.cancelButton = document.getElementById("cancel-btn");

        this.currentUpdateIndex = null; // Track which place is being updated
    }

    // Save data to localStorage
    saveToLocalStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
    }

    // Load data from localStorage
    loadFromLocalStorage() {
        const data = localStorage.getItem(this.localStorageKey);
        return data ? JSON.parse(data) : null;
    }

    createRow(place, index) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${place.name}</td>
            <td>${place.address}</td>
            <td>${place.rating}</td>
            <td><img src="${place.picture}" alt="Picture of ${place.name}" width="100"></td>
            <td>
                <button class="update-btn" data-index="${index}">Update</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
        return row;
    }

    populateTable() {
        this.tableBody.innerHTML = "";
        const sortedPlaces = this.data.sort((a, b) => b.rating - a.rating);
        sortedPlaces.forEach((place, index) => {
            const row = this.createRow(place, index);
            this.tableBody.appendChild(row);
        });
        this.addActionListeners();
    }

    addActionListeners() {
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (e) => this.handleDelete(e));
        });
        document.querySelectorAll(".update-btn").forEach((button) => {
            button.addEventListener("click", (e) => this.handleUpdate(e));
        });
    }

    handleDelete(e) {
        const index = e.target.getAttribute("data-index");
        this.data.splice(index, 1);
        this.originalData = [...this.data]; 
        this.saveToLocalStorage(); 
        this.populateTable();
    }

    handleUpdate(e) {
        const index = e.target.getAttribute("data-index");
        const place = this.data[index];

      
        this.nameInput.value = place.name;
        this.addressInput.value = place.address;
        this.ratingInput.value = place.rating;
        this.pictureInput.value = place.picture;

        // Show modal
        this.modal.style.display = "flex";
        this.currentUpdateIndex = index; 
    }

    handleFormSubmit() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            
            this.data[this.currentUpdateIndex] = {
                name: this.nameInput.value,
                address: this.addressInput.value,
                rating: parseInt(this.ratingInput.value),
                picture: this.pictureInput.value,
            };

            this.originalData = [...this.data]; 
            this.saveToLocalStorage(); 
            this.modal.style.display = "none";
            this.populateTable();
        });

        this.cancelButton.addEventListener("click", () => {
            this.modal.style.display = "none";
        });
    }

    handleSearch() {
        this.searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            this.data = this.originalData.filter((place) =>
                place.name.toLowerCase().includes(query)
            );
            this.populateTable(); 
        });
    }
}

// Call the DOMContentLoaded event to initialize the table
document.addEventListener("DOMContentLoaded", () => {
    const localStorageKey = "touristPlacesData";


    if (!localStorage.getItem(localStorageKey)) {
        localStorage.setItem(localStorageKey, JSON.stringify(touristPlaces));
    }

    const storedPlaces = JSON.parse(localStorage.getItem(localStorageKey));

    const touristTable = new TouristPlacesTable(storedPlaces);

 
    touristTable.populateTable();
    touristTable.handleSearch();
    touristTable.handleFormSubmit();
});
