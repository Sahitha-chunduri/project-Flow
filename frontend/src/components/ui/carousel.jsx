import React, { useState, useEffect, useCallback, useContext, createContext, forwardRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ----- CSS (Inline in same file using a <style> tag below the component) -----

const CarouselContext = createContext(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = forwardRef(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  }, [scrollPrev, scrollNext]);

  useEffect(() => {
    if (api && setApi) {
      setApi(api);
    }
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={`carousel-root ${className || ""}`}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});

const CarouselContent = forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="carousel-viewport">
      <div
        ref={ref}
        className={`carousel-container ${orientation === "horizontal" ? "horizontal" : "vertical"} ${className || ""}`}
        {...props}
      />
    </div>
  );
});

const CarouselItem = forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={`carousel-item ${orientation} ${className || ""}`}
      {...props}
    />
  );
});

const CarouselPrevious = forwardRef(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      ref={ref}
      className={`carousel-button prev ${orientation} ${className || ""}`}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      {...props}
    >
      <ArrowLeft className="icon" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
});

const CarouselNext = forwardRef(({ className, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      ref={ref}
      className={`carousel-button next ${orientation} ${className || ""}`}
      onClick={scrollNext}
      disabled={!canScrollNext}
      {...props}
    >
      <ArrowRight className="icon" />
      <span className="sr-only">Next slide</span>
    </button>
  );
});

// ----- Usage Example -----

export default function App() {
  return (
    <div>
      <h1>Simple Carousel</h1>
      <Carousel>
        <CarouselContent>
          <CarouselItem><div className="slide">Slide 1</div></CarouselItem>
          <CarouselItem><div className="slide">Slide 2</div></CarouselItem>
          <CarouselItem><div className="slide">Slide 3</div></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <style>{`
        .carousel-root {
          position: relative;
          max-width: 600px;
          margin: 2rem auto;
          border: 1px solid #ccc;
          overflow: hidden;
          outline: none;
        }

        .carousel-viewport {
          overflow: hidden;
        }

        .carousel-container.horizontal {
          display: flex;
          margin-left: -1rem;
        }

        .carousel-item.horizontal {
          flex: 0 0 100%;
          min-width: 0;
          padding-left: 1rem;
        }

        .slide {
          height: 200px;
          background-color: #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .carousel-button {
          position: absolute;
          height: 2rem;
          width: 2rem;
          border-radius: 9999px;
          border: 1px solid #ccc;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .carousel-button.horizontal.prev {
          left: -2.5rem;
          top: 50%;
          transform: translateY(-50%);
        }

        .carousel-button.horizontal.next {
          right: -2.5rem;
          top: 50%;
          transform: translateY(-50%);
        }

        .carousel-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .icon {
          width: 1rem;
          height: 1rem;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </div>
  );
}
