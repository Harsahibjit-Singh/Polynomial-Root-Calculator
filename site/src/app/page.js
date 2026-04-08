"use client";
import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState("1, -3, 2");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const solvePolynomial = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 1. Convert string input to numbers safely to handle errors
      // We use 'val' instead of 'n' to ensure clarity for the compiler
      const coefficients = input
        .split(',')
        .map((val) => val.trim())
        .filter((val) => val !== "")
        .map((val) => parseFloat(val));

      // 2. Client-side validation
      if (coefficients.length === 0 || coefficients.some(isNaN)) {
        throw new Error("Please enter valid numbers separated by commas (e.g., 1, -3, 2).");
      }

      // 3. API Call
      const response = await fetch('https://polynomial-root-calculator.vercel.app/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coefficients }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "The server rejected the calculation.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      // Catch network errors or manual throws
      const message = err.message === "Failed to fetch" 
        ? "Cannot connect to Python API. Is the FastAPI server running on port 8000?" 
        : err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 p-4 md:p-12 font-mono text-slate-900">
      <div className="max-w-2xl mx-auto border-4 border-black bg-white p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Header Section */}
        <header className="border-b-4 border-black mb-8 pb-4">
          <h1 className="text-4xl font-black italic tracking-tighter">POLY_SOLVER v1.0</h1>
          <p className="text-sm font-bold text-slate-500 uppercase mt-2">
            Numerical Analysis Engine / NumPy Powered
          </p>
        </header>

        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block font-bold mb-2 uppercase text-xs tracking-widest">
              Input Coefficients {"($a_n, a_{n-1}, ..., a_0$)"}
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 1, -3, 2"
                className="flex-1 border-4 border-black p-3 font-bold text-lg outline-none focus:bg-yellow-100 transition-colors"
              />
              <button 
                onClick={solvePolynomial}
                disabled={loading}
                className="bg-black text-white px-8 py-3 font-black uppercase hover:bg-slate-800 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
              >
                {loading ? "Crunching..." : "Solve"}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-600 p-3 text-red-600 font-bold text-sm">
              ERROR: {error}
            </div>
          )}
        </div>

        {/* Results Visualizer */}
        {result && (
          <div className="mt-10 border-t-4 border-black pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-stone-50 p-4 border-2 border-black">
                <span className="block text-xs font-bold text-slate-500 uppercase">Degree</span>
                <span className="text-2xl font-black">{result.degree}</span>
              </div>
              <div className="bg-stone-50 p-4 border-2 border-black">
                <span className="block text-xs font-bold text-slate-500 uppercase">Status</span>
                <span className="text-2xl font-black text-green-600">SUCCESS</span>
              </div>
            </div>

            <h3 className="font-bold uppercase text-sm mb-3">Computed Roots:</h3>
            <div className="space-y-2">
              {result.roots.map((root, index) => (
                <div key={`root-${index}`} className="flex items-center gap-4 bg-yellow-50 p-3 border-2 border-black">
                  <span className="font-bold text-slate-400">x_{index + 1} =</span>
                  <span className="text-lg font-bold">
                    {typeof root === 'object' 
                      ? `${root.real} ${root.imag >= 0 ? '+' : '-'} ${Math.abs(root.imag)}i` 
                      : root}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-center mt-12 text-xs font-bold uppercase text-slate-400">
        Standard numerical approach • No degree limit
      </p>
    </main>
  );
}