module.exports = options => {

  // hash/vars passed with helper
  const hash = Object.assign({

    /**
     * Main component className
     * 
     * @default 'comparison'
     * @type {string}
     */
    className: 'comparison',

    /**
     * Direction of slider
     * 
     * @default 'horizontal'
     * @type {string}
     */
    direction: 'horizontal'

  })

  let className = hash.className
  className += ` ${hash.className}--${hash.direction}`

  return `
    <div class="${className}" data-comparison>
      ${options.fn(this)}
    </div>
  `
}