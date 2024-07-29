import mime from "mime-types";

export function getVideoContentType(container: string): string {
  return mime.contentType(container) || "video/mp4";
}

export const throttle = (fn: Function, ms = 300) => {
  var wait = false;
  return function (this: any, ...args: any[]) {
    if (!wait) {
      fn.apply(this, args);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, ms);
    }
  };
};

export const removeIllegalCharactersFromFilename = (filename: string) => {
  return filename.replace(/[/\\?%*:|"<>]/g, "-");
};
