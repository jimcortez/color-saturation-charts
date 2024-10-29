import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/white.css'
import spectral from 'spectral.js'
import tinycolor from "tinycolor2";
import jscolor from '@eastdesire/jscolor';
import { Iris } from '@scidian/iris';
import Color from "colorjs.io"
import namer from 'color-namer'

function create_saturation_row(title, values){
    const template = document.createElement('template');
    template.innerHTML = `
        <div class="r-hstack justify-center" data-id="colorboxes">
            <div style="width: 200px;" data-id="colortitle">${title}</div>
        </div>
    `
    let row_template = template.cloneNode(true)

    values.forEach((value, i)=>{
        const box_template = document.createElement('template');
        box_template.innerHTML =  `
            <div data-id="box${i+1}" style="background-color: ${value.display()}; width: 50px; height: 50px;"></div>
        `
        row_template.content.firstElementChild.appendChild(box_template.cloneNode(true).content)
    })


    return row_template.content;
}

function _create_section_node(title, extras){
    const template = document.createElement('template');
    template.innerHTML = `
        <section data-auto-animate>
            <h4 class="slide-title" data-id="title">${title}</h4>
            <div class="color_rows"></div>
            ${extras || ""}
        </section>`
    return template
}

function _color_to_rgba(color){
    return color.to('sRGB').toString({
        precision: 0,
        format:{
            name: "rgb",
            commas: true,
            coords: [
                "<number>[0, 255]",
                "<number>[0, 255]",
                "<number>[0, 255]",
                "<alpha>"
            ]
        }
    })
}

function _get_color_sequence(start, end, steps, mix_type){
    if(mix_type === "paint"){
        return spectral.palette(_color_to_rgba(start), _color_to_rgba(end), steps, spectral.RGBA).map(c=>new Color(c))
    } else if(mix_type === "light"){
        return start.steps(end, {steps: steps})
    } else {
        throw new Error('Unknown mix type: '+mix_type);
    }
    
}

function _get_complementary_color(color, mix_type){
    if(mix_type === "paint"){
        let i = new Iris(_color_to_rgba(color))
        // let i = new Iris(color.hsl.h, color.hsl.s, color.hsl.l, 'hsl')
        let compl_iris = i.rybComplementary()
        let compl_iris_hsl = compl_iris.getHSL()

        // return new Color('hsl',[compl_iris_hsl.h, compl_iris_hsl.s, compl_iris_hsl.l])
        return new Color(compl_iris.cssString())
    } else if(mix_type === "light"){
        // https://github.com/color-js/color.js/issues/140
        let complement = color.to('lch')
        complement.lch.hue += 180
        return complement
    } else {
        throw new Error('Unknown mix type: '+mix_type);
    }
}

function create_custom_saturation_slide(colorConfig){
    const configColor = colorConfig.color

    const slide_template = _create_section_node(`Saturation Chart`, `<input id="custom_color_picker" data-id="picker" data-jscolor="{}" value="${_color_to_rgba(configColor)}" />`)
    const picker = new JSColor(slide_template.content.firstElementChild.querySelector('#custom_color_picker'), {
        preset: "dark large thick",
        format: 'rgba'
    })


    let slide_template_node = Array.prototype.slice.call(slide_template.content.childNodes)[0].nextElementSibling;
    let mainColor = configColor;
    let colorSet = false;
    
    picker.onChange = ()=> {
        if(colorSet) {
            mainColor = new Color(picker.toRGBAString())
        }
        
        colorSet = true

        let name = colorConfig.display_name
        console.log(_color_to_rgba(configColor), _color_to_rgba(mainColor))
        if(_color_to_rgba(configColor) !== _color_to_rgba(mainColor)){
            name = namer(mainColor.toString({format:"hex"})).basic[0].name;
        }
        
        slide_template_node.querySelector('.slide-title').innerHTML = `${name}`
        slide_template_node.querySelector('.color_rows').innerHTML = '';

        const steps = 15

        let matchTransparent = new Color(mainColor)
        matchTransparent.alpha = 0
    
        let rows = [
            create_saturation_row('Dilution', _get_color_sequence(mainColor, matchTransparent, steps, colorConfig["mix_type"])),
            create_saturation_row('Tinting', _get_color_sequence(mainColor, new Color("white"), steps, colorConfig["mix_type"])),
            create_saturation_row('Toning', _get_color_sequence(mainColor, new Color("grey"), steps, colorConfig["mix_type"])),
            create_saturation_row('Shading', _get_color_sequence(mainColor, new Color("black"), steps, colorConfig["mix_type"])),
            create_saturation_row('Value', _get_color_sequence(mainColor, _get_complementary_color(mainColor, colorConfig["mix_type"]), steps, colorConfig["mix_type"])),
            // create_saturation_row('Mix', _get_color_sequence(mainColor, mainColor.clone().greyscale().toRgbString(), 2, colorConfig["mix_type"])),
        ]
    
        rows.forEach(row => slide_template_node.querySelector('.color_rows').appendChild(row))
    }

    picker.onChange()

    return slide_template.content
}

