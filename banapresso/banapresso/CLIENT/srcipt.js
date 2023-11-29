// 매장 정보 
async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/');
        const data = await response.json();
        console.log(data);
        displayData(data);
        initializeMap(data); // 데이터를 받은 후에 지도 초기화 함수 호출
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

function initializeMap(data) {
    // Load Kakao Maps script
    loadKakaoMapsScript(function() {
        var mapContainer = document.getElementById('map');
        var mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };      
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // Create markers and info windows
        data.forEach(info => {
            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder(); 
  
            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(info.address, function (result, status) {
                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
  
                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });
  
                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="width:200px;text-align:center;padding:6px 0;">${info.name}<br>${info.address}</div>`
                    });
  
                    // 마커에 마우스오버 이벤트 추가
                    kakao.maps.event.addListener(marker, 'mouseover', function () {
                        infowindow.open(map, marker);
                    });
  
                    // 마커에 마우스아웃 이벤트 추가
                    kakao.maps.event.addListener(marker, 'mouseout', function () {
                        infowindow.close();
                    });
                }
            });
        });

        // Set the bounds to make all markers visible
        var bounds = new kakao.maps.LatLngBounds();
        data.forEach(info => bounds.extend(new kakao.maps.LatLng(info.latitude, info.longitude))); // 데이터에 좌표 정보가 있다면 사용
        map.setBounds(bounds);
    });
}
