document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('main-sidebar');
    const grid = document.getElementById('portal-grid');
    const avatarImg = sidebar.querySelector('.avatar-img');

    const startPortalAnimation = () => {
        // 1. 確保初始狀態：Logo 出現在中央
        sidebar.classList.add('initial-center');

        // 第一階段：Logo 在中央停留 2.5 秒 (2500ms)
        setTimeout(() => {
            // 2. 啟動溶解動畫：Logo 開始變模糊並淡出
            sidebar.classList.add('run-dissolve');

            // ⚠️ 關鍵修正：給溶解動畫一點呼吸時間 (1秒)
            setTimeout(() => {
                // 3. 歸位：移除中央狀態，切換至左側
                sidebar.classList.remove('initial-center');
                sidebar.classList.remove('run-dissolve'); // 移除溶解，準備在左側顯現
                
                sidebar.classList.add('active-left');
                sidebar.classList.add('run-scan');
                
                // 4. 顯示右側網格：再等一下下才讓右邊出來，視覺才不會亂
                setTimeout(() => {
                    grid.classList.remove('contents-hidden');
                    grid.classList.add('contents-show');

                    fetchAllWeather();
                }, 800); 
                
            }, 1000); // 這裡控制 Logo 溶解多久後「瞬移」到左邊
        }, 2500); // 你要求的 2.5 秒停留
    };

    // 圖片載入監聽 (保持原樣)
    if (avatarImg.complete) {
        startPortalAnimation();
    } else {
        avatarImg.addEventListener('load', startPortalAnimation);
        setTimeout(startPortalAnimation, 4000); // 保險時間拉長一點
    }
});



async function fetchAllWeather() {
    console.log("📡 嘗試連接天氣感測器 (weather.json)...");
    
    // 🌟 關鍵修正：確保這裡的 ID 跟 HTML 一模一樣
    const container = document.getElementById('weather-mini-grid');
    
    // 加上這行保險：如果找不到容器，先在 Console 報警，不要讓後面的程式死掉
    if (!container) {
        console.error("❌ 找不到 ID 為 weather-mini-grid 的容器！請檢查 HTML。");
        return;
    }

    try {
        const response = await fetch('./weather.json');
        const data = await response.json();
        
        // 氣象署的資料路徑非常深，我們要準確導航
        const locations = data.records.location;
        container.innerHTML = ''; // 清除 loading 文字

        locations.forEach(loc => {
            const cityName = loc.locationName;
            // 這裡要注意：氣象署的 API 結構有時候會變動
            // 我們先抓取出第一筆天氣現象與平均溫度
            const weatherDesc = loc.weatherElement[0].time[0].parameter.parameterName;
            const temp = loc.weatherElement[2].time[0].parameter.parameterName;

            const div = document.createElement('div');
            div.className = 'mini-weather-item';
            div.innerHTML = `
                <span class="mini-city-name">${cityName}</span>
                <span class="mini-city-temp">${temp}°C</span>
                <i class="fas fa-sun mini-city-icon"></i> 
            `;
            container.appendChild(div);
        });
        console.log("✅ 全台數據面板點亮！");
    } catch (e) {
        console.error('❌ 渲染失敗:', e.message);
    }
}