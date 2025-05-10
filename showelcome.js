export function showWelcome() {
    const username = localStorage.getItem("username");
    const dropBtn = document.querySelector(".dropbtn");
    const accountLink = document.getElementById("account-link");
  
    if (username) {
      if (dropBtn) {
        dropBtn.textContent = `Xin chào, ${username} ▼`;
      }
  
      if (accountLink) {
        accountLink.textContent = "Đăng xuất";
        accountLink.href = "#";
        accountLink.onclick = function (e) {
          e.preventDefault();
          logout(); // Gọi hàm logout
        };
      }
    }
  }
// ====== ĐĂNG XUẤT ======
window.logout = async function () {
    try {
      await signOut(auth);
      localStorage.clear();
      alert("Đã đăng xuất thành công!");
      window.location.href = "Dangnhap.html";
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };
  export function logout() {
    localStorage.clear();
    alert("Đã đăng xuất!");
    window.location.href = "Dangnhap.html";
  }
  
  // Thêm dòng sau để đăng ký vào global scope nếu gọi từ HTML onclick
  window.logout = logout;  