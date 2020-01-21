
export function loadImage(path, onprogress, onload) {
  const request = new XMLHttpRequest();
  request.open("GET", path, true);
  request.responseType = "blob";
  request.onprogress = onprogress;

  request.onload = function () {
    const blob = new Blob([this.response], { type: "image/png; charset=UTF-8" });
    const objectUrl = window.URL.createObjectURL(blob);
    onload(objectUrl);
  };

  request.send();
}
