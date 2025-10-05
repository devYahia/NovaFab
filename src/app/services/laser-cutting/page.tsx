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
  Zap,
  CheckCircle,
  Clock,
  DollarSign,
  Ruler,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function LaserCuttingPage() {
  const materials = [
    {
      name: "Wood",
      thickness: "1-20 mm",
      description: "Natural wood, MDF, plywood",
      price: "From 250 LE/m²",
    },
    {
      name: "Acrylic",
      thickness: "1-25 mm",
      description: "Clear, colored, matte",
      price: "From 400 LE/m²",
    },
    {
      name: "Metals",
      thickness: "0.5-10 mm",
      description: "Stainless steel, aluminum, copper",
      price: "From 600 LE/m²",
    },
    {
      name: "Leather",
      thickness: "1-5 mm",
      description: "Natural leather, synthetic",
      price: "From 300 LE/m²",
    },
    {
      name: "Fabric",
      thickness: "1-3 mm",
      description: "Cotton, polyester, felt",
      price: "From 200 LE/m²",
    },
    {
      name: "Cardboard",
      thickness: "1-5 mm",
      description: "Cardboard, colored cardboard",
      price: "From 150 LE/m²",
    },
  ];

  const applications = [
    "Signs and Advertisements",
    "Home Decorations",
    "Architectural Models",
    "Spare Parts",
    "Jewelry and Accessories",
    "Toys and Gifts",
    "Templates and Tools",
    "Art and Handicrafts",
  ];

  const advantages = [
    {
      icon: CheckCircle,
      title: "Ultra Precision",
      description: "Accuracy up to ±0.1 mm",
    },
    {
      icon: Clock,
      title: "Fast Execution",
      description: "Delivery within 24-48 hours",
    },
    {
      icon: DollarSign,
      title: "Competitive Prices",
      description: "Best prices in the market",
    },
    {
      icon: Ruler,
      title: "Various Sizes",
      description: "From small to large pieces",
    },
    {
      icon: Layers,
      title: "Complex Designs",
      description: "Cut complex designs with ease",
    },
    {
      icon: Zap,
      title: "Excellent Finish",
      description: "Clean and smooth edges",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Laser Cutting Service
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Get precise and fast cutting for all types of materials using the
            latest laser technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get a Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">
                Service Specifications
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Accuracy:</span>
                  <span className="font-semibold">±0.1 mm</span>
                </div>
                <div className="flex justify-between">
                  <span>Maximum Size:</span>
                  <span className="font-semibold">1200×800 mm</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Time:</span>
                  <span className="font-semibold">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum Order:</span>
                  <span className="font-semibold">One piece</span>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard/orders/new">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  >
                    Order Cutting Service
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Laser Cutting Advantages
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Available Materials
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{material.name}</CardTitle>
                  <CardDescription>
                    Thickness: {material.thickness}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{material.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">{material.price}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Applications and Uses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {applications.map((application, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <p className="font-medium text-gray-700">{application}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Laser Cutting Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Upload File</h3>
              <p className="text-gray-600 text-sm">
                Upload your design file (DXF, AI, PDF)
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Material</h3>
              <p className="text-gray-600 text-sm">
                Select material type and required thickness
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Processing</h3>
              <p className="text-gray-600 text-sm">
                We prepare the file and start cutting process
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Delivery</h3>
              <p className="text-gray-600 text-sm">
                We deliver pieces ready for use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* File Requirements */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle>File Requirements</CardTitle>
                <CardDescription>
                  Make sure your files meet these requirements for best results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      Accepted File Formats:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>DXF</Badge>
                      <Badge>AI</Badge>
                      <Badge>PDF</Badge>
                      <Badge>SVG</Badge>
                      <Badge>CDR</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Closed paths</li>
                      <li>• Line thickness 0.1 mm or less</li>
                      <li>• Different colors for cutting and engraving</li>
                      <li>• High resolution (300 DPI or more)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Design:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Avoid very fine details</li>
                      <li>• Leave 3 mm space between cuts</li>
                      <li>• Use simple and direct lines</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Materials:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Choose appropriate thickness for use</li>
                      <li>• Ensure required material availability</li>
                      <li>• Consider final finishing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get a free quote and specialized technical consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get a Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
            >
              Talk to Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}