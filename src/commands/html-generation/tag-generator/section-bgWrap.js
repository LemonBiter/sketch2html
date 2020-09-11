

export function bgWrapGen(bgInfo,inner,insideHTML){
    const style = bgInfo.style;

    let padding = {
        left: Math.floor((inner.frame.x - bgInfo.frame.x)/2),
        right:Math.floor((bgInfo.frame.width - inner.frame.width - (inner.frame.x - bgInfo.frame.x))/2),
        top: Math.floor((inner.frame.y - bgInfo.frame.y)/2),
        bottom:Math.floor((bgInfo.frame.height - inner.frame.height - (inner.frame.y - bgInfo.frame.y))/2)
    }


   let wrapHtml = `<section style="background-color:${(style.fills)[0].color};padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;">${insideHTML}</section>`



    return wrapHtml;

}