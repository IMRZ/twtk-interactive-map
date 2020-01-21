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
