
import React, { useState, useEffect, useCallback } from 'react';
import { Review } from '../types';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialCarouselProps {
  reviews: Review[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, reviews.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, reviews.length]);

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Голоса наших <span className="text-indigo-600">клиентов</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Узнайте, почему ведущие компании доверяют свой контент TextFlow.</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Background Decoration */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-50 rounded-full -z-10 opacity-50 blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-50 rounded-full -z-10 opacity-50 blur-2xl"></div>

          <div className="relative bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm overflow-hidden min-h-[400px] flex items-center">
            <Quote className="absolute top-10 left-10 w-20 h-20 text-indigo-100 -z-0" />
            
            <div className={`relative z-10 w-full transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 scale-95 translate-x-4' : 'opacity-100 scale-100 translate-x-0'}`}>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="shrink-0">
                  <div className="relative">
                    <img 
                      src={reviews[currentIndex].avatar} 
                      alt={reviews[currentIndex].author} 
                      loading="lazy"
                      className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] object-cover border-8 border-white shadow-xl"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white p-3 rounded-2xl shadow-lg">
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < reviews[currentIndex].rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} 
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-3xl font-medium text-slate-800 mb-8 leading-tight italic">
                    "{reviews[currentIndex].text}"
                  </blockquote>
                  
                  <div>
                    <div className="text-2xl font-black text-slate-900">{reviews[currentIndex].author}</div>
                    <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1">
                      {reviews[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 right-8 flex gap-3">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 hover:shadow-lg transition-all active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 hover:shadow-lg transition-all active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
