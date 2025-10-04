import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Factory, ArrowLeft, Filter, Search, Grid, List } from "lucide-react";

// Mock gallery data - in a real app, this would come from the database
const galleryItems = [
  {
    id: 1,
    title: "Precision Aerospace Component",
    description:
      "High-precision aluminum part for aerospace application with tight tolerances.",
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=400&fit=crop",
    category: "CNC Machining",
    isPublic: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Custom Prototype Housing",
    description:
      "3D printed prototype housing for electronic device with complex geometry.",
    imageUrl:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&h=400&fit=crop",
    category: "3D Printing",
    isPublic: true,
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    title: "Decorative Metal Panel",
    description:
      "Laser cut decorative panel with intricate patterns for architectural application.",
    imageUrl:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=400&fit=crop",
    category: "Laser Cutting",
    isPublic: true,
    createdAt: "2024-01-25",
  },
  {
    id: 4,
    title: "Medical Device Component",
    description:
      "Biocompatible plastic component manufactured for medical device application.",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop",
    category: "Injection Molding",
    isPublic: true,
    createdAt: "2024-02-01",
  },
  {
    id: 5,
    title: "Automotive Bracket",
    description:
      "High-strength steel bracket for automotive application with powder coating finish.",
    imageUrl:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&h=400&fit=crop",
    category: "CNC Machining",
    isPublic: true,
    createdAt: "2024-02-05",
  },
  {
    id: 6,
    title: "Functional Prototype",
    description:
      "Multi-material 3D printed functional prototype with moving parts.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=400&fit=crop",
    category: "3D Printing",
    isPublic: true,
    createdAt: "2024-02-10",
  },
  {
    id: 7,
    title: "Architectural Model",
    description:
      "Precision laser cut architectural scale model with fine details.",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
    category: "Laser Cutting",
    isPublic: true,
    createdAt: "2024-02-15",
  },
  {
    id: 8,
    title: "Consumer Product Shell",
    description:
      "High-volume injection molded consumer product housing with textured finish.",
    imageUrl:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=500&h=400&fit=crop",
    category: "Injection Molding",
    isPublic: true,
    createdAt: "2024-02-20",
  },
];

const categories = [
  "All",
  "3D Printing",
  "CNC Machining",
  "Laser Cutting",
  "Injection Molding",
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Factory className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">NovaFab</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link href="/gallery" className="text-blue-600 font-medium">
                Gallery
              </Link>
              <Link
                href="/services"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/reviews"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Reviews
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Project Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of precision manufacturing projects across
              various industries and applications.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === "All" ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors px-4 py-2"
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-800"
                    >
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our satisfied customers and bring your manufacturing ideas to
            life with NovaFab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Get Started Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Factory className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">NovaFab</span>
              </div>
              <p className="text-gray-400">
                Advanced manufacturing platform delivering precision and
                quality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/services/3d-printing"
                    className="hover:text-white transition-colors"
                  >
                    3D Printing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/cnc-machining"
                    className="hover:text-white transition-colors"
                  >
                    CNC Machining
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/laser-cutting"
                    className="hover:text-white transition-colors"
                  >
                    Laser Cutting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/injection-molding"
                    className="hover:text-white transition-colors"
                  >
                    Injection Molding
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="hover:text-white transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reviews"
                    className="hover:text-white transition-colors"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NovaFab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
