// Ajustar tamaño del mapa al tamaño de la ventana
document.getElementById("mapid").style.width = window.innerWidth + "px";
document.getElementById("mapid").style.height = window.innerHeight + "px";

// Crear el mapa con vista inicial en Colombia
const map = L.map("mapid").setView([6.852374, -74.297333], 6);

// Capa de mapa base
L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 18,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
).addTo(map);

// Icono personalizado
const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [30, 30],
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // puedes usar cualquier ícono
  },
});
const defaultIcon = new LeafIcon();

// Agregar marcadores desde data
data.forEach((attraction) => {
  const { lat, lon, name, city, description, img } = attraction;

  const popupContent = `
    <strong>${name}</strong><br>
    <em>${city}</em><br>
    <p>${description}</p>
    ${
      img
        ? `<img src="${img}" style="width:100%; max-height:150px; object-fit:cover;" />`
        : ""
    }
  `;

  L.marker([lat, lon], { icon: defaultIcon })
    .bindPopup(popupContent)
    .addTo(map);
});
