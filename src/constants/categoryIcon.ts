import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Monitor,
  Camera,
  Headphones,
  Gamepad2,
  Speaker,
  Printer,
  Package2,
  Plug,
  Home,
  Dumbbell,
  BookOpen,
  Shirt,
  ToyBrick,
  Car,
  Hammer,
  Footprints,
  Trees,
  PawPrint,
  Sparkles,
  Gem,
  Apple,
  PenLine,
  Luggage,
  Baby,
  Palette,
  Music,
  Cpu,
  Armchair,
} from "lucide-react";

export const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();

  if (name.includes("phone") || name.includes("mobile") || name.includes("smartphone")) return Smartphone;
  if (name.includes("laptop") || name.includes("computer") || name.includes("macbook")) return Laptop;
  if (name.includes("tablet") || name.includes("ipad")) return Tablet;
  if (name.includes("watch") || name.includes("smartwatch")) return Watch;
  if (name.includes("tv") || name.includes("television") || name.includes("monitor")) return Monitor;
  if (name.includes("camera") || name.includes("photo")) return Camera;
  if (name.includes("headphone") || name.includes("earphone") || name.includes("audio")) return Headphones;
  if (name.includes("game") || name.includes("console") || name.includes("playstation") || name.includes("xbox")) return Gamepad2;
  if (name.includes("speaker") || name.includes("sound")) return Speaker;
  if (name.includes("printer") || name.includes("scanner")) return Printer;
  if (name.includes("accessory") || name.includes("case") || name.includes("cover")) return Package2;
  if (name.includes("charger") || name.includes("cable") || name.includes("adapter")) return Plug;
  if (name.includes("home") || name.includes("kitchen") || name.includes("appliance")) return Home;
  if (name.includes("health") || name.includes("fitness") || name.includes("sport")) return Dumbbell;
  if (name.includes("book") || name.includes("education") || name.includes("learning")) return BookOpen;
  if (name.includes("fashion") || name.includes("cloth") || name.includes("wearable")) return Shirt;
  if (name.includes("toy") || name.includes("kids") || name.includes("children")) return ToyBrick;
  if (name.includes("car") || name.includes("auto") || name.includes("vehicle")) return Car;
  if (name.includes("tool") || name.includes("diy")) return Hammer;
  if (name.includes("shoe") || name.includes("footwear")) return Footprints;
  if (name.includes("garden") || name.includes("outdoor")) return Trees;
  if (name.includes("pet") || name.includes("animal")) return PawPrint;
  if (name.includes("beauty") || name.includes("cosmetic") || name.includes("skincare")) return Sparkles;
  if (name.includes("jewelry") || name.includes("ring") || name.includes("necklace")) return Gem;
  if (name.includes("food") || name.includes("grocery") || name.includes("beverage")) return Apple;
  if (name.includes("office") || name.includes("stationery") || name.includes("pen")) return PenLine;
  if (name.includes("travel") || name.includes("luggage") || name.includes("bag")) return Luggage;
  if (name.includes("baby") || name.includes("infant")) return Baby;
  if (name.includes("art") || name.includes("craft") || name.includes("creative")) return Palette;
  if (name.includes("music") || name.includes("instrument") || name.includes("guitar")) return Music;
  if (name.includes("electronic") || name.includes("device") || name.includes("gadget")) return Cpu;
  if (name.includes("furniture")) return Armchair;

  return Package2;
};