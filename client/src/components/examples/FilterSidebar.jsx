import { useState } from "react";
import FilterSidebar from "../FilterSidebar";

export default function FilterSidebarExample() {
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  return (
    <div className="p-6">
      <FilterSidebar
        selectedYears={selectedYears}
        selectedSkills={selectedSkills}
        onYearsChange={setSelectedYears}
        onSkillsChange={setSelectedSkills}
        onClearFilters={() => {
          setSelectedYears([]);
          setSelectedSkills([]);
        }}
        availableYears={[2024, 2025, 2026, 2027]}
        availableSkills={["Leadership", "React", "Python", "UI/UX Design", "Machine Learning"]}
      />
    </div>
  );
}
