const ranges = [
    ['1F600', '1F64F'], 
    ['1F680', '1F6AB'],
    ['1f310', '1f320'],
    ['1f32d', '1f393'],
    ['1f3a0', '1f3cc'],
    ['1f400', '1f43e'],
    ['1f442', '1f4fc'],
]

const emoji = {
    methods: {
        randomEmoji () {
            const group = parseInt(Math.random() * ranges.length)
            const range = ranges[group].map(x => {
                return parseInt(x, 16)
            })
            const emoji = parseInt(Math.random() * (range[1] - range[0])) + range[0]
            return `&#x${emoji.toString(16)}`  
        }
    }
}

export default emoji
