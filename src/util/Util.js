export function numberFormat(number) {
  let n = parseFloat(number).toFixed(2);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
