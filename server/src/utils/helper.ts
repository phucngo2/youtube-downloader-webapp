import mime from "mime-types";

export function getVideoContentType(container: string): string {
    return mime.contentType(container) || "video/mp4";
}