let slideElem = document.getElementById('slides')

const cadmiumRed = new Color("rgb(255,39,2)")
const cadmiumYellow = new Color("rgb(254, 236, 0)")
const hansaYellow = new Color("rgb(252, 211, 0)")
const cobaltBlue = new Color("rgb(0,33,133)")
const ultramarineBlue = new Color("rgb(25,0,89)")

const colors = [
    [
        {display_name: "Red (Light, sRGB)", color: new Color("red"), mix_type: "light"},
        {display_name: "Cadmium Red (Paint, Mineral)", color: new Color("rgb(255,39,2)"), mix_type: "paint"},
        //{display_name: "Red (Paint, Organic)", color: "red", mix_type: "paint"}
    ], 
    [
        {display_name: "Yellow (Light, sRGB)", color: new Color("yellow"), mix_type: "light"},
        {display_name: "Cadmium Yellow (Paint, Mineral)", color: cadmiumYellow, mix_type: "paint"},
        {display_name: "Hansa Yellow (Paint, Organic)", color: hansaYellow, mix_type: "paint"}
    ], 
    [
        {display_name: "Blue (Light, sRGB)", color: new Color("blue"), mix_type: "light"},
        {display_name: "Cobalt Blue (Paint, Mineral)", color: cobaltBlue, mix_type: "paint"},
        {display_name: "Ultramarine Blue (Paint, Organic)", color: ultramarineBlue, mix_type: "paint"}
    ], 
    [
        {display_name: "Orange (Light, sRGB)", color: new Color("orange"), mix_type: "light"},
        {display_name: "Orange (Paint, Mineral)", color: cadmiumRed.mix(cadmiumYellow), mix_type: "paint"},
        {display_name: "Orange (Paint, Organic)", color: cadmiumRed.mix(hansaYellow), mix_type: "paint"}
    ] , 
    [
        {display_name: "Green (Light, sRGB)", color: new Color("green"), mix_type: "light"}
    ] , 
    [
        {display_name: "Violet (Light, sRGB)", color: new Color("violet"), mix_type: "light"}
    ] , 
    [
        {display_name: "Red-Orange (Light, sRGB)", color: (new Color("red")).mix(new Color("orange")), mix_type: "light"}
    ], 
    [
        {display_name: "Red-Violet (Light, sRGB)", color: (new Color("red")).mix(new Color("violet")), mix_type: "light"}
    ], 
    [
        {display_name: "Blue-Violet (Light, sRGB)", color: (new Color("blue")).mix(new Color("violet")), mix_type: "light"}
    ], 
    [
        {display_name: "Blue-Green (Light, sRGB)", color: (new Color("blue")).mix(new Color("green")), mix_type: "light"}
    ], 
    [
        {display_name: "Yellow-Green (Light, sRGB)", color: (new Color("yellow")).mix(new Color("green")), mix_type: "light"}
    ],
    [
        {display_name: "Yellow-Orange (Light, sRGB)", color: (new Color("yellow")).mix(new Color("orange")), mix_type: "light"}
    ],
]

colors.forEach(subColors => {
    const sectionElem = document.createElement('section');

    subColors.forEach((config=>sectionElem.appendChild(create_custom_saturation_slide(config))))
  
    slideElem.appendChild(sectionElem)
})

let titleSlideElem = document.getElementById('title-slide')
let randomColorConfig = colors[Math.floor(Math.random() * colors.length)];
let randomColor = randomColorConfig[Math.floor(Math.random() * randomColorConfig.length)].color
// titleSlideElem.setAttribute('data-background-gradient', `radial-gradient(farthest-corner at 40px 40px, #fff, ${randomColor.display()},${backgroundColor.clone().complement().toHexString()}, ${backgroundColor.clone().greyscale().toHexString()})`)

Reveal.initialize();
