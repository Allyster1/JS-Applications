export function createSubmitHandler(callback) {
  return function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    callback(data);
  };
}
