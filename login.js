// ======== CHẶN NGƯỜI CHƯA ĐĂNG NHẬP ========
// Kiểm tra trạng thái đăng nhập
function isUserLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true"; // Kiểm tra từ localStorage
}

// Xử lý khi người dùng click vào nút "Thêm vào giỏ hàng"
document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  const isLoggedIn = isUserLoggedIn();

});
