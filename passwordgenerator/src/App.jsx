import { useState, useCallback, useEffect } from 'react';
import './index.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(true);
  const [spaceAllowed, setSpaceAllowed] = useState(false);
  const [speciaCharAllowed, setSpeciaCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numAllowed) str += '0123456789';
    if (spaceAllowed) str += ' ';
    if (speciaCharAllowed) str += '!@#$%^&*()_+';

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
    setCopied(false);
  }, [length, numAllowed, spaceAllowed, speciaCharAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // hide after 3s
  };

  return (
    <div className="w-screen h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      
      {/* Toast message */}
      {copied && (
        <div className="fixed top-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
          ✅ Password Copied!
        </div>
      )}

      <h1 className="text-4xl font-bold text-red-500 mb-6">Password Generator</h1>

      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
        <div
          className={`flex justify-between items-center p-3 rounded transition-all duration-300 ${
            copied ? 'bg-green-700' : 'bg-gray-700'
          }`}
        >
          <input
            type="text"
            value={password}
            readOnly
            className="w-full bg-transparent outline-none text-lg text-white"
          />
          <button
            onClick={copyToClipboard}
            className="ml-3 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label>Length: {length}</label>
            <input
              type="range"
              min={4}
              max={30}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-1/2"
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Include Numbers</label>
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Include Spaces</label>
            <input
              type="checkbox"
              checked={spaceAllowed}
              onChange={() => setSpaceAllowed((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Include Special Characters</label>
            <input
              type="checkbox"
              checked={speciaCharAllowed}
              onChange={() => setSpeciaCharAllowed((prev) => !prev)}
            />
          </div>

          <button
            onClick={passwordGenerator}
            className="mt-4 bg-red-600 hover:bg-red-700 transition-colors py-2 px-4 rounded text-white font-semibold"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
