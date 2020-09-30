import {sketch,document, page, artboard, groupElements} from "../../commonAPI";
import {imgExporter} from "../img-export/img-export";
import {changeCoordinatesBasis} from "../../common-function";
import {htmlGen} from "../html-generation/html-generator";
import {elementClassify} from "../../common-function";


export function oneButtonGeneration(){
    const selectedLayer = (document.selectedLayers.layers)[0];

    let singleStyleObj = elementClassify(selectedLayer);

    htmlGen(singleStyleObj);
}