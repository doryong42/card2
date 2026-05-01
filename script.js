(function () {
  const card = document.getElementById("card");
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  document.querySelectorAll(".btn-copy").forEach(function (btn) {
    btn.addEventListener("click", async function () {
      const text = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(text);
        showToast("클립보드에 복사했습니다.");
      } catch {
        showToast("복사에 실패했습니다. 브라우저 권한을 확인해 주세요.");
      }
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!card || reduceMotion) return;

  let rect = card.getBoundingClientRect();

  function updateRect() {
    rect = card.getBoundingClientRect();
  }

  window.addEventListener("resize", updateRect);

  card.addEventListener("pointermove", function (e) {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    const maxDeg = 6;
    const rx = (-py * maxDeg).toFixed(2);
    const ry = (px * maxDeg).toFixed(2);
    card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
  });

  card.addEventListener("pointerleave", function () {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
})();
