/* 🌍 Fan Map Script */
let map = L.map('fanMap').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:'© OpenStreetMap contributors'
}).addTo(map);

let fans = JSON.parse(localStorage.getItem('rcb_fans')) || [];

function renderFans(){
  fans.forEach(f=>{
    L.marker([f.lat,f.lng]).addTo(map).bindPopup(`<b>${f.name}</b><br>${f.city}`);
  });
}
renderFans();

document.getElementById('fanForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const name=document.getElementById('fanName').value;
  const city=document.getElementById('fanCity').value;
  try {
    let response=await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
    let data=await response.json();
    if(data && data.length>0){
      let lat=data[0].lat, lng=data[0].lon;
      fans.push({name,city,lat,lng});
      localStorage.setItem('rcb_fans',JSON.stringify(fans));
      L.marker([lat,lng]).addTo(map).bindPopup(`<b>${name}</b><br>${city}`).openPopup();
      e.target.reset();
    } else {
      alert("City not found. Try another one!");
    }
  } catch(err){
    console.error(err);
    alert("Error adding location");
  }
});
