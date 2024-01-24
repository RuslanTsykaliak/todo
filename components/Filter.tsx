// components/Filter.tsx

import { useState, useEffect } from "react";

interface FilterProps {
  onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  useEffect(() => {
    onFilterChange(selectedFilter);
  }, [selectedFilter, onFilterChange]);

  return (
    <div className="mb-4">
      <label className="mr-2">Filter:</label>
      <select
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="all">None</option>
        <option value="done">Done</option>
        <option value="undone">Undone</option>
        <option value="priority-high">Priority High</option>
        <option value="priority-low">Priority Low</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default Filter;
