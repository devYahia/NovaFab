import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Factory,
  ArrowLeft,
  CheckCircle,
  Clock,
  Zap,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function ThreeDPrintingPage() {
  const materials = [
    {
      name: "PLA",
      description: "Easy to print, biodegradable, perfect for prototypes",
      properties: ["Eco-friendly", "Low temperature", "Good detail"],
      price: "Starting from $0.15/g",
    },
    {
      name: "ABS",
      description: "Strong and durable, suitable for functional parts",
      properties: ["High strength", "Heat resistant", "Chemical resistant"],
      price: "Starting from $0.18/g",
    },
    {
      name: "PETG",
      description: "Clear and strong, food-safe applications",
      properties: ["Crystal clear", "Food safe", "Chemical resistant"],
      price: "Starting from $0.22/g",
    },
    {
      name: "TPU",
      description: "Flexible material for rubber-like parts",
      properties: ["Flexible", "Durable", "Shock absorbing"],
      price: "Starting from $0.35/g",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Most orders completed within 24-48 hours",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all prints",
    },
    {
      icon: CheckCircle,
      title: "Precision Printing",
      description: "Layer heights as low as 0.1mm for fine details",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous monitoring for consistent quality",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Factory className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">NovaFab</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                href="/gallery"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Gallery
              </Link>
              <Link href="/services" className="text-blue-600 font-medium">
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
              href="/services"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Layers className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              3D Printing Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your digital designs into physical reality with our
              advanced 3D printing technology. From rapid prototyping to
              small-scale production, we deliver precision and quality.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our 3D Printing?
            </h2>
            <p className="text-lg text-gray-600">
              Professional-grade equipment and expertise for exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <feature.icon className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Materials
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our wide range of high-quality 3D printing materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {materials.map((material, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{material.name}</CardTitle>
                  <CardDescription>{material.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        Properties:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {material.properties.map((prop, propIndex) => (
                          <Badge
                            key={propIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {prop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-semibold text-blue-600">
                        {material.price}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps from design to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Design</h3>
              <p className="text-gray-600">
                Send us your 3D file (STL, OBJ, or other formats)
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Quote & Review</h3>
              <p className="text-gray-600">
                We analyze your design and provide a detailed quote
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Print & Quality Check
              </h3>
              <p className="text-gray-600">
                Professional printing with rigorous quality control
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Delivery</h3>
              <p className="text-gray-600">
                Fast and secure delivery to your location
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a free quote for your 3D printing project today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Get Quote
              </Button>
            </Link>
            <Link href="/dashboard/orders/new">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                Start Order
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
