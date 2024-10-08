import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/white.css'
import spectral from 'spectral.js'
import tinycolor from "tinycolor2";

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

function create_saturation_slide(colorConfig) {
    const template = document.createElement('template');
    template.innerHTML = `
        <section data-auto-animate>
            <h4 data-id="title">Saturation Chart - ${colorConfig.display_name}</h4>
        </section>`
    let slide_template = template.cloneNode(true)

    const steps = 15
    const mainColor = tinycolor(colorConfig.color).setAlpha(1)
    mainColor.setAlpha(.99)
    const mainColorRBG = mainColor.toRgbString()

    let rows = [
        create_saturation_row('Dilution', spectral.palette(mainColorRBG, mainColor.clone().setAlpha(0).toRgbString(), steps, spectral.RGBA)),
        create_saturation_row('Tinting', spectral.palette(mainColorRBG, tinycolor("white").toRgbString(), steps)),
        create_saturation_row('Toning', spectral.palette(mainColorRBG, tinycolor("grey").toRgbString(), steps)),
        create_saturation_row('Shading', spectral.palette(mainColorRBG, tinycolor("black").toRgbString(), steps)),
        create_saturation_row('Value', spectral.palette(mainColorRBG, mainColor.complement().toRgbString(), steps)),
        create_saturation_row('Mix', spectral.palette(mainColorRBG, mainColor.greyscale().toRgbString(), 2)),
    ]

    rows.forEach(row => slide_template.content.firstElementChild.appendChild(row))

    
    return slide_template.content;
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

colors.forEach(color => slideElem.appendChild(create_saturation_slide(color)))

window.requestAnimationFrame(() => {
    Reveal.initialize({
    });
    setTimeout(()=>Reveal.layout())
    
});
  