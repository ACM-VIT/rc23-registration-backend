export function generateCode(): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * 26));
  }
  return result;
}
