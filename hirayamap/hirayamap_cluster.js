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
        var color = colors[item.音調コード - 1]; // 音調体系に応じた色を取得
        var marker = L.circleMarker([item.緯度, item.経度], {
            color: color, // 外周の色
            fillColor: color, // 塗りつぶしの色
            fillOpacity: 0.5, // 塗りつぶしの透明度
            radius: 8 // マーカーの半径
        });
        marker.bindPopup(item.集落名 + ": 音調体系 " + item.音調体系);
        markers.addLayer(marker); // マーカーをクラスタグループに追加
    });
    map.addLayer(markers); // クラスタグループを地図に追加
})
.catch(error => console.error('Error loading the data:', error));


var map = L.map('map').setView([33.0, 130.0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 色ごとにクラスタグループを用意する
var clusterGroups = {
    "#FFB300": L.markerClusterGroup(),
    "#803E75": L.markerClusterGroup(),
    "#FF6800": L.markerClusterGroup(),
    "#A6BDD7": L.markerClusterGroup(),
    "#C10020": L.markerClusterGroup(), 
    "#CEA262": L.markerClusterGroup(),
    "#817066": L.markerClusterGroup(),
    "#007D34": L.markerClusterGroup(),
    "#F6768E": L.markerClusterGroup(),
    "#00538A": L.markerClusterGroup(),
    "#FF7A5C": L.markerClusterGroup(),
    "#53377A": L.markerClusterGroup(),
    "#FF8E00": L.markerClusterGroup(),
    "#B32851": L.markerClusterGroup(),
};

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
    for(var color in clusterGroups) {
        map.addLayer(clusterGroups[color]);
    }
})
.catch(error => console.error('Error loading the data:', error));
