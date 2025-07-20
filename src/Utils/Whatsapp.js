export const whatsappRedirect = (msg) => {
    const phone = "+918767798079"
    const msg = msg
    const encodedUrlComponent = encodeURIComponent(msg);
    const url = `https://wa.me/${phone}?text=${encodedUrlComponent}`
    window.open(url, "_blank");
  }