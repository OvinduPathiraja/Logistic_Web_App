
  $(function () {
    const countryCoords = {
      "India": { latLng: [21.0, 78.0], color: "#2961ff" },
      "Australia": { latLng: [-33.0, 151.0], color: "#ff821c" },
      "USA": { latLng: [36.77, -119.41], color: "#40c4ff" },
      "UK": { latLng: [55.37, -3.41], color: "#398bf7" },
      "UAE": { latLng: [25.2, 55.27], color: "#6fc826" },
      "Canada": { latLng: [56.1304, -106.3468], color: "#f39c12" },
      "Germany": { latLng: [51.1657, 10.4515], color: "#8e44ad" },
      // Add more countries as needed
    };

    fetch('https://corsproxy.io/?url=https://xa4rzy5lkg.execute-api.eu-north-1.amazonaws.com/prod')
      .then(response => response.json())
      .then(apiData => {
        const shipmentData = JSON.parse(apiData.body);
        
        const countryCounts = {};
        shipmentData.forEach(item => {
          const country = item["Country Shipped From"];
          if (country) {
            countryCounts[country] = (countryCounts[country] || 0) + 1;
          }
        });

        const markers = [];
        for (const [country, count] of Object.entries(countryCounts)) {
          if (countryCoords[country]) {
            const { latLng, color } = countryCoords[country];
            markers.push({
              latLng,
              name: `${country} : ${count}`,
              style: { fill: color }
            });
          }
        }

        $('#visitfromworld').vectorMap({
          map: 'world_mill_en',
          backgroundColor: 'transparent',
          zoomOnScroll: false,
          regionStyle: {
            initial: {
              fill: '#bce2fb',
              'stroke-width': 1,
              stroke: '#fff'
            }
          },
          markerStyle: {
            initial: {
              r: 5,
              'fill-opacity': 1,
              stroke: '#fff',
              'stroke-width': 1,
              'stroke-opacity': 1
            }
          },
          markers: markers,
          hoverColor: '#79e580',
          showTooltip: true
        });
      })
      .catch(error => {
        console.error('Error fetching or parsing map data:', error);
      });
  });
