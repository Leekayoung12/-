
                
let container = document.getElementById('map');
let options = {
    center: new kakao.maps.LatLng(37.58701889507018, 127.02672868080626),
    level: 3
};

let map = new kakao.maps.Map(container, options);

let data = [
    [37.58701889507018, 127.02672868080626,'<div style="padding 5px">고려대학교의과대학부속병원(안암병원)</div>'],
    [37.575318330746725, 127.0314422507569, '<div style="padding 5px">서울특별시 동부병원</div>'],
    [37.53368282656023, 127.00430782310221,'<div style="padding 5px">순천향대학교 부속 서울병원</div>'],
    [37.51193425988221, 126.92242796907821,'<div style="padding 5px">성애의료재단 성애병원</div>'],
    [37.492067905456274, 126.88478236456848,'<div style="padding 5px">고려대학교의과대학부속구로병원</div>'],
    [37.49058070841244, 126.9072018410658,'<div style="padding 5px">대림성모병원</div>'],
    [37.62083347305215, 126.91960208727232,'<div style="padding 5px">의료법인 청구성심병원</div>'],
    [37.493736708627026, 126.89922578692219,'<div style="padding 5px">명지성모병원</div>'],
    [37.5841620014623, 127.0498578532334,'<div style="padding 5px">서울성심병원</div>'],
    [37.52795726897558, 126.86373559159597,'<div style="padding 5px">홍익병원</div>']
]
let bounds = new kakao.maps.LatLngBounds(); // 모든 마커를 포함하는 경계 영역으로 지도 이동

for (let i=0; i<data.length; i++){
    let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(data[i][0], data[i][1]),
        map: map
    });
    bounds.extend(new kakao.maps.LatLng(data[i][0], data[i][1])); //

    let infowindow = new kakao.maps.InfoWindow({
        content: data[i][2]
    })

  
    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
}
map.setBounds(bounds) // 웹페이지 열었을 때 모든 마커가 한번에 보이도록 설정

// 인포윈도우를 표시하는 클로저를 만드는 함수
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