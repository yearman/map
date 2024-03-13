// Leaflet地図の初期設定
var map = L.map('map').setView([33.0, 130.0], 7); // 九州・沖縄の範囲を表示

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 音調体系に応じた色の定義
var colors = ["#FFB300", "#803E75", "#FF6800", "#A6BDD7", "#C10020", "#CEA262", "#817066", "#007D34", "#F6768E", "#00538A", "#FF7A5C", "#53377A", "#FF8E00", "#B32851"];

// クラスター関係
var markers = L.markerClusterGroup();

// データの読み込みとプロット
fetch('./hirayamap/hirayamap_data.json')
.then(response => response.json())
.then(data => {
    data.forEach(function(item) {
        var color = colors[item.音調コード - 1]; // 音調体系に対応する色を取得
        L.circleMarker([item.緯度, item.経度], { color: color }).addTo(map)
            .bindPopup(item.集落名 + ": " + item.音調体系);
    });
    map.addLayer(markers);
})
.catch(error => console.error('Error loading the data:', error));
