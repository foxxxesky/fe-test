import { useDeferredValue } from 'react';
import './SearchBox.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  const deferred = useDeferredValue(value);
  void deferred;

  return (
    <input
      className="search-box"
      type="text"
      placeholder="搜尋商品..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
