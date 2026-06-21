import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/**
 * Slow-drifting blurred color blobs behind the hero. Pure CSS animation
 * keeps it cheap; reduced-motion users get a static composition.
 */
export default function GradientMesh() {
  const reduce = usePrefersReducedMotion()
  return (
    <div className="gradient-mesh" aria-hidden="true" data-reduce={reduce ? 'true' : 'false'}>
      <div className="gradient-mesh__blob gradient-mesh__blob--amber" />
      <div className="gradient-mesh__blob gradient-mesh__blob--violet" />
      <div className="gradient-mesh__blob gradient-mesh__blob--cyan" />
      <div className="gradient-mesh__blob gradient-mesh__blob--rose" />
      <div className="gradient-mesh__grain" />
    </div>
  )
}
