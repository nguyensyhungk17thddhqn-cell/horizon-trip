// Horizon Trip — các chức năng tương tác viết bằng JavaScript thuần
document.documentElement.classList.add("js-ready");

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
const toast = $("#toast");
let toastTimer;

// Thông báo ngắn dùng chung cho các thao tác trên trang.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

// Menu điều hướng trên màn hình nhỏ.
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
$$(".main-nav a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Nội dung mẫu để hộp thoại "Đọc thêm" có thông tin cụ thể.
const articleDetails = {
  "ha-giang": {
    category: "CẨM NANG · VIỆT NAM",
    title: "Hà Giang: nơi những ngọn núi chạm vào mây",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    paragraphs: [
      "Hà Giang hấp dẫn bởi cao nguyên đá, những cung đường quanh co và các bản làng nép mình bên sườn núi. Mỗi mùa lại mang một vẻ đẹp riêng, từ sắc hoa theo mùa đến những thửa ruộng và lớp mây trôi trên đỉnh đèo.",
      "Trước chuyến đi, hãy kiểm tra dự báo thời tiết, lên lịch trình phù hợp với sức khỏe và dành thời gian tìm hiểu phong tục địa phương. Nếu đi xe máy, cần có kỹ năng lái xe đường đèo và luôn ưu tiên an toàn."
    ],
    tip: "Gợi ý: đi chậm, dừng ở điểm được phép và tôn trọng không gian sống của cộng đồng địa phương."
  },
  bali: {
    category: "TRẢI NGHIỆM · CHÂU Á",
    title: "Bali không chỉ có biển xanh và nắng vàng",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    paragraphs: [
      "Bali là sự kết hợp của bờ biển nhiệt đới, đền thờ, ruộng bậc thang và những thị trấn có nhịp sống thư thái. Du khách có thể dành một ngày khám phá thiên nhiên, một ngày tìm hiểu văn hóa và một ngày nghỉ ngơi.",
      "Khi thăm các địa điểm linh thiêng, hãy chú ý quy định trang phục và cách ứng xử. Nên đặt trước những dịch vụ cần thiết vào mùa cao điểm và tính thêm thời gian di chuyển."
    ],
    tip: "Gợi ý: tìm hiểu nghi thức địa phương trước khi chụp ảnh tại đền hoặc khu vực thờ tự."
  },
  switzerland: {
    category: "CẢM HỨNG · CHÂU ÂU",
    title: "Thụy Sĩ: bản giao hưởng của núi và hồ",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85",
    paragraphs: [
      "Thụy Sĩ nổi bật với hồ nước trong, những ngôi làng yên bình và dãy Alps hùng vĩ. Tàu hỏa là lựa chọn thuận tiện để ngắm phong cảnh trên đường đi, trong khi các tuyến đi bộ mở ra góc nhìn gần gũi với thiên nhiên.",
      "Chi phí tại đây có thể khá cao, vì vậy hãy lên ngân sách trước, kiểm tra lịch hoạt động theo mùa và chuẩn bị quần áo phù hợp với thời tiết vùng núi."
    ],
    tip: "Gợi ý: kiểm tra giờ tàu và điều kiện thời tiết trước khi đi bộ đường dài."
  }
};

const placeDetails = {
  halong: ["Vịnh Hạ Long", "Việt Nam · Di sản thiên nhiên", "Vịnh nổi tiếng với hàng nghìn đảo đá vôi, làn nước xanh và các hang động. Bạn có thể tìm hiểu tour tham quan vịnh, lựa chọn thời lượng phù hợp và kiểm tra dự báo thời tiết trước khi khởi hành.", "Gợi ý: chọn đơn vị du lịch uy tín và tuân thủ quy định bảo vệ môi trường biển.", "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85"],
  hagiang: ["Hà Giang", "Việt Nam · Khám phá", "Cao nguyên đá và những cung đường đèo tạo nên cảnh quan đặc trưng của vùng cực Bắc. Hãy sắp xếp lịch trình vừa sức và tìm hiểu văn hóa các cộng đồng nơi bạn ghé thăm.", "Gợi ý: ưu tiên an toàn trên đường đèo và tránh di chuyển khi thời tiết xấu.", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"],
  dalat: ["Đà Lạt", "Việt Nam · Nghỉ dưỡng", "Đà Lạt được yêu thích bởi khí hậu mát, rừng thông, hồ và các quán nhỏ. Bạn có thể kết hợp tham quan thiên nhiên với khám phá ẩm thực địa phương.", "Gợi ý: mang áo khoác nhẹ và kiểm tra dự báo mưa khi lên lịch.", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85"],
  bali: ["Bali, Indonesia", "Châu Á · Văn hóa", "Bali có biển, đền cổ, ruộng bậc thang và nhiều hoạt động ngoài trời. Nên cân bằng lịch trình giữa tham quan và nghỉ ngơi.", "Gợi ý: tôn trọng quy định tại các địa điểm linh thiêng.", "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85"],
  japan: ["Nhật Bản", "Châu Á · Truyền thống", "Nhật Bản mang đến sự kết hợp giữa phố hiện đại, di tích truyền thống và thiên nhiên theo mùa. Tàu công cộng thường là phương án hữu ích để di chuyển giữa các khu vực.", "Gợi ý: kiểm tra lịch mùa hoa hoặc lá đỏ và quy tắc sử dụng phương tiện công cộng.", "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85"],
  switzerland: ["Thụy Sĩ", "Châu Âu · Thiên nhiên", "Hồ xanh, làng núi và dãy Alps là điểm nhấn của Thụy Sĩ. Lên ngân sách và kiểm tra lịch tàu giúp hành trình thuận lợi hơn.", "Gợi ý: chuẩn bị quần áo nhiều lớp khi tham quan vùng núi.", "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85"],
  banff: ["Banff, Canada", "Châu Mỹ · Ngoạn mục", "Banff nổi tiếng với hồ băng, rừng thông và những cung đường đi bộ. Hãy tìm hiểu quy định tại công viên và điều kiện đường đi theo mùa.", "Gợi ý: giữ khoảng cách an toàn với động vật hoang dã và không cho chúng ăn.", "https://images.unsplash.com/photo-1503614472-8c93d56cd9b6?auto=format&fit=crop&w=1200&q=85"],
  namibia: ["Sa mạc Namibia", "Châu Phi · Hoang sơ", "Những đụn cát rộng lớn và bầu trời mở tạo nên cảnh quan rất khác biệt. Chuyến đi cần được chuẩn bị kỹ về phương tiện, nước uống và khoảng cách giữa các điểm.", "Gợi ý: chọn hướng dẫn viên hoặc đơn vị tổ chức đáng tin cậy khi đi vào vùng xa.", "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=85"]
};

const detailDialog = $("#detailDialog");
const dialogContent = $("#dialogContent");

function openDetail({ category, title, image, paragraphs, tip }) {
  dialogContent.innerHTML = `
    <img class="dialog-content-image" src="${image}" alt="${title}">
    <div class="dialog-content-body">
      <p class="eyebrow">${category}</p>
      <h2>${title}</h2>
      ${paragraphs.map(p => `<p>${p}</p>`).join("")}
      <p class="dialog-tip">${tip}</p>
    </div>`;
  detailDialog.showModal();
  document.body.classList.add("dialog-open");
}

$$(".read-more").forEach(button => {
  button.addEventListener("click", () => {
    const item = articleDetails[button.dataset.article];
    if (item) openDetail(item);
  });
});

$$(".destination-detail").forEach(button => {
  button.addEventListener("click", () => {
    const item = placeDetails[button.dataset.place];
    if (!item) return;
    openDetail({
      category: item[1], title: item[0], image: item[4],
      paragraphs: [item[2]], tip: item[3]
    });
  });
});

$("#dialogClose").addEventListener("click", () => detailDialog.close());
detailDialog.addEventListener("click", event => {
  if (event.target === detailDialog) detailDialog.close();
});
detailDialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

// Lọc thẻ điểm đến theo khu vực.
const filterButtons = $$(".filter-btn");
const destinationCards = $$(".destination-card");
function filterDestinations(region) {
  let count = 0;
  destinationCards.forEach(card => {
    const show = region === "all" || card.dataset.region === region;
    card.hidden = !show;
    if (show) count++;
  });
  $("#noDestinations").hidden = count !== 0;
}
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    filterDestinations(button.dataset.filter);
  });
});

