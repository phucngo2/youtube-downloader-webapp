const fs = require("fs");

export class FileSystemHandler {
    static unlink(filePath: string) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
}
