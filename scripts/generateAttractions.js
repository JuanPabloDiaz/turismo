const fetch = require("node-fetch");
const fs = require("fs");

fetch("https://api-colombia.com/api/v1/TouristicAttraction")
  .then((res) => res.json())
  .then((json) => {
    const result = json.map((a) => ({
      name: a.name,
      lat: parseFloat(a.latitude),
      lon: parseFloat(a.longitude),
      city: a.city?.name || "",
      description: a.description.slice(0, 250) + "...",
      img: a.images[0] || "",
    }));

    const jsContent = "var data = " + JSON.stringify(result, null, 2) + ";";

    fs.writeFileSync("assets/js/attractions.js", jsContent);
    console.log("✅ File generated: assets/js/attractions.js");
  })
  .catch((err) => {
    console.error("❌ Error fetching data:", err);
    process.exit(1);
  });
