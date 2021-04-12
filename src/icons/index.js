import SvgIcon from '@/components/SvgIcon'// svg组件

export default function (app) {
  // register globally
  app.component('svg-icon', SvgIcon)

  const requireAll = requireContext => requireContext.keys().map(requireContext)
  const req = require.context('./svg', false, /\.svg$/)
  requireAll(req)
}
