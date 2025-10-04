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
  Users,
  Target,
  Eye,
  Heart,
  Award,
  MapPin,
  Factory,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Precision & Quality",
      description:
        "We commit to the highest quality standards in every project we undertake",
    },
    {
      icon: Users,
      title: "Customer Service",
      description:
        "We put our customers first and strive to achieve their complete satisfaction",
    },
    {
      icon: Award,
      title: "Innovation",
      description:
        "We use the latest technologies and innovative methods in manufacturing",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We love what we do and strive for excellence in every detail",
    },
  ];

  const team = [
    {
      name: "Ahmed Mohamed",
      role: "Chief Executive Officer",
      description: "15 years of experience in manufacturing and production",
    },
    {
      name: "Sarah Ahmed",
      role: "Design Manager",
      description: "Specialist in industrial design and 3D modeling",
    },
    {
      name: "Mohamed Ali",
      role: "Production Engineer",
      description: "Expert in CNC technologies and 3D printing",
    },
    {
      name: "Fatima Hassan",
      role: "Quality Manager",
      description:
        "Responsible for quality assurance and production monitoring",
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
              <Link href="/about" className="text-blue-600 font-medium">
                About
              </Link>
              <Link
                href="/gallery"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              NovaFab
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A leading company in digital manufacturing and 3D printing,
              providing innovative solutions and high-quality services to
              businesses and individuals throughout the region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in a set of values that guide our work and define our
              identity as a company
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-6">
                Our Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Journey of Innovation and Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                NovaFab started as a small dream in 2020, when a group of
                passionate engineers decided to establish a company that
                combines advanced technology with traditional craftsmanship.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, we are proud to be one of the leading companies in the
                region, serving hundreds of clients and completing thousands of
                successful projects annually.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600">Completed Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    200+
                  </div>
                  <div className="text-gray-600">Satisfied Clients</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg mb-6">
                  To be the leading company in the region in digital
                  manufacturing and 3D printing
                </p>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg">
                  To provide innovative and high-quality manufacturing solutions
                  that help our clients achieve their goals and turn their ideas
                  into reality
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the creative people behind NovaFab's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Location
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are located in the heart of the region to serve you better
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="flex items-center mb-6">
                      <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Our Address
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Mansoura, Lower Mashaya, Egypt
                    </p>
                    <p className="text-gray-600 mb-6">
                      We are in a strategic location that is easily accessible
                      from all parts of the region
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 w-20">
                          Phone:
                        </span>
                        <span className="text-gray-600">+201010806909</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 w-20">
                          Email:
                        </span>
                        <span className="text-gray-600">info@novafab.com</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 w-20">
                          Hours:
                        </span>
                        <span className="text-gray-600">
                          Sunday - Thursday, 9 AM - 6 PM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-64 lg:h-auto bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Interactive Map</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
