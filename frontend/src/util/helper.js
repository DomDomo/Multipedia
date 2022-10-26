export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const deslugify = (str) => str.replaceAll("-", " ");

export const objIsEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
