import { VideoFormat } from "../types";

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export function humanFileSize(
  bytes: number,
  si: boolean = false,
  dp: number = 1
) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

export function downloadBlob(blob: BlobPart, fileName: string) {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;

  link.setAttribute("download", fileName);

  document.body.appendChild(link);
  link.click();
}

export function filterDownloadFormat(formats: VideoFormat[]) {
  let res = formats.filter(
    (format) =>
      format.qualityLabel &&
      format.container === "mp4" &&
      (format.qualityLabel.startsWith("720") ||
        format.qualityLabel.startsWith("1080"))
  );

  res.unshift({
    quality: "highestvideo",
    container: "mp4",
    contentLength: "Very large!",
    itag: "highestvideo",
    mimeType: "video/mp4",
    qualityLabel: "Highest Quality",
    hasAudio: false,
    hasVideo: true,
    fps: 0,
    bitrate: 0,
    audioQuality: "",
    url: "",
  });

  res.push({
    quality: "highestaudio",
    container: "mp3",
    contentLength: "Very large!",
    itag: "highestaudio",
    mimeType: "audio/mpeg",
    qualityLabel: "Audio",
    hasAudio: true,
    hasVideo: false,
    fps: 0,
    bitrate: 0,
    audioQuality: "highestaudio",
    url: "",
  });

  return res;
}
