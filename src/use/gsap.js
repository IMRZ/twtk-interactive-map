import gsap from "gsap";

function animateOpacity(target) {
  return () => gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration: 0.5 });
}

export function useGsap() {
  return {
    gsap,
    animateOpacity
  };
}

export function fadeIn(target, duration = 1) {
  gsap.fromTo(target, { opacity: 0 }, { opacity: 1, duration });
}
