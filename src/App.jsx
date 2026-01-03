import "./App.css";
import Home from "./pages/Home";
import { useEffect } from "react";
//import { useFadeInScroll } from "./animations/useFadeInScroll";

function App() {
  // useFadeInScroll();
  useEffect(() => {
    const elements = document.querySelectorAll("[data-fade='true']");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // enter viewport → fade in
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translate(0, 0)";
          } else {
            // leave viewport → reset to hidden
            const distance = entry.target.dataset.distance || "40px";
            const direction = entry.target.dataset.direction || "up";

            const axis =
              direction === "left" || direction === "right" ? "X" : "Y";
            const sign = direction === "up" || direction === "left" ? 1 : -1;

            entry.target.style.opacity = "0";
            entry.target.style.transform = `translate${axis}(${
              sign * parseInt(distance)
            }px)`;
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
