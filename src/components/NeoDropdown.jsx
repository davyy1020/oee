import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const NeoDropdown = ({ options, value, onChange, width = '220px' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="neo-dropdown" ref={dropdownRef} style={{ width }}>
      <button 
        className="neo-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{selectedOption?.label || 'Select...'}</span>
        <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }} />
      </button>

      {isOpen && (
        <div className="neo-dropdown-menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`neo-dropdown-item ${opt.value === value ? 'active' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.value === value && <span className="neo-dropdown-check">●</span>}
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NeoDropdown;
