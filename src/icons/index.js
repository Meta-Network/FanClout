import svgIcon from '@/components/svgIcon'// svg组件

export default function (app) {
  // register globally
  app.component('SvgIcon', svgIcon)

  const requireAll = requireContext => requireContext.keys().map(requireContext)
  const req = require.context('./svg', false, /\.svg$/)
  requireAll(req)
}
