import {sketch, document, page, artboard, groupElements} from "../../../commonAPI";
import fs from "@skpm/fs";
export function imgTagGen(images){
    let imgHtml = [];
    images.forEach(eachImg=>{
        let elementHtml = `<section style="width:${eachImg.frame.width/2}px;height:${eachImg.frame.height/2}px;" ><img src="/images/${eachImg.name}.png"></section>`;
        imgHtml.push(elementHtml);
    })

    return imgHtml;
}