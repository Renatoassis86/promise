export const ADMIN_EMAILS = ["calebe@promiseenglish.com"];

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}
