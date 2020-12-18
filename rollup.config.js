import dts from 'rollup-plugin-dts';

export default [{
        input: 'dist/index.js',
        output: {
            file: 'lib/index.js'
        },
    }, {
        input: 'dist/index.d.ts',
        output: {
            file: 'lib/index.d.ts'
        },
        plugins: [dts()]
    }
]
