export const formatDateDDMMYYYY = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
};

export const formatVND = (n) => new Intl.NumberFormat("vi-VN").format(n) + " ₫";
