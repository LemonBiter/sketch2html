export function bodyWrap(insideHTML){
   const bodyLayoutCss = `display: flex;flex-direction:column;justify-content:center;align-items:center;`;
    return `<section style="${bodyLayoutCss}">${insideHTML}</section>`
}