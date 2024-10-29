import Color from "colorjs.io";

export const step_count = 15;

const cadmiumRed = new Color("rgb(255,39,2)")
const cadmiumYellow = new Color("rgb(254, 236, 0)")
const hansaYellow = new Color("rgb(252, 211, 0)")
const cobaltBlue = new Color("rgb(0,33,133)")
const ultramarineBlue = new Color("rgb(25,0,89)")
export const color_config = [
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
  ],
  [
    {display_name: "Green (Light, sRGB)", color: new Color("green"), mix_type: "light"}
  ],
  [
    {display_name: "Violet (Light, sRGB)", color: new Color("violet"), mix_type: "light"}
  ],
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
    {
      display_name: "Yellow-Green (Light, sRGB)",
      color: (new Color("yellow")).mix(new Color("green")),
      mix_type: "light"
    }
  ],
  [
    {
      display_name: "Yellow-Orange (Light, sRGB)",
      color: (new Color("yellow")).mix(new Color("orange")),
      mix_type: "light"
    }
  ],
]

export const randomColorConfig = color_config[Math.floor(Math.random() * color_config.length)];
export const  randomColor = randomColorConfig[Math.floor(Math.random() * randomColorConfig.length)].color
