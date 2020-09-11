import {sketch, document, page, artboard, groupElements, selectedLayer} from "../../commonAPI";

function renameThenExportImg() {
    const nameRule = artboard.name + '-';
    groupElements.forEach((each, index) => {
        each.name = nameRule + (index + 1);
        const sliceOfEach = sketch.find("Slice", each);
        sliceOfEach.forEach((eachSlice, index) => {
            eachSlice.name = each.name + "-" + (index + 1);
        })
    })
}


function getSelectedImg(selected) {
    let temp = [];

    temp.push(sketch.find("Slice",selected));
    //  if (selected.length > 0) {
    //     console.log(selected.length);
    //     for (let i = 0; i < selected.length; i++) {
    //         temp.push(sketch.find("Slice", selectedLayer[i]));
    //     }
    // }
    //
    // else{
    //     temp.push(sketch.find("Slice",artboard));
    // }

    return temp.flat();
}


export {renameThenExportImg, getSelectedImg}