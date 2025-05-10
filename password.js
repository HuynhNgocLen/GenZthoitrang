import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// Hàm đăng ký người dùng
export async function registerUser(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("Đăng ký thành công:", email); // Log để kiểm tra
    return { success: true, message: "Đăng ký thành công! Tài khoản đã được tạo." };
  } catch (error) {
    console.error("Lỗi đăng ký:", error.code, error.message);
    let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email này đã được sử dụng.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Email không hợp lệ.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Mật khẩu quá yếu (cần ít nhất 6 ký tự).";
    }
    return { success: false, message: errorMessage };
  }
}

// Hàm reset mật khẩu
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Vui lòng kiểm tra hộp thư." };
  } catch (error) {
    console.error("Lỗi:", error.code, error.message);
    let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
    if (error.code === "auth/invalid-email") {
      errorMessage = "Email không hợp lệ.";
    } else if (error.code === "auth/user-not-found") {
      errorMessage = "Không tìm thấy tài khoản với email này.";
    }
    return { success: false, message: errorMessage };
  }
}