export const resolve = (obj, path, defaultValue = undefined) => {
  try {
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');
    const arr = path.split('.');
    for (var i = 0; i < arr.length; ++i) {
      var key = arr[i];
      if (key in obj) {
        obj = obj[key];
      } else {
        return defaultValue;
      }
    }
    return obj && obj || defaultValue;
  } catch {
    return defaultValue;
  }
};
