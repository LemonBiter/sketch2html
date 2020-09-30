import {document} from "../../commonAPI";
import {elementClassify} from "../../common-function";
import titleHtmlGen from "./title-html-generation"

export function titleExport(){
    const selectedLayer = (document.selectedLayers.layers)[0];

    let selectedLayerObj = elementClassify(selectedLayer);

    titleHtmlGen(selectedLayerObj);
}