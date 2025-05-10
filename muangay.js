function openOrderModal(imageSrc, name, size, quantity, price) {
  document.getElementById('modal-image').src = imageSrc;
  document.getElementById('modal-name').textContent = name;
  document.getElementById('modal-size').textContent = size;
  document.getElementById('modal-quantity').textContent = quantity;
  document.getElementById('modal-price').textContent = price;

  const modal = document.getElementById('orderModal');
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
}

// Sự kiện cho nút "Đặt hàng"
document.getElementById('submitOrder').addEventListener('click', function () {
  const name = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const address = document.getElementById('orderAddress').value.trim();

  if (!name || !phone || !address) {
    alert('Vui lòng nhập đầy đủ thông tin khách hàng!');
    return;
  }

  const orderDetails = {
    product: document.getElementById('modal-name').textContent,
    size: document.getElementById('modal-size').textContent,
    quantity: document.getElementById('modal-quantity').textContent,
    price: document.getElementById('modal-price').textContent,
    image: document.getElementById('modal-image').src,
    customer: {
      name,
      phone,
      address
    }
  };

  console.log('Đơn hàng:', orderDetails);
  alert("Đơn hàng của bạn đã được xác nhận ✅\nCảm ơn bạn đã mua hàng 😍");
  document.getElementById('orderModal').style.display = 'none';
});

// Nếu bạn vẫn giữ nút "close"
const closeBtn = document.querySelector(".close-button");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    document.getElementById("orderModal").classList.add("hidden");
  });
}
//Đặt hàng
    document.getElementById("submitOrder").addEventListener("click", function () {
        const hoten = document.getElementById("orderName").value;
        const sdt = document.getElementById("orderPhone").value;
        const diachi = document.getElementById("orderAddress").value;
        const ten = document.getElementById("modal-name").textContent;
        const soluong = parseInt(document.getElementById("modal-quantity").textContent);
        const pttt = "Thanh toán khi nhận hàng";

        if (!hoten || !sdt || !diachi) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const lichsu = JSON.parse(localStorage.getItem("lichsumua")) || [];
        const today = new Date().toLocaleDateString('vi-VN');

        const donHang = {
            ngay: today,
            sanpham: [{ ten, soluong }],
            pttt,
            hoten,
            sdt,
            diachi
        };

        lichsu.push(donHang);
        localStorage.setItem("lichsumua", JSON.stringify(lichsu));

        // Reset form (nếu muốn)
        document.getElementById("orderName").value = "";
        document.getElementById("orderPhone").value = "";
        document.getElementById("orderAddress").value = "";
        document.getElementById("orderModal").classList.add("hidden");
    });
