import {sketch,document, page, artboard, groupElements,selectedLayer} from "../../commonAPI";
import {renameThenExportImg, getSelectedImg} from "./img-export-function";



export function imgExporter(selected = selectedLayer) {

    renameThenExportImg();

    const selectedSlice = getSelectedImg(selected);

    if(selectedSlice.length<=0) {
        return null;
    }
    sketch.export(selectedSlice, {output: "/Users/junhongzhu/work/sketch2html/dist/Images/", scales: "2"});
    return selectedSlice;
}


