type ENV = 'development' | 'production' | 'test'
const NODE_ENV: ENV = process.env.NODE_ENV

interface Config {
  API_URL: string
  KEY: {
    ENCRYPT_SECRET: string
  }
}

interface ConfigByEnv {
  development: Config
  production: Config
  test: Config
}

const serverUrl = 'https://hama.network'
// const serverUrl = 'http://localhost:8080'

// TODO: 실서버 배포시, key변경해야함
const configEnv: ConfigByEnv = {
  development: {
    API_URL: serverUrl + '/api',
    KEY: {
      ENCRYPT_SECRET: '8DA03642F53C0D631F1E6884F8C9BA60',
    },
  },
  production: {
    API_URL: serverUrl + '/api',
    KEY: {
      ENCRYPT_SECRET: '8DA03642F53C0D631F1E6884F8C9BA60',
    },
  },
  /* eslint-disable */
  test: {} as any,
}

export const config = configEnv[NODE_ENV]
