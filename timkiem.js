document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("q")?.toLowerCase() || "";
  
    // Danh sách sản phẩm mẫu 
    const sanPhams = [
      {
        ten: "Quần bò baggy nam ống suông rộng màu xanh nhạt vải bò jeans",
        gia: 265000,
        img: "anh/quanbo.jpg"
      },
      {
        ten: "Quần jeans baggy nam dáng dài ống suông rộng phối loang màu cá tính vải bò mềm mại",
        gia: 325000,
        img: "anh/Q1.jpg"
      },
      {
        ten: "Quần Jean Nam Ống Rộng Chất Liệu Dày Dặn Phong Cách Đường Phố",
        gia: 539000,
        img: "anh/Q2.jpg"
      },
      {
        ten: "Quần jeans baggy nam dáng dài ống suông rộng màu xanh nhạt wash rách gối cá tính",
        gia: 295000,
        img: "anh/Q3.jpg"
      },
      {
        ten: "Quần jeans baggy nam dáng đứng ống suông rộng màu xanh, đen wash rách gối cá tính",
        gia: 295000,
        img: "anh/Q5.jpg"
      },
      {
        ten: "Áo Sơ Mi Nam Tay Ngắn Dạo Phố Hợp Thời Trang Puffian Đẹp Trai Thường Ngày Phong Cách Hồng Kông Thiết Kế Áo Sơ Mi Mùa Hè",
        gia: 325000,
        img: "anh/Q6.jpg"
      },
      {
        ten: "Áo Thun Local Brand Sancool Unisex Premium Cotton Happy Cats",
        gia: 250000,
        img: "anh/Q7.jpg"
      },
      {
        ten: "Áo thun ENDE The First Battle Áo phông In nổi Local Brand nam nữ 100% Cotton Form oversize Nhiều màu",
        gia: 225000,
        img: "anh/Q8.jpg"
      },
    ];
  
    const ketQuaDiv = document.getElementById("ketqua-timkiem");
    const ketQua = sanPhams.filter(sp => sp.ten.toLowerCase().includes(keyword));
  
    if (ketQua.length === 0) {
      ketQuaDiv.innerHTML = "<p>Không tìm thấy sản phẩm nào phù hợp.</p>";
    } else {
      ketQua.forEach(sp => {
        ketQuaDiv.innerHTML += `
          <div class="osanpham">
            <img src="${sp.img}" alt="${sp.ten}">
            <h3>${sp.ten}</h3>
            <p class="price">${sp.gia.toLocaleString()}đ</p>
            <div class="buttons">
              <button class="buy-now">Mua ngay</button>
              <button onclick="themVaoGio('${sp.ten}', ${sp.gia})">Thêm vào giỏ hàng</button>
            </div>
          </div>
        `;
      });
    }
  });
  
  function themVaoGio(ten, gia) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let found = cart.find(item => item.ten === ten);
    if (found) {
      found.soluong += 1;
    } else {
      cart.push({ ten: ten, gia: gia, soluong: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`"${ten}" đã được thêm vào giỏ hàng!`);
  }
  
