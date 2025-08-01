"use client"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function Filter({
  allCategoriesData, // Now receives the full categories data
  brands,
  selectedCategory,
  selectedSubcategory, // New prop
  priceRange,
  onCategoryChange,
  onSubcategoryChange, // New prop
  onBrandChange,
  onPriceRangeChange,
  onApplyFilters,
  onResetFilters,
}) {
  const [currentPriceRange, setCurrentPriceRange] = useState(priceRange)
  const [selectedBrand, setSelectedBrand] = useState("") // Declare selectedBrand variable

  // Find the currently selected main category object to get its subcategories
  const safeSelectedCategory = typeof selectedCategory === "string" ? selectedCategory : ""
  const currentMainCategory = allCategoriesData.find(
    (cat) =>
      typeof cat.id === "string" &&
      typeof safeSelectedCategory === "string" &&
      cat.id.toLowerCase() === safeSelectedCategory.toLowerCase()
  )

  const subcategoriesForSelectedCategory = currentMainCategory ? currentMainCategory.subcategories : []

  // Reset subcategory when main category changes
  useEffect(() => {
    onSubcategoryChange("All")
  }, [selectedCategory, onSubcategoryChange])

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>

      <Accordion type="multiple" defaultValue={["category", "brand", "price"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="text-lg font-semibold">Category</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 py-2">
              {allCategoriesData.map((category) => (
                <Button
                  key={category.id || category.name}
                  variant={
                    typeof selectedCategory === "string" &&
                    typeof category.id === "string" &&
                    selectedCategory.toLowerCase() === category.id.toLowerCase()
                      ? "default"
                      : "outline"
                  }
                  onClick={() => onCategoryChange(category.id)}
                  className="capitalize"
                >
                  {category.name}
                </Button>
              ))}
            </div>
            {selectedCategory !== "all" && subcategoriesForSelectedCategory.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h3 className="text-md font-semibold mb-2">Subcategories:</h3>
                <div className="flex flex-wrap gap-2 py-2">
                  <Button
                    variant={selectedSubcategory === "All" ? "default" : "outline"}
                    onClick={() => onSubcategoryChange("All")}
                    className="capitalize"
                    key="all-subcategory"
                  >
                    All {currentMainCategory?.name}
                  </Button>
                  {subcategoriesForSelectedCategory.map((sub) => (
                    <Button
                      key={sub}
                      variant={selectedSubcategory === sub ? "default" : "outline"}
                      onClick={() => onSubcategoryChange(sub)}
                      className="capitalize"
                    >
                      {sub}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-lg font-semibold">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 py-2">
              {brands.map((brand) => (
                <Button
                  key={brand}
                  variant={selectedBrand === brand ? "default" : "outline"}
                  onClick={() => {
                    setSelectedBrand(brand)
                    onBrandChange(brand)
                  }}
                >
                  {brand}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-semibold">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <Slider
                min={0}
                max={500}
                step={10}
                value={[currentPriceRange]}
                onValueChange={(value) => setCurrentPriceRange(value[0])}
                onValueCommit={(value) => onPriceRangeChange(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$0</span>
                <span>${currentPriceRange}</span>
                <span>$500</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-3">
        <Button onClick={onApplyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={onResetFilters} className="w-full bg-transparent">
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
