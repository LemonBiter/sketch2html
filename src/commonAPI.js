import sketch from 'sketch';//获取sketch API控制权
import fs from "@skpm/fs";

const document = sketch.getSelectedDocument();  //获取文档API
const page = (document.pages)[0];  //获取当前页面API
const artboard = (page.layers)[0];  //获取当前画板API
const groupElements = artboard.layers;  //获取当前画板的单样式数组
let selectedLayer = document.selectedLayers.layers; //用户选中的图层

export {fs,sketch,document,page,artboard,groupElements,selectedLayer}