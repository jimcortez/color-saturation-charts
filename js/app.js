import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/white.css'
import Color from "colorjs.io"
import namer from 'color-namer'
import {color_config, step_count} from "./color_config";
import JSColor from '@eastdesire/jscolor'
import {
  get_color_sequence,
  get_complementary_color,
  get_greyscale_color,
  color_to_rgba,
  get_transparent_color
} from "./color_utils";

function create_saturation_row(title, values) {
  const template = document.createElement('template');
  template.innerHTML = `
        <div class="r-hstack justify-center" data-id="colorboxes">
            <div style="width: 320px;" data-id="colortitle">${title}</div>
        </div>
    `
  let row_template = template.cloneNode(true)

  if (values.length < step_count) {
    values.push(...new Array(step_count - values.length))
  }

  values.forEach((value, i) => {
    const box_template = document.createElement('template');

    let bgcolor = "rgba(0,0,0,0)";
    if (value) bgcolor = value.display();

    box_template.innerHTML = `
            <div data-id="box${i + 1}" style="background-color: ${bgcolor}; width: 50px; height: 50px;"></div>
        `
    row_template.content.firstElementChild.appendChild(box_template.cloneNode(true).content)
  })

  return row_template.content;
}

function _create_section_node(title, subtitle, picker) {
  const template = document.createElement('template');
  template.innerHTML = `
        <section data-auto-animate>
            <h4 class="slide-title" data-id="title">${title}</h4>
            <p class="slide-subtitle" data-id="subtitle">${subtitle}</p>
            <div class="color_rows"></div>
            ${picker || ""}
        </section>`
  return template
}

function create_custom_saturation_slide(colorConfig) {
  const configColor = colorConfig.color

  const slide_template = _create_section_node(`Saturation Chart`, colorConfig.subtitle || "", `<input id="custom_color_picker" data-id="picker" data-jscolor="{}" value="${color_to_rgba(configColor)}" />`)
  const picker = new JSColor(slide_template.content.firstElementChild.querySelector('#custom_color_picker'), {
    preset: "dark large thick",
    format: 'rgba'
  })

  let slide_template_node = Array.prototype.slice.call(slide_template.content.childNodes)[0].nextElementSibling;
  let mainColor = configColor;
  let colorSet = false;

  picker.onChange = () => {
    if (colorSet) {
      mainColor = new Color(picker.toRGBAString())
    }

    colorSet = true

    let name = colorConfig.display_name
    let subtitle = colorConfig.subtitle || ""

    if (color_to_rgba(configColor) !== color_to_rgba(mainColor)) {
      name = namer(mainColor.toString({format: "hex"})).basic[0].name;
      subtitle = `Light ${name}`
    }

    slide_template_node.querySelector('.slide-title').innerHTML = `${name}`
    slide_template_node.querySelector('.slide-subtitle').innerHTML = `${subtitle}`
    slide_template_node.querySelector('.color_rows').innerHTML = '';

    ([
      create_saturation_row('Dilution',
        get_color_sequence(mainColor, get_transparent_color(mainColor), step_count, colorConfig["mix_type"])),
      create_saturation_row('Tinting',
        get_color_sequence(mainColor, new Color("white"), step_count, colorConfig["mix_type"])),
      create_saturation_row('Toning',
        get_color_sequence(mainColor, new Color("grey"), step_count, colorConfig["mix_type"])),
      create_saturation_row('Shading',
        get_color_sequence(mainColor, new Color("black"), step_count, colorConfig["mix_type"])),
      create_saturation_row('Complementary',
        get_color_sequence(mainColor, get_complementary_color(mainColor, colorConfig["mix_type"]), step_count, colorConfig["mix_type"])),
      create_saturation_row('Grayscale',
        get_color_sequence(mainColor, get_greyscale_color(mainColor), 2, colorConfig["mix_type"])),
    ]).forEach(row => {
      slide_template_node.querySelector('.color_rows').appendChild(row)
    })
  }

  picker.onChange()

  return slide_template.content
}

function getRandomBackgroundGradient() {
  const randomColorConfig = color_config[Math.floor(Math.random() * color_config.length)];
  const randomColor = randomColorConfig[Math.floor(Math.random() * randomColorConfig.length)].color
  return `radial-gradient(farthest-corner at 40px 40px, #fff, ${randomColor.display()},${get_complementary_color(randomColor).display()}, ${get_greyscale_color(randomColor).display()})`
}

function setMainBG(sync) {
  let titleSlideElem = document.getElementById('title-slide')
  titleSlideElem.setAttribute('data-background-gradient', getRandomBackgroundGradient())

  if (sync !== false) Reveal.sync();
}

let slideElem = document.getElementById('slides')

color_config.forEach(subColors => {
  const sectionElem = document.createElement('section');

  subColors.forEach((config => sectionElem.appendChild(create_custom_saturation_slide(config))))

  slideElem.appendChild(sectionElem)
})

setMainBG(false)
setInterval(setMainBG, 5000)

Reveal.initialize({
  navigationMode: 'grid'
});


