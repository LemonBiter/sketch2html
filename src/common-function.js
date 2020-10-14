import {imgExporter} from "./commands/img-export/img-export";
import {sketch,selectedLayer} from "./commonAPI";

function elementClassify(singleStyle){

    const totalWidth = singleStyle.frame.width/2;
    const totalHeight = singleStyle.frame.height/2;
    const selectedLayerChildren = singleStyle.layers;


    let images = imgExporter(singleStyle);  //获取当前选中的样式图片集合
    let text = (sketch.find("Text", singleStyle))[0]; //拿到样式的文本对象
    let bgWrap = (sketch.find('[name="bg"]',singleStyle))[0]; //拿到作为包裹的容器
    let borderWrap = (sketch.find('[name="bd"]',singleStyle))[0];


    return {singleStyle,images,text,bgWrap,borderWrap};
}

function getBorderRadius(layer){

    if(!layer.points){
        return null;
    }

    let array = layer.points;
    let radius = '';

    array.forEach((each,index,array)=>{

        radius +=(each.cornerRadius/2)+ "px" + (index===(array.length-1)?'':" ");

    })

    return radius;
}

function getBackground(layer){
    const gr = (layer.style.fills)[0];

    console.log(gr.gradient);

    if(layer.style.fills.length<=0){
        return null;
    }
    const background = (layer.style.fills)[0];
    return background.enabled?background.color:"transparent";
}

function getBorder(layer){

    const borderOptions = (layer.style.borderOptions);
    const borderDetail = (layer.style.borders)[0];
    if(!borderDetail||!borderDetail.enabled){
        return null;
    }
    else {
        const borderWidth= Math.ceil((borderDetail.thickness)/2) + "px";
        const borderStyle = (borderOptions.dashPattern)>0?"dashed":"solid";
        const borderColor = borderDetail.color;

        return `${borderWidth} ${borderStyle} ${borderColor}`;
    }
}

function getDataPositionInHTML(htmlEl){
    return {
        x: parseInt((/data-x=".*?"/.exec(htmlEl))[0].match(/\d+/g)),  //从html语句中抓取data-数据，再进一步拿到数字
        y: parseInt((/data-y=".*?"/.exec(htmlEl))[0].match(/\d+/g)),
        width: parseInt((/data-width=".*?"/.exec(htmlEl))[0].match(/\d+/g)),
        height: parseInt((/data-height=".*?"/.exec(htmlEl))[0].match(/\d+/g))
    }
}

function getPadding(layer,paddingObj){

    let padding = {
        top: Math.ceil((paddingObj.y - layer.y)),
        right:Math.ceil((layer.width - paddingObj.width)-Math.ceil((paddingObj.x-layer.x))),
        bottom: Math.ceil((layer.height-paddingObj.height)-Math.ceil(paddingObj.y - layer.y)),
        left:Math.ceil((paddingObj.x-layer.x))
    }
    let haveTranslate = checkTranslate(padding);
    if(haveTranslate!==null){
        return haveTranslate;
    }
    else
        return {padding:`${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`};


}

function checkTranslate(padding){
    let translateSize = {};
    for(let i in padding){
        if(padding[i]<0){
            translateSize[i] = padding[i];
        }
    }
    let translate = {};
    if(Object.keys(translateSize).length>0){
        for(let i in translateSize){
            switch (i) {
                case "top":
                    translate.y = translateSize[i]*-1;//取正
                    break;
                case "right":
                    translate.x = translateSize[i];
                    break;
                case "bottom":
                    translate.y = translateSize[i];
                    break;
                case "left":
                    translate.x = translateSize[i]*-1;
                    return;
            }
        }
        if(!translate.x){
            translate.x = 0;
        }
        if(!translate.y){
            translate.y = 0;
        }
        return translate;
    }

    return null;

}

function changeCoordinatesBasis(singleStyle,layer){
    let newRect = layer.frame.changeBasis({from:layer.parent,to: singleStyle});
    let position = {
        x: Math.ceil(newRect.x/2),
        y: Math.ceil(newRect.y/2),
        width: Math.ceil(newRect.width/2),
        height: Math.ceil(newRect.height/2)
    }

    return position;    //将每个子图层坐标定位成以主图层为基点
}

function camelToDash(string){
    let result = "";
    for(let i of string){
        let char = i;
        if(/[A-Z]/.test(i)){
            char = '-'+i.toLowerCase();
        }
        result += char;
    }
    return result;
}


export {elementClassify,getBorderRadius,getBackground,getBorder,getDataPositionInHTML,getPadding,changeCoordinatesBasis,camelToDash};