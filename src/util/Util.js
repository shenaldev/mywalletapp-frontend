export function numberFormat(number) {
  let n = parseFloat(number).toFixed(2);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Format text if text length is more than 30 chars. Add three dots to end of string
 * @param {*} text Income Or Payment Name
 * @returns Text
 */
export function textFormat(text) {
  if (text.length > 30) {
    const substract = text.substring(0, 30);
    const format = substract.trim();
    const finalText = format + "...";
    return finalText;
  }
  return text;
}

export const toastifyConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
