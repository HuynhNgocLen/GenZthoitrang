import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 💥 Thay bằng config thật của bạn từ Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCz4_jgbAULdLwqmZfv6RYz86qvHeuvdgU",
    authDomain: "notlen-df3d3.firebaseapp.com",
    projectId: "notlen-df3d3",
    storageBucket: "notlen-df3d3.firebasestorage.app",
    messagingSenderId: "1013822240707",
    appId: "1:1013822240707:web:8ae03955b80e217ffbef76",
    measurementId: "G-2RE6REVFM2"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ====== ĐĂNG NHẬP ======
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", user.email);

        alert("Đăng nhập thành công! 🎉");
        window.location.href = "index.html";
      } catch (error) {
        console.error("Đăng nhập thất bại:", error.code);
        alert("Tài khoản hoặc mật khẩu sai!");
      }
    });
  }

  showWelcome();
});

// ====== HIỂN TÊN NGƯỜI DÙNG ======
import { showWelcome, logout } from './showelcome.js';



