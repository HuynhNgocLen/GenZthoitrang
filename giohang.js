// Hiển thị giỏ hàng
function showCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const danhSachSP = document.getElementById("danhsachSP");
    danhSachSP.innerHTML = "";  // Xóa nội dung cũ

    let tongTien = 0;

    cart.forEach((sp, index) => {
        const thanhTien = sp.gia * sp.soluong;
        tongTien += thanhTien;

        const row = `
            <tr>
                <td><input type="checkbox" class="select-product" data-index="${index}" onclick="updateSelectedProducts()" ${sp.selected ? 'checked' : ''}></td>
                <td>${sp.ten}</td>
                <td>${sp.gia.toLocaleString('vi-VN')} VNĐ</td>
                <td>${sp.size || "?"}</td>
                <td>${sp.soluong}</td>
                <td>${thanhTien.toLocaleString('vi-VN')} VNĐ</td>
                <td><button onclick="xoaSP(${index})">Xoá</button></td>
            </tr>
        `;
        danhSachSP.innerHTML += row;
    });

    document.getElementById("tongTien").textContent = tongTien.toLocaleString('vi-VN') + " VNĐ";
}

// Lưu trạng thái đã chọn vào localStorage
function updateSelectedProducts() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkboxes = document.querySelectorAll('.select-product');

    checkboxes.forEach((checkbox, index) => {
        cart[index].selected = checkbox.checked;  // Cập nhật trạng thái "đã chọn"
    });

    localStorage.setItem("cart", JSON.stringify(cart));  // Lưu lại trạng thái vào localStorage
}

// Xoá một sản phẩm khỏi giỏ
function xoaSP(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);  // Xóa sản phẩm tại vị trí index
    localStorage.setItem("cart", JSON.stringify(cart));  // Lưu lại vào localStorage
    showCart();  // Cập nhật lại giỏ hàng
}

// Kiểm tra và thanh toán
function thanhToan() {
    // Lấy các giá trị từ các trường nhập liệu
    const hoten = document.getElementById('hoten').value.trim();
    const sdt = document.getElementById('sdt').value.trim();
    const diachi = document.getElementById('diachi').value.trim();

    // Kiểm tra xem các trường có bị bỏ trống hay không
    if (!hoten || !sdt || !diachi) {
        alert('Vui lòng nhập đầy đủ thông tin địa chỉ nhận hàng!');
        return;  // Nếu thiếu thông tin, dừng lại và không thực hiện thanh toán
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Lọc các sản phẩm được chọn
    const selectedProducts = cart.filter(sp => sp.selected);

    if (selectedProducts.length === 0) {
        alert("Bạn chưa chọn sản phẩm nào để thanh toán!");
        return;
    }

    let totalAmount = selectedProducts.reduce((sum, sp) => sum + (sp.gia * sp.soluong), 0);
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    alert(`Đặt hàng thành công với phương thức: ${getPaymentText(paymentMethod)}. Tổng tiền là: ${totalAmount.toLocaleString('vi-VN')} VNĐ!`);

    // Lọc và xóa các sản phẩm đã chọn khỏi giỏ hàng
    cart = cart.filter(sp => !sp.selected); // Xóa các sản phẩm đã được chọn
    localStorage.setItem("cart", JSON.stringify(cart));  // Cập nhật lại giỏ hàng trong localStorage

    showCart();  // Cập nhật lại giỏ hàng hiển thị

    //lịch sử mua hàng
    function thanhToan() {
    const danhSachSP = JSON.parse(localStorage.getItem("giohang")) || [];
    if (danhSachSP.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    const hoten = document.getElementById("hoten").value.trim();
    const sdt = document.getElementById("sdt").value.trim();
    const diachi = document.getElementById("diachi").value.trim();
    const pttt = document.querySelector('input[name="payment"]:checked').value;

    if (!hoten || !sdt || !diachi) {
        alert("Vui lòng nhập đầy đủ thông tin giao hàng.");
        return;
    }

    const ngay = new Date().toLocaleString("vi-VN");

    const donHang = {
        ngay,
        sanpham: danhSachSP,
        pttt,
        hoten,
        sdt,
        diachi
    };

    // Lưu vào lịch sử mua
    const lichSu = JSON.parse(localStorage.getItem("lichsumua")) || [];
    lichSu.push(donHang);
    localStorage.setItem("lichsumua", JSON.stringify(lichSu));

    // Xóa giỏ hàng
    localStorage.removeItem("giohang");
    alert("Đặt hàng thành công! Bạn sẽ được chuyển đến trang Lịch sử mua hàng.");
    window.location.href = "lichsumua.html";
}

}

// Chuyển value thành tên phương thức thanh toán
function getPaymentText(method) {
    switch (method) {
        case "cod": return "Thanh toán khi nhận hàng";
        case "bank": return "Chuyển khoản ngân hàng";
        default: return "Không xác định";
    }
}


// Tự động hiển thị giỏ hàng khi load trang
document.addEventListener("DOMContentLoaded", function() {
    showCart();

    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const bankInfo = document.getElementById("bankInfo");

    // Khi người dùng thay đổi phương thức thanh toán
    paymentRadios.forEach(radio => {
        radio.addEventListener("change", function() {
            if (this.value === "bank") {
                bankInfo.style.display = "block";  // Hiển thị thông tin chuyển khoản
            } else {
                bankInfo.style.display = "none";  // Ẩn thông tin chuyển khoản
            }
        });
    });
});


