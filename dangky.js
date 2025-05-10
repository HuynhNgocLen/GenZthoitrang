document.addEventListener('DOMContentLoaded', () => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tenDangNhap = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Lưu thêm vào Firestore
      await db.collection("users").doc(user.uid).set({
        tenDangNhap,
        email,
        uid: user.uid,
        ngayTao: new Date()
      });

      alert("Đăng ký thành công! Bạn có thể đăng nhập ngay 😎");
      registerForm.reset();
      window.location.href = "Dangnhap.html";
    } catch (error) {
      alert("Đăng ký thất bại: " + error.message);
      console.error("Lỗi:", error);
    }
  });
});
