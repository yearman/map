// Leaflet地図の初期設定
var map = L.map('map').setView([33.0, 130.0], 7); // 九州・沖縄の範囲を表示

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 音調体系に応じた色の定義
var colors = ["#FFB300", "#803E75", "#FF6800", "#A6BDD7", "#C10020", "#CEA262", "#817066", "#007D34", "#F6768E", "#00538A", "#FF7A5C", "#53377A", "#FF8E00", "#B32851"];

// データの読み込みとプロット
fetch('./hirayamap/hirayamap_data.json')
.then(response => response.json())
.then(data => {
		data.forEach(function(item) {
				var color = colors[item.音調コード - 1]; // 音調体系に対応する色を取得
				L.circleMarker([item.緯度, item.経度], { color: color }).addTo(map)
				.bindPopup(item.集落名 + ": " + item.音調体系);
		});
})
.catch(error => console.error('Error loading the data:', error));

// 凡例を追加するカスタムコントロールを作成
var legend = L.control({position: 'bottomright'}); // 凡例の位置を指定

legend.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'info legend'),
	grades = ["東京式音調", "特殊音調1A", "曖昧音調1", "一型音調", "京阪式音調", "特殊音調1B", "特殊音調2", "曖昧音調2", "特殊音調3D", "特殊音調3C", "特殊音調3E", "特殊音調3A", "特殊音調3B", "特殊音調3F"]; // 例として音調体系を使用
	
	// 凡例の見出し
	div.innerHTML += '<h4>音調体系</h4>';
	
	// 各音調体系の色とラベルを追加
	for (var i = 0; i < grades.length; i++) {
		div.innerHTML +=
	'<i style="background:' + colors[i] + '; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7;"></i> ' +
	'音調 ' + grades[i] + '<br>';
}

return div;
};

// 凡例を地図に追加
legend.addTo(map);
