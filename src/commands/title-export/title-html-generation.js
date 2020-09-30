import {pTagGen} from "../html-generation/tag-generator/p-tag";
import {nestedSectionGen} from "../html-generation/tag-generator/nested-section";
import {bodyWrap} from "../html-generation/tag-generator/section-body";
import fs from "@skpm/fs";

export default function(selectedLayerObj){

    let {singleStyle,text} = selectedLayerObj;
    console.log(singleStyle);
    let htmlDoc = '';

    htmlDoc += pTagGen(text);

    htmlDoc = nestedSectionGen(singleStyle,htmlDoc);

    htmlDoc = bodyWrap(htmlDoc);

    fs.writeFileSync("/Users/junhongzhu/work/material-workshop-2/src/html/title/test.html", htmlDoc);

}