// Tìm kiếm không phân biệt chữ hoa/thường và dấu tiếng Việt.
function normalizeText(text) {
  return text.toLocaleLowerCase("vi").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}
$("#searchForm").addEventListener("submit", event => {
  event.preventDefault();
  const query = normalizeText($("#siteSearch").value.trim());
  const status = $("#searchStatus");
  if (!query) {
    status.textContent = "Hãy nhập tên điểm đến hoặc từ khóa bạn muốn tìm.";
    $("#siteSearch").focus();
    return;
  }

  // Trở về bộ lọc tất cả để kết quả tìm kiếm không bị ẩn bởi bộ lọc cũ.
  filterButtons.forEach(item => item.classList.toggle("active", item.dataset.filter === "all"));
  let articleCount = 0;
  $$(".article-card").forEach(card => {
    const haystack = normalizeText(card.innerText + " " + (card.dataset.search || ""));
    const match = haystack.includes(query);
    card.hidden = !match;
    if (match) articleCount++;
  });
  let destinationCount = 0;
  destinationCards.forEach(card => {
    const haystack = normalizeText(card.innerText + " " + (card.dataset.search || ""));
    const match = haystack.includes(query);
    card.hidden = !match;
    if (match) destinationCount++;
  });
  $("#noArticles").hidden = articleCount !== 0;
  $("#noDestinations").hidden = destinationCount !== 0;
  status.textContent = `Tìm thấy ${articleCount} bài viết và ${destinationCount} điểm đến phù hợp.`;
  document.querySelector(articleCount ? "#articles" : "#destinations").scrollIntoView({ behavior: "smooth" });
});
$("#siteSearch").addEventListener("input", () => {
  if (!$("#siteSearch").value.trim()) {
    $$(".article-card, .destination-card").forEach(card => card.hidden = false);
    $("#noArticles").hidden = true;
    $("#noDestinations").hidden = true;
    $("#searchStatus").textContent = "";
    filterDestinations($(".filter-btn.active")?.dataset.filter || "all");
  }
});

