// Returns props that mark an element for scroll-triggered fade-in.
// The IntersectionObserver in Home.jsx adds `.is-visible` once it enters
// the viewport. CSS in index.css handles the actual transition.
export function fadeIn({ direction = "up", distance = 40, duration = 0.6 } = {}) {
  return {
    "data-fade": "true",
    "data-direction": direction,
    "data-distance": distance,
    "data-duration": duration,
  };
}
