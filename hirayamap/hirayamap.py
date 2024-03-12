import numpy as np
import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt

df = gpd.read_file('/Users/yearman/Dropbox/Script/Python/land-master/japan.geojson')

locations = pd.read_csv("/Users/yearman/Library/CloudStorage/Dropbox/Temp/平山地図電子化/hirayamap-240312.csv")


# 実際の記号に対応するマーカーをここで定義する必要がある
marker_list = {
    "▲": "^",  # 上向き三角形
    "◣": "<",  # 左向き三角形
    "△": "^",  # 上向き三角形
    "×": "x",  # エックス
    "●": "o",  # 大きな円
    "▽": "v",  # 下向き三角形
    "◎": "o",  # 大きな円、中央の点を示すためにはカスタムマーカーが必要
    "〇": "o",  # 円
    "◆": "D",  # ダイヤモンド
    "◇": "d",  # 細いダイヤモンド
    "■": "s",  # 正方形
    "▶": ">",  # 右向き三角形
    "◀": "<",  # 左向き三角形
    "□": "s",  # 正方形、中央を空けるためにはカスタムマーカーが必要
}

# 特定の記号に対する色を定義
color_dict = {
    "◣": "white",
    "□": "black",
    "△": "black",
    "◎": "black",
    "〇": "white"}


# 地図のスタイルを設定
with plt.style.context("ggplot"):
    df.plot(figsize=(8, 7), edgecolor='#444', facecolor='white', linewidth=0.5)
    plt.xlim([128.5, 132.0])
    plt.ylim([30.0, 34.0])

    # 集落ごとに異なる記号のマーカーをプロット
    for idx, row in locations.iterrows():
        symbol = row['記号']
        marker = marker_list.get(symbol, 'o')  # デフォルトは'o'
        color = color_dict.get(symbol, "gray")  # 記号に応じた色を取得、デフォルトは'gray'
        plt.scatter(row['経度'], row['緯度'], 
                    marker=marker, 
                    s=50, 
                    facecolor=color, 
                    edgecolor="black", 
                    alpha=0.8, 
                    linewidths=1)

    plt.xticks(np.arange(128.5, 132.0 + 0.5, 0.5))
    plt.yticks(np.arange(30.0, 34.0 + 0.5, 0.5))

# plt.savefig("amakusa-300dpi.png", format="png", dpi=300, bbox_inches='tight', pad_inches=0)

plt.show()
