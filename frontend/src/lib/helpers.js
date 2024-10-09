export const getFormData = (e) => {
  const formData = new FormData(e.target);
  return Object.fromEntries(formData);
};

export const setFieldValue = (name, value) => {
  const element = document.querySelector(`*[name="${name}"]`);
  if (!element) return console.error("Element not found: ", name);
  element.value = value;
};
