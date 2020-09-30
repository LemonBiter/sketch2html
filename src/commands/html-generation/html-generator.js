import {sketch, document, page, artboard, groupElements} from "../../commonAPI";
import fs from "@skpm/fs";
import {nestedSectionGen} from "./tag-generator/nested-section";
import {pTagGen} from "./tag-generator/p-tag";
import {bodyWrap} from "./tag-generator/section-body";

export function htmlGen({singleStyle,images,text}) {


    let htmlDoc = '';
    htmlDoc += pTagGen(text);


    htmlDoc = nestedSectionGen(singleStyle,htmlDoc);




    // htmlDoc = biggestWrapGen(singleStyle,htmlDoc);

    htmlDoc = bodyWrap(htmlDoc);



    fs.writeFileSync("/Users/junhongzhu/work/sketch2html/dist/HTML/index.html", htmlDoc);

}