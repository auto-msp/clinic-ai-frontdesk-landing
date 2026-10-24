/** Public configuration only. Set the booking URL in Vercel and rebuild. */
const candidate = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
function validBookingUrl(value: string | undefined): string | null {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password ? url.href : null; }
  catch { return null; }
}
export const bookingUrl = validBookingUrl(candidate);
export const demoHref = bookingUrl ?? "/book-demo";
