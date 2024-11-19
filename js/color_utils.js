import Color from "colorjs.io";
import spectral from "spectral.js";
import {Iris} from "@scidian/iris";

export function color_to_rgba(color) {
  return new Color(color).to('sRGB').toString({
    precision: 0,
    format: {
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

export function mixPaint(c1, c2, ratio) {
  return new Color(spectral.mix(color_to_rgba(c1), color_to_rgba(c2), ratio || 0.5, spectral.RGBA))
}

export function get_color_sequence(start, end, steps, mix_type) {
  if (mix_type === "paint") {
    return spectral.palette(color_to_rgba(start), color_to_rgba(end), steps, spectral.RGBA).map(c => new Color(c))
  } else if (mix_type === "light") {
    return start.steps(end, {steps: steps})
  } else {
    throw new Error('Unknown mix type: ' + mix_type);
  }
}

export function get_complementary_color(color, mix_type) {
  if (mix_type === "paint") {
    let i = new Iris(color_to_rgba(color))
    let compl_iris = i.rybComplementary()
    return new Color(compl_iris.cssString())
  } else {
    // https://github.com/color-js/color.js/issues/140
    let complement = (new Color(color)).to('lch')
    complement.lch.hue += 180
    return complement
  }
}

export function get_greyscale_color(color) {
  return new Color(color).to('lab').set({a: 0, b: 0}).to('sRGB');
}

export function get_transparent_color(color) {
  let matchTransparent = new Color(color)
  matchTransparent.alpha = 0
  return matchTransparent
}

