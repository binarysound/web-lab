declare module 'express-history-api-fallback' {
  import { Handler } from 'express'
  function fallback(indexPath: string, options: { root: string }): Handler
  export default fallback
}
