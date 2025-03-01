import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Cargando...</h1>
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 animate-spin"></div>
      </div>
    </div>
  );
}