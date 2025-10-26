export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const mark = url.searchParams.get('mark') || '1';
    const token = url.searchParams.get('t') || '';
  
    // naive check (replace with HMAC or KV lookup)
    const valid = token && token.length > 20;
    if (!valid) return new Response("Forbidden", { status: 403 });
  
    // map mark to file URL (R2 or your storage)
    const origin = `https://media.notborges.org/lamb/mark-${mark}.mp3`;
    return fetch(origin);
  }