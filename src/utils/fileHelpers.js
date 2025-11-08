/**
 * Convert file to base64
 * @param {File} file
 * @returns {Promise<string>}
 */
export function fileToBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result.toString());
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}
