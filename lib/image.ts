// /lib/image.ts
export async function fetchUrlToBuffer(url: string): Promise<Buffer> {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Failed to fetch image: ${r.status}`);
    const ab = await r.arrayBuffer();
    return Buffer.from(ab);
}

export async function fileToBuffer(f: File): Promise<Buffer> {
    const ab = await f.arrayBuffer();
    return Buffer.from(ab);
}
