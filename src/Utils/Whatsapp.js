export const whatsappRedirect = (message) => {
    const phone = "+918767798079"
    const msg = message
    const encodedUrlComponent = encodeURIComponent(msg);
    const url = `https://wa.me/${phone}?text=${encodedUrlComponent}`
    window.open(url, "_blank");
  }