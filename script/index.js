// Data Storage Key for Local Storage
const STORAGE_KEY = 'tourist_places';

// Function to Get Data from Local Storage
function getPlaces() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Function to Save Data to Local Storage
function savePlaces(places) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
}

// Add Tourist Place (index.html)
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const rating = document.getElementById('rating').value;
  const type = document.getElementById('type').value;
  const picture = document.getElementById('picture').files[0];

  // Convert picture to Base64
  const reader = new FileReader();
  reader.onload = function () {
    const places = getPlaces();

    // Add new place
    places.push({
      name,
      address,
      rating,
      type,
      picture: reader.result,
    });

    // Save to Local Storage
    savePlaces(places);

    // Reset form and redirect
    document.querySelector('form').reset();
    alert('Tourist place added successfully!');
    window.location.href = 'list.html';
  };

  if (picture) {
    reader.readAsDataURL(picture);
  } else {
    alert('Please upload a picture.');
  }
}
