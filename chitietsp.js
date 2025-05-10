
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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
const db = getFirestore(app);

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log("Product ID from URL:", productId);
    if (!productId || isNaN(productId)) {
        window.location.href = "Sanpham.html";
        return;
    }

    const products = [
        {
            id: 1,
            name: "Quần bò baggy nam ống suông rộng màu xanh nhạt vải bò jeans",
            price: "265.000đ",
            image: "anh/quanbo.jpg",
            description: "Quần jeans baggy nam, vải denim co giãn mềm mịn, màu xanh nhạt, form chuẩn</br>Thiết kế cạp cao, ống suông rộng, 4 túi tiện lợi, hạn chế phai màu </br> Xuất xứ Việt Nam, size 27-36, đổi trả trong 3 ngày nếu lỗi sản xuất.",
            sale: true,
            salePercent: "70%"
        },
        {
            id: 2,
            name: "Quần jeans baggy nam dáng dài ống suông rộng phối loang màu cá tính vải bò mềm mại",
            price: "325.000đ",
            image: "anh/Q1.jpg",
            description: "Quần jeans baggy nam, vải denim mềm mại, phối loang màu độc đáo, form dáng dài<br>Thiết kế ống suông rộng, thoải mái, phong cách cá tính, trẻ trung<br>Xuất xứ Việt Nam, hỗ trợ đổi trả trong 3 ngày nếu lỗi từ nhà sản xuất.",
            sale: false
        },
        {
            id: 3,
            name: "Quần Jean Nam Ống Rộng Chất Liệu Dày Dặn Phong Cách Đường Phố",
            price: "539.000đ",
            image: "anh/Q2.jpg",
            description: "Quần jeans nam ống rộng, vải denim dày dặn, phong cách đường phố mạnh mẽ<br>Form dáng thoải mái, phù hợp cho giới trẻ yêu thích sự cá tính<br>Xuất xứ Việt Nam, hỗ trợ đổi trả trong 3 ngày nếu lỗi từ nhà sản xuất.",
            sale: false
        },
        {
            id: 4,
            name: "Quần jeans baggy nam dáng dài ống suông rộng màu xanh nhạt wash rách gối cá tính",
            price: "295.000đ",
            image: "anh/Q3.jpg",
            description: "Quần jeans baggy nam, vải denim wash rách gối, màu xanh nhạt, phong cách unisex<br>Thiết kế dáng dài, ống suông rộng, trẻ trung, năng động<br>Xuất xứ Việt Nam, hỗ trợ đổi trả trong 3 ngày nếu lỗi từ nhà sản xuất.",
            sale: false
        },
        {
            id: 5,
            name: "Quần jeans baggy nam dáng đứng ống suông rộng màu xanh, đen wash rách gối cá tính",
            price: "295.000đ",
            image: "anh/Q5.jpg",
            description: "Quần jeans baggy nam, vải denim wash rách gối, màu xanh và đen, dáng đứng<br>Thiết kế ống suông rộng, phong cách cá tính, thoải mái khi mặc<br>Xuất xứ Việt Nam, hỗ trợ đổi trả trong 3 ngày nếu lỗi từ nhà sản xuất.",
            sale: false
        },
        {
            id: 6,
            name: "Áo Sơ Mi Nam Tay Ngắn Dạo Phố Hợp Thời Trang Puffian Đẹp Trai Thường Ngày Phong Cách Hồng Kông Thiết Kế Áo Sơ Mi Mùa Hè",
            price: "325.000đ",
            image: "anh/Q6.jpg",
            description: "Áo sơ mi nam tay ngắn, vải cotton thoáng mát, phong cách Hồng Kông thời thượng<br>Thiết kế hợp thời trang, phù hợp dạo phố, mặc thường ngày<br>Xuất xứ Việt Nam, hỗ trợ đổi trả trong 3 ngày nếu lỗi từ nhà sản xuất.",
            sale: false
        },
        {
            id: 7,
            name: "Áo Thun Local Brand Sancool Unisex Premium Cotton Happy Cats",
            price: "250.000đ",
            image: "anh/Q7.jpg",
            description: "Áo thun unisex từ local brand Sancool, chất liệu cotton cao cấp, in hình mèo vui nhộn, phong cách trẻ trung.",
            sale: false
        },
        {
            id: 8,
            name: "Áo thun ENDE The First Battle Áo phông In nổi Local Brand nam nữ 100% Cotton Form oversize Nhiều màu",
            price: "225.000đ",
            image: "anh/Q8.jpg",
            description: "Áo thun oversize từ local brand ENDE, chất liệu 100% cotton, in nổi cá tính, phù hợp cho cả nam và nữ.",
            sale: true,
            salePercent: "70%"
        }
    ];

    const product = products.find(p => p.id == productId);
    console.log("Found product:", product);

    if (product) {
        document.querySelector('.media-wrap').innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;">
            ${product.sale ? `<div style="color: BLACK; font-size: 20px; background-color: RED; width: 100px; text-align: center;">SALE ${product.salePercent}</div>` : ''}
        `;
        document.querySelector('.product-infor').innerHTML = `
            <h2>${product.name}</h2>
            <p class="price">${product.price}</p>
        `;
        document.querySelector('.product-addform').innerHTML = `
            <form>
                <label>Kích thước:</label>
                <div class="size-buttons">
                    <button type="button" class="size-btn" value="XS">XS</button>
                    <button type="button" class="size-btn" value="S">S</button>
                    <button type="button" class="size-btn" value="M">M</button>
                    <button type="button" class="size-btn" value="L">L</button>
                    <button type="button" class="size-btn" value="XL">XL</button>
                    <button type="button" class="size-btn" value="XXL">XXL</button>
                    <button type="button" class="size-btn" value="3XL">3XL</button>
                </div>
                <br>
                <label>Số lượng:</label>
                <div class="quantity-container">
                <button type="button" class="qty-btn" id="minus">−</button>
                <input type="number" name="quantity" id="quantity" value="1" min="1" max="10" style="width: 50px; text-align: center;">
                <button type="button" class="qty-btn" id="plus">+</button>
                </div>
                <br>
                <label>Mô Tả</label>
                <p class="description">${product.description}</p>
                <div class="button-group">
                    <button type="button" class="buy-now">Mua ngay</button>
                    <button type="button" class="add-to-cart" >Thêm vào giỏ</button>
                </div>
            </form>
        `;
        //Tăng giảm số lượng
        document.getElementById("minus").addEventListener("click", () => {
        const input = document.getElementById("quantity");
        let value = parseInt(input.value) || 1;
        if (value > 1) input.value = value - 1;
        });

        document.getElementById("plus").addEventListener("click", () => {
        const input = document.getElementById("quantity");
        let value = parseInt(input.value) || 1;
        input.value = value + 1;
        });
        const sizeButtons = document.querySelectorAll('.size-btn');
        sizeButtons.forEach(button => {
            button.addEventListener('click', function () {
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
        //Thêm vào giỏ hàng
        document.querySelector(".add-to-cart").addEventListener("click", function () {
            const selectedSize = document.querySelector(".size-btn.active");
            const quantity = parseInt(document.querySelector('input[name="quantity"]').value);

            if (!isUserLoggedIn()) {
                alert("Bạn cần đăng nhập để thêm vào giỏ hàng 😅");
                window.location.href = "Dangnhap.html";
                return;
            }

            if (!selectedSize) {
                alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng 🙏");
                return;
            }

            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItem = cart.find(item => item.ten === product.name && item.size === selectedSize.value);

            if (existingItem) {
                existingItem.soluong += quantity;
            } else {
                cart.push({
                    ten: product.name,
                    gia: parseInt(product.price.replace(/\D/g, "")),
                    size: selectedSize.value,
                    soluong: quantity
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`Đã thêm sản phẩm size ${selectedSize.value} vào giỏ hàng!`);
        });
    } else {
        document.querySelector('.product-infor').innerHTML = '<p>Sản phẩm không tồn tại.</p>';
    }
    //Mua ngay 
    document.querySelector(".buy-now").addEventListener("click", function () {
        const selectedSize = document.querySelector(".size-btn.active");
        const quantity = parseInt(document.querySelector('input[name="quantity"]').value);

        if (!isUserLoggedIn()) {
            alert("Bạn cần đăng nhập để mua hàng 😅");
            window.location.href = "Dangnhap.html";
            return;
        }

        if (!selectedSize) {
            alert("Vui lòng chọn kích thước trước khi mua hàng 🙏");
            return;
        }

        // Hiển thị modal
        document.getElementById("modal-image").src = product.image;
        document.getElementById("modal-name").textContent = product.name;
        document.getElementById("modal-size").textContent = selectedSize.value;
        document.getElementById("modal-quantity").textContent = quantity;
        document.getElementById("modal-price").textContent = (parseInt(product.price.replace(/\D/g, "")) * quantity).toLocaleString();

        document.getElementById("orderModal").classList.remove("hidden");
        document.getElementById("orderModal").style.display = 'flex';  
    });
    
}

document.addEventListener("DOMContentLoaded", loadProductDetails);
