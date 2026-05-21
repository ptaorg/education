(function () {
  const printButton = document.getElementById("printButton");
  const copyButton = document.getElementById("copyNotice");
  const copyStatus = document.getElementById("copyStatus");
  const noticeText = document.getElementById("noticeText");
  const checks = Array.from(document.querySelectorAll(".checklist input"));
  const resetButton = document.getElementById("resetChecks");
  const progressCircle = document.getElementById("progressCircle");
  const progressValue = document.getElementById("progressValue");
  const progressText = document.getElementById("progressText");
  const dashLength = 302;

  function updateProgress() {
    const done = checks.filter((item) => item.checked).length;
    const total = checks.length;
    const ratio = total === 0 ? 0 : done / total;
    const percent = Math.round(ratio * 100);

    progressCircle.style.strokeDashoffset = String(dashLength - dashLength * ratio);
    progressValue.textContent = percent + "%";
    progressText.textContent = done + " / " + total + "項目 完了";
  }

  printButton.addEventListener("click", () => {
    window.print();
  });

  copyButton.addEventListener("click", async () => {
    const text = noticeText.innerText.trim();

    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = "コピーしました。";
    } catch (error) {
      copyStatus.textContent = "選択してコピーしてください。";
      const range = document.createRange();
      range.selectNodeContents(noticeText);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }

    window.setTimeout(() => {
      copyStatus.textContent = "";
    }, 2400);
  });

  checks.forEach((item) => item.addEventListener("change", updateProgress));

  resetButton.addEventListener("click", () => {
    checks.forEach((item) => {
      item.checked = false;
    });
    updateProgress();
  });

  updateProgress();
})();
