import { touristPlaces } from "../data/data.js";

class TouristPlacesTable {
    constructor(data) {
        this.originalData = [...data]; // Keep original data for search
        this.data = data; // Data currently displayed
        this.tableBody = document.querySelector("tbody"); // Table body element
        this.searchInput = document.getElementById("search-bar"); // Search bar input
    }

    // Function to create a row for a single tourist place
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

    // Function to populate the table with tourist places
    populateTable() {
        this.tableBody.innerHTML = ""; // Clear existing rows

        // Sort the places by rating in descending order
        const sortedPlaces = this.data.sort((a, b) => b.rating - a.rating);

        // Create and append rows for each tourist place
        sortedPlaces.forEach((place, index) => {
            const row = this.createRow(place, index);
            this.tableBody.appendChild(row);
        });

        // Add event listeners for action buttons
        this.addActionListeners();
    }

    // Function to add event listeners for update and delete buttons
    addActionListeners() {
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (e) => this.handleDelete(e));
        });

        document.querySelectorAll(".update-btn").forEach((button) => {
            button.addEventListener("click", (e) => this.handleUpdate(e));
        });
    }

    // Function to handle the delete action
    handleDelete(e) {
        const index = e.target.getAttribute("data-index");
        this.data.splice(index, 1); // Remove place from array
        this.populateTable();
    }

    // Function to handle the update action
    handleUpdate(e) {
        const index = e.target.getAttribute("data-index");
        const place = this.data[index];
        alert(`Update feature is under development for: ${place.name}`);
    }

    // Function to handle search input
    handleSearch() {
        this.searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();

            // Filter the original data based on search query
            this.data = this.originalData.filter((place) =>
                place.name.toLowerCase().includes(query)
            );

            // Re-populate the table with filtered data
            this.populateTable();
        });
    }
}

// Initialize the table and populate it on page load
document.addEventListener("DOMContentLoaded", () => {
    const touristTable = new TouristPlacesTable(touristPlaces);
    touristTable.populateTable();
    touristTable.handleSearch(); // Activate search functionality
});
