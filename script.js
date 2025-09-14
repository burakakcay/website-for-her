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

  // Debug düğmesi: hotspotları görünür yap/kapat
const btn = document.getElementById('toggleDebug');
if (btn) {
  btn.addEventListener('click', () => {
    document.body.classList.toggle('debug');
    btn.textContent = 'Debug: ' + (document.body.classList.contains('debug') ? 'Açık' : 'Kapalı');
  });
}

// SVG içinde tıkladığın noktayı konsola yazdır (koordinat ölçümü kolay olsun)
const svg = document.querySelector('svg.map');
if (svg) {
  svg.addEventListener('click', (e) => {
    // Sadece arka plana tıklayınca raporla (hotspot üstüne tıklarsan gitmesin)
    if (e.target.tagName.toLowerCase() === 'image' || e.target === svg) {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM().inverse();
      const loc = pt.matrixTransform(ctm);
      console.log(`Tıklanan SVG noktası: x=${Math.round(loc.x)}, y=${Math.round(loc.y)}`);
    }
  });
}

// Ok tuşlarıyla seçili rect/circle'ı nudge et (enter/space ile seç)
let selected = null;

document.querySelectorAll('.hotspot').forEach(el => {
  el.setAttribute('tabindex', '0');
  el.addEventListener('focus', () => selected = el);
  el.addEventListener('blur',  () => selected = null);
});

document.addEventListener('keydown', (e) => {
  if (!selected) return;
  const tag = selected.tagName.toLowerCase();
  const step = (e.shiftKey ? 10 : 1); // Shift ile 10px

  if (tag === 'rect') {
    let x = +selected.getAttribute('x') || 0;
    let y = +selected.getAttribute('y') || 0;
    if (e.key === 'ArrowLeft')  selected.setAttribute('x', x - step);
    if (e.key === 'ArrowRight') selected.setAttribute('x', x + step);
    if (e.key === 'ArrowUp')    selected.setAttribute('y', y - step);
    if (e.key === 'ArrowDown')  selected.setAttribute('y', y + step);
  }

  if (tag === 'circle') {
    let cx = +selected.getAttribute('cx') || 0;
    let cy = +selected.getAttribute('cy') || 0;
    if (e.key === 'ArrowLeft')  selected.setAttribute('cx', cx - step);
    if (e.key === 'ArrowRight') selected.setAttribute('cx', cx + step);
    if (e.key === 'ArrowUp')    selected.setAttribute('cy', cy - step);
    if (e.key === 'ArrowDown')  selected.setAttribute('cy', cy + step);
  }
});

