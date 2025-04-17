import React from 'react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-accent/30"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-accent animate-spin"></div>
        </div>
        <h2 className="mt-6 text-2xl font-playfair">Loading</h2>
        <p className="mt-2 text-muted-foreground">Please wait while we prepare your experience...</p>
      </div>
    </div>
  );
};

export default LoadingFallback; 