document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const localStorageKey = "touristPlacesData";

  // Retrieve existing data from localStorage
  function loadFromLocalStorage() {
    const data = localStorage.getItem(localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  // Save data to localStorage
  function saveToLocalStorage(data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  // Convert image file to Base64 string
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Get input values
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const rating = parseInt(document.getElementById("rating").value);
    const type = document.getElementById("type").value;

    const pictureInput = document.getElementById("picture");
    let picture = "default-placeholder.jpg"; // Default picture

    // If an image is selected, convert it to Base64
    if (pictureInput.files[0]) {
      try {
        picture = await getBase64(pictureInput.files[0]);
      } catch (error) {
        console.error("Error reading the image file:", error);
        alert("Failed to upload the image. Please try again.");
        return;
      }
    }

    // Validate inputs
    if (!name || !address || !rating || !type) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create a new place object
    const newPlace = {
      name,
      address,
      rating,
      type,
      picture,
    };

    // Load existing data, add the new place, and save back to localStorage
    const touristPlaces = loadFromLocalStorage();
    touristPlaces.push(newPlace);
    saveToLocalStorage(touristPlaces);

    // Redirect to the list page
    alert("New tourist place added successfully!");
    window.location.href = "list.html";
  });
});
