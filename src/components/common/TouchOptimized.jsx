import React, { useState, useRef, useEffect } from 'react';

/**
 * TouchOptimized wrapper component for better mobile interactions
 * Provides touch feedback, swipe gestures, and improved accessibility
 */
const TouchOptimized = ({ 
  children, 
  onClick, 
  onSwipeLeft, 
  onSwipeRight, 
  className = '',
  disabled = false,
  hapticFeedback = false 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const elementRef = useRef(null);

  // Minimum distance for swipe detection
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    if (disabled) return;
    
    setIsPressed(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    
    // Haptic feedback on touch start
    if (hapticFeedback && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleTouchMove = (e) => {
    if (disabled) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (disabled) return;
    
    setIsPressed(false);
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    } else if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    } else if (Math.abs(distance) < minSwipeDistance && onClick) {
      // Regular tap
      onClick();
    }
  };

  const handleMouseDown = () => {
    if (disabled) return;
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (disabled) return;
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) onClick(e);
    }
  };

  return (
    <div
      ref={elementRef}
      className={`
        ${className}
        ${isPressed ? 'transform scale-95 bg-opacity-80' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-150 ease-in-out
        select-none
        touch-manipulation
      `}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
};

/**
 * SwipeableCard component for card-based interfaces
 */
export const SwipeableCard = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  className = '',
  leftAction,
  rightAction 
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    setSwipeOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    const threshold = 100;
    
    if (swipeOffset > threshold && onSwipeRight) {
      onSwipeRight();
    } else if (swipeOffset < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }
    
    setSwipeOffset(0);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Action indicators */}
      {leftAction && (
        <div className={`absolute left-0 top-0 bottom-0 flex items-center justify-start pl-4 bg-green-500 text-white transition-opacity ${
          swipeOffset > 50 ? 'opacity-100' : 'opacity-0'
        }`}>
          {leftAction}
        </div>
      )}
      
      {rightAction && (
        <div className={`absolute right-0 top-0 bottom-0 flex items-center justify-end pr-4 bg-red-500 text-white transition-opacity ${
          swipeOffset < -50 ? 'opacity-100' : 'opacity-0'
        }`}>
          {rightAction}
        </div>
      )}
      
      {/* Main content */}
      <div
        className={`${className} transition-transform duration-200 ease-out`}
        style={{
          transform: `translateX(${swipeOffset}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * PullToRefresh component
 */
export const PullToRefresh = ({ onRefresh, children, threshold = 80 }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (window.scrollY > 0) return;
    
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    
    if (diff > 0) {
      setPullDistance(Math.min(diff, threshold * 1.5));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setPullDistance(0);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div 
        className="flex items-center justify-center transition-all duration-200"
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance / threshold,
        }}
      >
        {isRefreshing ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
        ) : (
          <div className="text-gray-500 text-sm">
            {pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
          </div>
        )}
      </div>
      
      {children}
    </div>
  );
};

export default TouchOptimized;
