import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterSidebar({
  selectedYears,
  selectedSkills,
  onYearsChange,
  onSkillsChange,
  onClearFilters,
  availableYears,
  availableSkills,
}) {
  const [expandedSections, setExpandedSections] = useState({
    year: true,
    skills: true,
  });

  const toggleYear = (year) => {
    if (selectedYears.includes(year)) {
      onYearsChange(selectedYears.filter((y) => y !== year));
    } else {
      onYearsChange([...selectedYears, year]);
    }
  };

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  const activeFilterCount = selectedYears.length + selectedSkills.length;

  return (
    <Card className="p-6 space-y-6 sticky top-6" data-testid="card-filter-sidebar">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Filters</h2>
          {activeFilterCount > 0 && (
            <Badge variant="default" className="text-xs" data-testid="badge-filter-count">
              {activeFilterCount}
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <button
            className="flex items-center justify-between w-full"
            onClick={() =>
              setExpandedSections((prev) => ({ ...prev, year: !prev.year }))
            }
            data-testid="button-toggle-year-filter"
          >
            <Label className="text-base font-semibold cursor-pointer">
              Graduation Year
            </Label>
          </button>
          {expandedSections.year && (
            <div className="space-y-2 pl-1">
              {availableYears.map((year) => (
                <div
                  key={year}
                  className="flex items-center space-x-2"
                  data-testid={`filter-year-${year}`}
                >
                  <Checkbox
                    id={`year-${year}`}
                    checked={selectedYears.includes(year)}
                    onCheckedChange={() => toggleYear(year)}
                    data-testid={`checkbox-year-${year}`}
                  />
                  <label
                    htmlFor={`year-${year}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {year}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            className="flex items-center justify-between w-full"
            onClick={() =>
              setExpandedSections((prev) => ({ ...prev, skills: !prev.skills }))
            }
            data-testid="button-toggle-skills-filter"
          >
            <Label className="text-base font-semibold cursor-pointer">Skills</Label>
          </button>
          {expandedSections.skills && (
            <div className="space-y-2 pl-1 max-h-80 overflow-y-auto">
              {availableSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center space-x-2"
                  data-testid={`filter-skill-${skill}`}
                >
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={() => toggleSkill(skill)}
                    data-testid={`checkbox-skill-${skill}`}
                  />
                  <label
                    htmlFor={`skill-${skill}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {skill}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={onClearFilters}
          data-testid="button-clear-filters"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </Card>
  );
}
