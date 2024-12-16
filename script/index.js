document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const localStorageKey = "touristPlacesData";

 
  function loadFromLocalStorage() {
    const data = localStorage.getItem(localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  
  function saveToLocalStorage(data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

   
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const rating = parseInt(document.getElementById("rating").value);
    const type = document.getElementById("type").value;

    const pictureInput = document.getElementById("picture");
    let picture = "../data/img/default-placeholder.png"; 

   
    if (pictureInput.files[0]) {
      try {
        picture = await getBase64(pictureInput.files[0]);
      } catch (error) {
        console.error("Error reading the image file:", error);
        alert("Failed to upload the image. Please try again.");
        return;
      }
    }

    
    if (!name || !address || !rating || !type) {
      alert("Please fill in all required fields.");
      return;
    }

    
    const newPlace = {
      name,
      address,
      rating,
      type,
      picture,
    };

  
    const touristPlaces = loadFromLocalStorage();
    touristPlaces.push(newPlace);
    saveToLocalStorage(touristPlaces);


    alert("New tourist place added successfully!");
    window.location.href = "../list.html";
  });
});
