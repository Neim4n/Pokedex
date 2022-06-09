export function formatText(string:string) {
  return string.split('-').map((e:string) => e[0].toUpperCase() + e.slice(1)).join(' ');
}