// Lightbox cho bộ sưu tập ảnh.
const lightboxDialog = $("#lightboxDialog");
$$(".gallery-item").forEach(button => {
  button.addEventListener("click", () => {
    const image = $("#lightboxImage");
    image.src = button.dataset.image;
    image.alt = button.dataset.caption || "Ảnh phong cảnh";
    $("#lightboxCaption").textContent = button.dataset.caption || "";
    lightboxDialog.showModal();
    document.body.classList.add("dialog-open");
  });
});
function closeLightbox() {
  lightboxDialog.close();
  $("#lightboxImage").src = "";
}
$("#lightboxClose").addEventListener("click", closeLightbox);
lightboxDialog.addEventListener("click", event => {
  if (event.target === lightboxDialog) closeLightbox();
});
lightboxDialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

// Kiểm tra form liên hệ. Phiên bản demo không gửi dữ liệu ra ngoài.
$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = $("#formStatus");
  const name = $("#fullName").value.trim();
  const email = $("#email").value.trim();
  const subject = $("#subject").value;
  const message = $("#message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  status.className = "form-status";
  if (name.length < 2) {
    status.textContent = "Vui lòng nhập họ tên gồm ít nhất 2 ký tự.";
    status.classList.add("error");
    $("#fullName").focus();
    return;
  }
  if (!emailPattern.test(email)) {
    status.textContent = "Email chưa đúng định dạng. Vui lòng kiểm tra lại.";
    status.classList.add("error");
    $("#email").focus();
    return;
  }
  if (!subject) {
    status.textContent = "Vui lòng chọn chủ đề liên hệ.";
    status.classList.add("error");
    $("#subject").focus();
    return;
  }
  if (message.length < 10) {
    status.textContent = "Nội dung cần có ít nhất 10 ký tự để nhóm hiểu câu hỏi của bạn.";
    status.classList.add("error");
    $("#message").focus();
    return;
  }

  status.textContent = `Cảm ơn ${name}! Biểu mẫu đã được kiểm tra thành công trên trình duyệt. Đây là bản demo nên lời nhắn chưa được gửi đến email thật.`;
  status.classList.add("success");
  showToast("Biểu mẫu hợp lệ — đây là bản demo, chưa gửi email.");
  form.reset();
});

// Hiệu ứng xuất hiện khi cuộn trang, có dự phòng cho trình duyệt cũ.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(element => observer.observe(element));
} else {
  $$(".reveal").forEach(element => element.classList.add("visible"));
}

$("#year").textContent = new Date().getFullYear();
