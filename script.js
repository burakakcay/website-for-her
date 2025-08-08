const leftImages = [
    "img/Sol-1.jpg",
    "img/Sol-2.jpg"
  ];
  
  const rightImages = [
    "img/Sağ-1.jpg",
    "img/Sağ-2.jpg"
  ];
  
  const imageElement = document.getElementById("imageDisplay");

  if (imageElement) {
    document.querySelector(".left").addEventListener("click", () => {
      const random = Math.floor(Math.random() * leftImages.length);
      imageElement.src = leftImages[random];
      imageElement.style.display = "block";
    });
    
    document.querySelector(".right").addEventListener("click", () => {
      const random = Math.floor(Math.random() * rightImages.length);
      imageElement.src = rightImages[random];
      imageElement.style.display = "block";
    });
  } 
  
  else {
    console.error("Element with ID 'imageDisplay' not found.");
  }


  // Pop up stuff 
  document.addEventListener("DOMContentLoaded", () => {

    const modalContainer = document.querySelector(".modal-container");
    const closeModal = document.getElementById("closeModal");

    modalContainer.classList.add("show");

    closeModal.addEventListener("click", () => {
      modalContainer.classList.remove("show");
    });
  });