export function parseNumber(object: any, column: string): number {
    return parseInt(object[column]);
}

export function parseString(object: any, column: string): string {
    return object[column].toString();
}