const download = document.querySelector(".download")
const dark = document.querySelector(".dark")
const light = document.querySelector(".light")
const qrContainer = document.querySelector("#qr-code")
const qrText = document.querySelector(".qr-text")
const shareBtn = document.querySelector(".share-btn")
const sizes = document.querySelector(".sizes")

dark.addEventListener("input", handleDarkColor)
light.addEventListener("input", handleLightColor)
qrText.addEventListener("input", handleQRText)
sizes.addEventListener("change", handleSize)
shareBtn.addEventListener("click", handleShare)

let defaultUrl = "https://github.com/AbdurasulovSardor"
let colorLight = "#FFF",
  colorDark = "#000",
  text = defaultUrl,
  size = 300

function handleDarkColor(e) {
  colorDark = e.target.value
  generateQRCode()
}

function handleLightColor(e) {
  colorLight = e.target.value
  generateQRCode()
}

function handleQRText(e) {
  let value = e.target.value
  text = value
  if (!text) text = defaultUrl
  generateQRCode()
}

function handleSize(e) {
  size = e.target.value
  generateQRCode()
}

function handleShare() {
  setTimeout(async () => {
    try {
      const baseUrl = resolveDataUrl()
      const blob = await (await fetch(baseUrl)).blob()
      const file = new File([blob], "QRCode.png", {
        type: blob.type
      })
      await navigator.share({
        files: [file],
        title: text
      })
    } catch (error) {
      alert("Your browser doesn't support sharing.*")
    }
  }, 100);
}

function generateQRCode() {
  qrContainer.textContent = ""
  new QRCode("qr-code", {
    text,
    height: size,
    width: size,
    colorLight,
    colorDark
  })
  download.href = resolveDataUrl()
}

function resolveDataUrl() {
  setTimeout(() => {
    const img = document.querySelector("#qr-code img")
    if (img.currentSrc) {
      return img.currentSrc
    }
    const canvas = document.querySelector("canvas")
    return canvas.toDataURL()
  }, 1000);
}

generateQRCode()
