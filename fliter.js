// chạy code sau khi load web
document.addEventListener('DOMContentLoaded', function () {
    const locBtn = document.querySelector('.loc-btn');
    if (!locBtn) {
        console.error('Không phát hiện .loc-btn');
        return;
    }

    locBtn.addEventListener('click', function () {
        console.log('Đã lọc');
        const DsDaChon = document.querySelectorAll('input[name="loai"]:checked');
        const SaleBoxCheck = document.querySelector('input[name="sale"]:checked');
        const sanphams = document.querySelectorAll('.osanpham');

        const DaChon = Array.from(DsDaChon).map(cb => cb.value);
        const isSaleChecked = SaleBoxCheck !== null;

        if (DaChon.length === 0 && !isSaleChecked) {
            sanphams.forEach(sp => sp.classList.remove('hidden'));
        } else {
            sanphams.forEach(sp => {
                const loai = sp.getAttribute('data-loai');
                const isSale = sp.getAttribute('data-sale') === 'true';
                let show = true;

                if (DaChon.length > 0 && !DaChon.includes(loai)) {
                    show = false;
                }
                if (isSaleChecked && !isSale) {
                    show = false;
                }

                if (show) {
                    sp.classList.remove('hidden');
                } else {
                    sp.classList.add('hidden');
                }
            });
        }

        // Cuộn đến sản phẩm đầu tiên hiển thị
        const spHienThi = document.querySelector('.osanpham:not(.hidden)');
        if (spHienThi) {
            spHienThi.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Highlight nhẹ
            spHienThi.classList.add('highlight');
            setTimeout(() => {
                spHienThi.classList.remove('highlight');
            }, 2000);
        }
    });
});
