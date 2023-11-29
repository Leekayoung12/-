// 매장 정보 
async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/');
        const data = await response.json();
        console.log(data);
        displayData(data);
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM이 로드되었습니다.');
    fetchData();
});

function displayData(data) {
    const container = document.getElementById('informationContainer');

    data.forEach(info => {
        const infoElement = document.createElement('div');
        infoElement.className = 'informationItem';
        infoElement.innerHTML = `
            <img src="./매장이미지/${info.name}.jpg" alt="Image">
            <div>
                <p><b>매장명:</b></p>
                <p>${info.name}</p>
                <p><b>주소:</b></p>
                <p>${info.address}</p>
            </div>`;
        container.appendChild(infoElement);
    });
}

// 지도

function loadKakaoMapsScript(callback) {
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=9d08635edf4f597837f1f10007baeedd&libraries=services';
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
}

function initializeMap() {
    // Load Kakao Maps script
    loadKakaoMapsScript(function() {
        var mapContainer = document.getElementById('map');
        var mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };      
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // Sample data for markers
        var markerData = [
            { position: new kakao.maps.LatLng(33.450701, 126.570667), content: 'Marker 1' },
            // Add more markers as needed
        ];

        // Create markers and info windows
        markerData.forEach(data => {
            var marker = new kakao.maps.Marker({
                position: data.position,
                map: map
            });

            var infowindow = new kakao.maps.InfoWindow({
                content: data.content
            });

            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        });

        // Set the bounds to make all markers visible
        var bounds = new kakao.maps.LatLngBounds();
        markerData.forEach(data => bounds.extend(data.position));
        map.setBounds(bounds);
    });
}

// Function to display info window on mouseover
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

// Function to close info window on mouseout
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}

document.addEventListener('DOMContentLoaded', function () {
    initializeMap();
});

