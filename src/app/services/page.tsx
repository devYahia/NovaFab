import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Layers, Cog, Palette, ArrowRight, Factory } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      id: "laser-cutting",
      title: "Laser Cutting",
      description:
        "Precise cutting of various materials using advanced laser technology",
      icon: Zap,
      features: [
        "High Precision",
        "Fast Execution",
        "Various Materials",
        "Complex Designs",
      ],
      materials: ["Wood", "Acrylic", "Metals", "Leather", "Fabric"],
      href: "/services/laser-cutting",
    },
    {
      id: "3d-printing",
      title: "3D Printing",
      description:
        "Transform digital designs into real products with 3D printing technology",
      icon: Layers,
      features: [
        "Prototyping",
        "Small Production",
        "Complex Designs",
        "Various Materials",
      ],
      materials: ["PLA", "ABS", "PETG", "TPU", "Resin"],
      href: "/services/3d-printing",
    },
    {
      id: "cnc-machining",
      title: "CNC Machining",
      description:
        "Precise machining of metals and hard materials using CNC machines",
      icon: Cog,
      features: [
        "Ultra Precision",
        "Excellent Finish",
        "Large Production",
        "Hard Materials",
      ],
      materials: ["Aluminum", "Stainless Steel", "Copper", "Hard Plastic"],
      href: "/services/cnc-machining",
    },
    {
      id: "design-services",
      title: "Design Services",
      description:
        "Product design and development from concept to implementation",
      icon: Palette,
      features: [
        "Industrial Design",
        "3D Modeling",
        "Simulation",
        "Optimization",
      ],
      materials: ["CAD", "SolidWorks", "Fusion 360", "Blender"],
      href: "/services/design",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Specialized Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer a comprehensive range of digital manufacturing and 3D
            printing services to meet all your manufacturing needs with the
            highest quality and best prices
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={service.id}
                  className="hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-lg">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold mb-3">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, index) => (
                            <Badge key={index} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Materials */}
                      <div>
                        <h4 className="font-semibold mb-3">
                          Available Materials:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.materials.map((material, index) => (
                            <Badge key={index} variant="outline">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4">
                        <Link href={service.href}>
                          <Button className="w-full group-hover:bg-blue-600 transition-colors">
                            Learn More
                            <ArrowRight className="mr-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How We Work</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Order Received</h3>
              <p className="text-gray-600 text-sm">
                We receive your order and design files and review them
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Analysis & Pricing</h3>
              <p className="text-gray-600 text-sm">
                We analyze the project and provide a detailed quote
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Manufacturing</h3>
              <p className="text-gray-600 text-sm">
                We start the manufacturing process with the highest quality
                standards
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Delivery</h3>
              <p className="text-gray-600 text-sm">
                We deliver the final product on time
              </p>
            </div>
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
            Contact us today and get a free consultation for your project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Contact Us
              </Button>
            </Link>
            <Link href="/dashboard/orders/new">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                Request Service
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
