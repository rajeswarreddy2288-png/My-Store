import HomeHero from "@/components/HomeHero";
import TrustBadges from "@/components/TrustBadges";
import CategoryTiles from "@/components/CategoryTiles";
import TopBrands from "@/components/TopBrands";

export default function HomeSections() {
  return (
    <div className="space-y-10">
      <HomeHero />
      <TrustBadges />
      <CategoryTiles />
      <TopBrands />
    </div>
  );
}
