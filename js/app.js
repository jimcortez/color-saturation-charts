import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/white.css'
import spectral from 'spectral.js'
import tinycolor from "tinycolor2";
import jscolor from '@eastdesire/jscolor';

console.log(Reveal)
console.log(spectral)
console.log(tinycolor)

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
            <div data-id="box${i+1}" style="background-color: ${value}; width: 50px; height: 50px;"></div>
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

function create_custom_saturation_slide(colorConfig){
    const configColor = tinycolor(colorConfig.color)

    const slide_template = _create_section_node(`Saturation Chart`, `<input id="custom_color_picker" data-id="picker" data-jscolor="{}" value="${configColor.toRgbString()}" />`)
    const picker = new JSColor(slide_template.content.firstElementChild.querySelector('#custom_color_picker'), {
        preset: "dark large thick",
        format: 'rgba'
    })


    var slide_template_node = Array.prototype.slice.call(slide_template.content.childNodes)[0].nextElementSibling;
    
    picker.onChange = ()=> {
        const mainColor = tinycolor(picker.toRGBAString())
        const mainColorRBG = mainColor.toRgbString()

        let name = mainColor.toName() || mainColor.toRgbString();
        if(configColor.toRgbString() === mainColorRBG){
            name = colorConfig.display_name
        }
        
        slide_template_node.querySelector('.slide-title').innerHTML = `Saturation Chart - ${name}`
        slide_template_node.querySelector('.color_rows').innerHTML = '';

        const steps = 15
    
        let rows = [
            create_saturation_row('Dilution', spectral.palette(mainColorRBG, mainColor.clone().setAlpha(0).toRgbString(), steps, spectral.RGBA)),
            create_saturation_row('Tinting', spectral.palette(mainColorRBG, tinycolor("white").toRgbString(), steps)),
            create_saturation_row('Toning', spectral.palette(mainColorRBG, tinycolor("grey").toRgbString(), steps)),
            create_saturation_row('Shading', spectral.palette(mainColorRBG, tinycolor("black").toRgbString(), steps)),
            create_saturation_row('Value', spectral.palette(mainColorRBG, mainColor.complement().toRgbString(), steps)),
            create_saturation_row('Mix', spectral.palette(mainColorRBG, mainColor.greyscale().toRgbString(), 2)),
        ]
    
        rows.forEach(row => slide_template_node.querySelector('.color_rows').appendChild(row))
    }

    picker.onChange()

    return slide_template.content
}

let slideElem = document.getElementById('slides')

const colors = [
    {display_name: "Red", color: "red"} , 
    {display_name: "Yellow", color: "yellow"} , 
    {display_name: "Blue", color: "blue"} , 
    {display_name: "Orange", color: "orange"} , 
    {display_name: "Green", color: "green"} , 
    {display_name: "Violet", color: "violet"} , 
    {display_name: "Red-Orange", color: spectral.mix(tinycolor("red").toRgbString(), tinycolor("orange").toRgbString(), 0.5)}, 
    {display_name: "Red-Violet", color: spectral.mix(tinycolor("red").toRgbString(), tinycolor("violet").toRgbString(), 0.5)}, 
    {display_name: "Blue-Violet", color: spectral.mix(tinycolor("blue").toRgbString(), tinycolor("violet").toRgbString(), 0.5)}, 
    {display_name: "Blue-Green", color: spectral.mix(tinycolor("blue").toRgbString(), tinycolor("green").toRgbString(), 0.5)}, 
    {display_name: "Yellow-Green", color: spectral.mix(tinycolor("yellow").toRgbString(), tinycolor("green").toRgbString(), 0.5)},
    {display_name: "Yellow-Orange", color: spectral.mix(tinycolor("yellow").toRgbString(), tinycolor("orange").toRgbString(), 0.5)},
]

colors.forEach(color => slideElem.appendChild(create_custom_saturation_slide(color)))


Reveal.initialize();
