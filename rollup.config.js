import dts from 'rollup-plugin-dts';

export default [{
        input: 'dist/index.js',
        output: {
            dir: 'lib'
        }
    }, {
        input: 'dist/index.d.ts',
        output: {
            file: 'lib/index.d.ts'
        },
        plugins: [dts()]
    }
]
