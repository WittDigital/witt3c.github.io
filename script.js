/* =========================================
   Witt3c Portal - 核心動畫控制
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const grid = document.getElementById('portal-grid');

    // 確保元件都存在才執行，避免報錯
    if (header && grid) {
        // 設定 1 秒的初始延遲
        setTimeout(() => {
            // Logo 開始移動：移除中心狀態，加入頂部狀態
            header.classList.remove('initial-center');
            header.classList.add('active-top');

            // Logo 開始移動後，稍等 0.5 秒讓卡片浮現
            setTimeout(() => {
                grid.classList.remove('contents-hidden');
                grid.classList.add('contents-show');
            }, 500);
            
        }, 1000); 
    }
});