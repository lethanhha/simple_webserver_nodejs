module.exports = (template, pokemon) => {
  let output = template.replace(/{%POKEMON_ID%}/g, pokemon.id)
  output = output.replace(/{%POKEMON_NAME%}/g, pokemon.name)
  output = output.replace(/{%IMAGE_LINK%}/g, pokemon.img_link)
  output = output.replace(/{%POKEMON_TYPE1%}/g, pokemon.type[0])
  // A pokemon may have more than 1 type
  if (pokemon.type[1] === undefined) {
    output = output.replace(/{%POKEMON_TYPE2%}/g, '')
  } else {
    output = output.replace(/{%POKEMON_TYPE2%}/g, ` - ${pokemon.type[1]}`)
  }
  return output
}
