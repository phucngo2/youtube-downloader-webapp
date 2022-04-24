const crypto = require("crypto");

export class Random {
    public static uuid(): string {
        return crypto.randomUUID();
    }
}
