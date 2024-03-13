// Leaflet地図の初期設定
var map = L.map('map').setView([33.0, 130.0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 音調体系に応じた色の定義
var colors = ["#FFB300", "#803E75", "#FF6800", "#A6BDD7", "#C10020", "#CEA262", "#817066", "#007D34", "#F6768E", "#00538A", "#FF7A5C", "#53377A", "#FF8E00", "#B32851"];

// 色ごとにクラスタグループを用意する
var clusterGroups = {};
colors.forEach(function(color) {
    clusterGroups[color] = L.markerClusterGroup();
});

fetch('./hirayamap/hirayamap_data.json')
.then(response => response.json())
.then(data => {
    data.forEach(function(item) {
        var color = colors[item.音調体系 - 1];
        var marker = L.circleMarker([item.緯度, item.経度], {
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: 8
        }).bindPopup(item.集落名 + ": 音調体系 " + item.音調体系);

        // 色に基づいて適切なクラスタグループにマーカーを追加
        if(clusterGroups[color]) {
            clusterGroups[color].addLayer(marker);
        }
    });

    // すべてのクラスタグループを地図に追加
    Object.values(clusterGroups).forEach(function(group) {
        map.addLayer(group);
    });
})
.catch(error => console.error('Error loading the data:', error));
