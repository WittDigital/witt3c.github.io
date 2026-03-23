document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('main-sidebar');
    const grid = document.getElementById('portal-grid');

    if (sidebar && grid) {
        sidebar.classList.add('initial-center');

        setTimeout(() => {
            sidebar.classList.add('run-dissolve');

            setTimeout(() => {
                sidebar.classList.remove('initial-center');
                sidebar.classList.add('active-left');
                sidebar.classList.add('run-scan');

                setTimeout(() => {
                    grid.classList.remove('contents-hidden');
                    grid.classList.add('contents-show');
                }, 1000);
            }, 800);
        }, 500); 
    }
});