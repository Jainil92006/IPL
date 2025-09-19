document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing map...");
  
  // Check if Leaflet is available
  if (typeof L === 'undefined') {
    console.error('Leaflet is not available');
    return;
  }
  
  // Check map container
  const mapContainer = document.getElementById("fanMap");
  if (!mapContainer) {
    console.error('Map container not found');
    return;
  }
  
  console.log('Map container found:', mapContainer);
  console.log('Container dimensions:', mapContainer.offsetWidth, 'x', mapContainer.offsetHeight);
  
  // 🌍 Initialize Leaflet map with mobile-friendly settings
  let map;
  
  try {
    console.log("Creating map...");
    map = L.map("fanMap", {
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true,
      tap: true
    }).setView([20, 0], 2);

    console.log("Adding tile layer...");
    const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 18,
      minZoom: 1
    }).addTo(map);
    
    console.log("Map initialized successfully!");
    
    // Ensure map computes size on map/tile load events
    function forceInvalidate() {
      if (!map) return;
      map.invalidateSize(true);
      console.log("invalidateSize called");
    }
    map.on('load', forceInvalidate);
    tileLayer.on('load', () => {
      setTimeout(forceInvalidate, 50);
      setTimeout(forceInvalidate, 300);
    });
    // Fallback timers
    setTimeout(forceInvalidate, 200);
    setTimeout(forceInvalidate, 800);
    
  } catch (error) {
    console.error("Failed to initialize map:", error);
    document.getElementById("fanMap").innerHTML = 
      '<div class="flex items-center justify-center h-full bg-gray-700 rounded-lg text-center p-4">' +
      '<p>Map failed to load. Please refresh the page.</p>' +
      '</div>';
    return;
  }

  // Load saved fans
  let fans = JSON.parse(localStorage.getItem("rcb_fans")) || [];

  function renderFans() {
    fans.forEach((f) => {
      L.marker([f.lat, f.lng])
        .addTo(map)
        .bindPopup(`<b>${f.name}</b><br>${f.city}`);
    });
  }
  renderFans();

  // Handle new fan submissions
  const fanForm = document.getElementById("fanForm");
  if (fanForm) {
    const submitBtn = fanForm.querySelector('button[type="submit"]');

    async function geocodeCity(query) {
      const timeoutMs = 8000;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=0`;
        const res = await fetch(url, {
          headers: { 'Accept': 'application/json' },
          signal: controller.signal,
          referrerPolicy: 'no-referrer',
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) {
          return { lat: parseFloat(json[0].lat), lng: parseFloat(json[0].lon) };
        }
        throw new Error('Nominatim returned no results');
      } catch (err) {
        console.warn('Nominatim failed:', err.message || err);
        // Fallback 1: maps.co (Nominatim proxy)
        try {
          const res2 = await fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(query)}`, {
            headers: { 'Accept': 'application/json' },
            referrerPolicy: 'no-referrer'
          });
          if (!res2.ok) throw new Error(`maps.co HTTP ${res2.status}`);
          const json2 = await res2.json();
          if (Array.isArray(json2) && json2.length > 0) {
            return { lat: parseFloat(json2[0].lat), lng: parseFloat(json2[0].lon) };
          }
          throw new Error('maps.co returned no results');
        } catch (err2) {
          console.warn('maps.co failed:', err2.message || err2);
          // Fallback 2: Photon
          try {
            const res3 = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`, {
              headers: { 'Accept': 'application/json' },
              referrerPolicy: 'no-referrer'
            });
            if (!res3.ok) throw new Error(`photon HTTP ${res3.status}`);
            const json3 = await res3.json();
            if (json3 && json3.features && json3.features.length > 0) {
              const [lng, lat] = json3.features[0].geometry.coordinates;
              return { lat: parseFloat(lat), lng: parseFloat(lng) };
            }
            throw new Error('photon returned no results');
          } catch (err3) {
            console.error('All geocoders failed:', err3.message || err3);
            throw err3;
          }
        }
      }
    }

    fanForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("fanName").value.trim();
      const city = document.getElementById("fanCity").value.trim();
      if (!name || !city) return;

      try {
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Adding...'; }

        const coords = await geocodeCity(city);
        if (!coords || isNaN(coords.lat) || isNaN(coords.lng)) {
          throw new Error('Invalid coordinates from geocoder');
        }

        fans.push({ name, city, lat: coords.lat, lng: coords.lng });
        localStorage.setItem("rcb_fans", JSON.stringify(fans));

        L.marker([coords.lat, coords.lng])
          .addTo(map)
          .bindPopup(`<b>${name}</b><br>${city}`)
          .openPopup();

        e.target.reset();
        map.setView([coords.lat, coords.lng], 5);
      } catch (err) {
        console.error('Add location failed:', err);
        alert("Error adding location. Please try a different city or check connection.");
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = '🚀 Pin Me!'; }
      }
    });
  }

  // ✅ Mobile fix: refresh map size
  function refreshMapSize() {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }

  // Multiple refresh attempts for mobile
  window.addEventListener("load", () => {
    refreshMapSize();
    setTimeout(refreshMapSize, 500);
    setTimeout(refreshMapSize, 1000);
  });

  window.addEventListener("resize", refreshMapSize);
  
  // Additional mobile-specific events
  window.addEventListener("orientationchange", () => {
    setTimeout(refreshMapSize, 500);
  });
  
  // Touch events for better mobile interaction
  if ('ontouchstart' in window) {
    document.addEventListener('touchstart', refreshMapSize, { passive: true });
  }
});
