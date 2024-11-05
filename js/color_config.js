import Color from "colorjs.io";
import {mixPaint} from "./color_utils";

export const step_count = 15;

const red = () => new Color("rgb(255,0,0)")
const cadmiumRed = () => new Color("rgb(255,39,2)")
const quinacridoneRed = () => new Color("rgb(210,44,60)")

const yellow = ()=>  new Color("rgb(255,255,0)")
const cadmiumYellow = () => new Color("rgb(254, 236, 0)")
const hansaYellow = () => new Color("rgb(252, 211, 0)")

const blue = () => new Color("rgb(0,0,255)")
const cobaltBlue = () => new Color("rgb(1,30,156)")
const ultramarineBlue = () => new Color("rgb(25,0,89)")


export const color_config = [
  [
    {display_name: "Red (Light, sRGB)", color: red(), mix_type: "light"},
    {display_name: "Red (Paint, Mineral)", subtitle: "Cadmium Red", color: cadmiumRed(), mix_type: "paint"},
    {display_name: "Red (Paint, Organic)", subtitle: "Quinacridone Red", color: quinacridoneRed(), mix_type: "paint"}
  ],
  [
    {display_name: "Yellow (Light, sRGB)", color: yellow(), mix_type: "light"},
    {display_name: "Yellow (Paint, Mineral)", subtitle: 'Cadmium Yellow', color: cadmiumYellow(), mix_type: "paint"},
    {display_name: "Yellow (Paint, Organic)", subtitle: 'Hansa Yellow', color: hansaYellow(), mix_type: "paint"}
  ],
  [
    {display_name: "Blue (Light, sRGB)", color: blue(), mix_type: "light"},
    {display_name: "Blue (Paint, Mineral)", subtitle: 'Cobalt Blue', color: cobaltBlue(), mix_type: "paint"},
    {display_name: "Blue (Paint, Organic)", subtitle: 'Ultramarine Blue', color: ultramarineBlue(), mix_type: "paint"}
  ],
  [
    {display_name: "Orange (Light, sRGB)", color: new Color("orange"), mix_type: "light"},
    {
      display_name: "Orange (Paint, Mineral)",
      subtitle: "Mixed Cadmium Red & Cadmium Yellow",
      color: mixPaint(cadmiumRed(), cadmiumYellow()),
      mix_type: "paint"
    },
    {
      display_name: "Orange (Paint, Organic)",
      subtitle: "Mixed Quinacridone Red & Hansa Yellow",
      color: mixPaint(quinacridoneRed(), hansaYellow()),
      mix_type: "paint"
    }
  ],
  [
    {display_name: "Green (Light, sRGB)", color: new Color("green"), mix_type: "light"},
    {
      display_name: "Green (Paint, Mineral)",
      subtitle: "Cobalt Blue & Cadmium Yellow",
      color: mixPaint(cobaltBlue(), cadmiumYellow()),
      mix_type: "paint"
    },
    {
      display_name: "Green (Paint, Organic)",
      subtitle: "Ultramarine Blue & Hansa Yellow",
      color: mixPaint(ultramarineBlue(), hansaYellow()),
      mix_type: "paint"
    }
  ],
  [
    {display_name: "Violet (Light, sRGB)", color: new Color("violet"), mix_type: "light"},
    {
      display_name: "Violet (Paint, Mineral)",
      subtitle: "Cobalt Blue & Cadmium Red",
      color: mixPaint(cobaltBlue(), cadmiumRed()),
      mix_type: "paint"
    },
    {
      display_name: "Violet (Paint, Organic)",
      subtitle: "Ultramarine Blue & Quinacridone Red",
      color: mixPaint(ultramarineBlue(), quinacridoneRed()),
      mix_type: "paint"
    }
  ],
  [
    {display_name: "Red-Orange (Light, sRGB)", color: (new Color("red")).mix(new Color("orange")), mix_type: "light"},
    {
      display_name: "Red-Orange (Paint, Mineral)",
      subtitle: "Mixed Cadmium Red & Cadmium Yellow",
      color: mixPaint(cadmiumRed(), cadmiumYellow(), 0.25),
      mix_type: "paint"
    },
    {
      display_name: "Red-Orange (Paint, Organic)",
      subtitle: "Mixed Quinacridone Red & Hansa Yellow",
      color: mixPaint(quinacridoneRed(), hansaYellow(), 0.25),
      mix_type: "paint"
    }
  ],
  [
    {display_name: "Red-Violet (Light, sRGB)", color: (new Color("red")).mix(new Color("violet")), mix_type: "light"},
    {
      display_name: "Red-Violet (Paint, Mineral)",
      subtitle: "Cobalt Blue & Cadmium Red",
      color: mixPaint(cobaltBlue(), cadmiumRed(), 0.25),
      mix_type: "paint"
    },
    {
      display_name: "Red-Violet (Paint, Organic)",
      subtitle: "Ultramarine Blue & Quinacridone Red",
      color: mixPaint(ultramarineBlue(), quinacridoneRed(), 0.25),
      mix_type: "paint"
    }
  ],
  [
    {display_name: "Blue-Violet (Light, sRGB)", color: (new Color("blue")).mix(new Color("violet")), mix_type: "light"},
    {
      display_name: "Blue-Violet (Paint, Mineral)",
      subtitle: "Cobalt Blue & Cadmium Red",
      color: mixPaint(cobaltBlue(), cadmiumRed(), 0.25),
      mix_type: "paint"
    },
    {
      display_name: "Blue-Violet (Paint, Organic)",
      subtitle: "Ultramarine Blue & Quinacridone Red",
      color: mixPaint(ultramarineBlue(), quinacridoneRed(), 0.25),
      mix_type: "paint"
    }
  ],
  [
    {display_name: "Blue-Green (Light, sRGB)", color: (new Color("blue")).mix(new Color("green")), mix_type: "light"},
    {
      display_name: "Blue-Green (Paint, Mineral)",
      subtitle: "Cobalt Blue & Cadmium Yellow",
      color: mixPaint(cobaltBlue(), cadmiumYellow(), 0.25),
      mix_type: "paint"
    },
    {
      display_name: "Blue-Green (Paint, Organic)",
      subtitle: "Ultramarine Blue & Hansa Yellow",
      color: mixPaint(ultramarineBlue(), hansaYellow(), 0.25),
      mix_type: "paint"
    }
  ],
  [
    {
      display_name: "Yellow-Green (Light, sRGB)",
      color: (new Color("yellow")).mix(new Color("green")),
      mix_type: "light"
    },
    {
      display_name: "Yellow-Green (Paint, Mineral)",
      subtitle: "Cobalt Blue & Cadmium Yellow",
      color: mixPaint(cobaltBlue(), cadmiumYellow(), 0.75),
      mix_type: "paint"
    },
    {
      display_name: "Yellow-Green (Paint, Organic)",
      subtitle: "Ultramarine Blue & Hansa Yellow",
      color: mixPaint(ultramarineBlue(), hansaYellow(), 0.75),
      mix_type: "paint"
    }
  ],
  [
    {
      display_name: "Yellow-Orange (Light, sRGB)",
      color: (new Color("yellow")).mix(new Color("orange")),
      mix_type: "light"
    },
    {
      display_name: "Yellow-Orange (Paint, Mineral)",
      subtitle: "Mixed Cadmium Red & Cadmium Yellow",
      color: mixPaint(cadmiumRed(), cadmiumYellow(), 0.75),
      mix_type: "paint"
    },
    {
      display_name: "Yellow-Orange (Paint, Organic)",
      subtitle: "Mixed Quinacridone Red & Hansa Yellow",
      color: mixPaint(quinacridoneRed(), hansaYellow(), 0.75),
      mix_type: "paint"
    }
  ],
]


