
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  srcDir: 'src/',
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/PAYWPro.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~plugins/vue-infinite-scroll'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    filenames: {
      app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js'
    },
    extend(config) {
      const svgRule = config.module.rules.find(rule =>
        rule.test.test('.svg')
      );
    
      svgRule.test = /\.(png|jpe?g|gif|webp)$/;
    
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        oneOf:[
          {
          loader: 'file-loader',
          query: {
              name: 'assets/[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'url-loader',
            query: {
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        ]
      })
    }
  }
}
