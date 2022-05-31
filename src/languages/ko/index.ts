const files = import.meta.globEager("./*.json");
const modules = {};

Object.keys(files).forEach(key => {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
    Object.assign(modules, files[key].default);
  }
});

export default modules;
