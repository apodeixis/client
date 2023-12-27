import { pickBy, mapKeys } from "lodash"

const config = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
}

Object.assign(config, _mapEnvCfg(import.meta.env))
Object.assign(config, _mapEnvCfg(document.ENV))

console.log("Env", document.ENV)

function _mapEnvCfg(env) {
  return mapKeys(
    pickBy(env, (v, k) => k.startsWith('VITE_')),
    (v, k) => k.replace(/^VITE_/, '')
  )
}

export default config