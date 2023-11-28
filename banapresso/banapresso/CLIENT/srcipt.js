// Kakao 지도 API 스크립트를 콜백과 함께 로드
function loadKakaoMapsScript(callback) {
    const script = document.createElement('script');
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=7ac23d90b38996543341af8b620f1289";
    script.onload = callback;
    // document.head.appendChild(script);
}
async function fetchData() {
    try {
        // 데이터를 가져오기 전에 Kakao 지도 API 스크립트를 로드
        // await new Promise(resolve => loadKakaoMapsScript(resolve));
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
// Call fetchData when the page loads
// window.onload = fetchData;
function displayData(data) {
    const container = document.getElementById('informationContainer');
    // Assuming 'data' is an array of information objects
    data.forEach(info => {
        const infoElement = document.createElement('div');
        infoElement.className = 'informationItem';
        infoElement.innerHTML = `<img src="./매장이미지/${info.name}.jpg" alt="Image"><div><p><b>매장명:</b></p> <p>${info.name}</p><p><b>주소:</b><p> ${info.address}</p></div>`;
        container.appendChild(infoElement);
        // if (info.address) {
        //     getAddress(info.address, info.name, map);
        // }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    fetchData();
});
// Kakao 지도
// var mapContainer = document.getElementById('map');
// var mapOption = {
//     center: new kakao.maps.LatLng(33.450701, 126.570667),
//     level: 6
// };
// var map = new kakao.maps.Map(mapContainer, mapOption);
function getAddress(address, name, map) {
    // 사용하려는 객체가 정의되어 있는지 확인
    if (kakao.maps.services && kakao.maps.services.Geocoder) {
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                var infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>`
                });
                kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
            }
            map.setCenter(coords);
        });
    } else {
        console.error('Kakao 지도 API의 Geocoder가 사용 불가능합니다.');
    }
}
//인포윈도우를 표시하는 클로저를 만드는 함수
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}
// 인포윈도우를 닫는 클로저를 만드는 함수
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}