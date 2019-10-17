/**
 * @author UMU618 <umu618@hotmail.com>
 * @copyright MEET.ONE 2019
 * @description Use block-always-using-brace npm-coding-style.
 */

'use strict'

module.exports = {
  isValidEosName: (name) => {
    if (typeof name !== 'string') {
      //console.error('name parameter is a required string')
      return false
    }
    if (name.length > 12) {
      //console.error('A name can be up to 12 characters long')
      return false
    }
    const charmap = '.12345abcdefghijklmnopqrstuvwxyz'
    for (let i = 0; i < name.length; ++i) {
      const idx = charmap.indexOf(name[i])
      if (idx === -1) {
        //console.error('Invalid character:' + name[i])
        return false
      }
    }
    return true
  }
}
