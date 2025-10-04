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
import {
  Factory,
  ArrowLeft,
  Star,
  Quote,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
} from "lucide-react";

// Mock reviews data - in a real app, this would come from the database
const reviews = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    company: "TechStart Inc.",
    rating: 5,
    title: "Exceptional Quality and Speed",
    content:
      "NovaFab delivered our prototype parts faster than expected with outstanding quality. Their attention to detail and communication throughout the process was excellent. Highly recommended for any manufacturing needs.",
    serviceType: "3D Printing",
    date: "2024-02-15",
    verified: true,
  },
  {
    id: 2,
    customerName: "Michael Chen",
    company: "Aerospace Dynamics",
    rating: 5,
    title: "Precision Manufacturing at Its Best",
    content:
      "The CNC machining work was absolutely perfect. Tight tolerances were met consistently, and the surface finish exceeded our expectations. Professional service from start to finish.",
    serviceType: "CNC Machining",
    date: "2024-02-10",
    verified: true,
  },
  {
    id: 3,
    customerName: "Emily Rodriguez",
    company: "Design Studio Pro",
    rating: 5,
    title: "Creative Solutions and Expert Guidance",
    content:
      "The team at NovaFab helped us optimize our design for manufacturing, saving us both time and money. The laser cutting work was intricate and flawless. Great partnership!",
    serviceType: "Laser Cutting",
    date: "2024-02-05",
    verified: true,
  },
  {
    id: 4,
    customerName: "David Thompson",
    company: "MedTech Solutions",
    rating: 5,
    title: "Reliable Partner for Medical Devices",
    content:
      "Working with NovaFab on our medical device components has been fantastic. They understand the strict requirements and deliver consistent, high-quality parts every time.",
    serviceType: "Injection Molding",
    date: "2024-01-30",
    verified: true,
  },
  {
    id: 5,
    customerName: "Lisa Wang",
    company: "Automotive Innovations",
    rating: 5,
    title: "Outstanding Customer Service",
    content:
      "From initial consultation to final delivery, the customer service was exceptional. They kept us informed at every step and delivered exactly what we needed on time.",
    serviceType: "CNC Machining",
    date: "2024-01-25",
    verified: true,
  },
  {
    id: 6,
    customerName: "Robert Martinez",
    company: "Prototype Labs",
    rating: 5,
    title: "Perfect for Rapid Prototyping",
    content:
      "NovaFab is our go-to partner for rapid prototyping. Fast turnaround, excellent quality, and competitive pricing. They've helped us accelerate our product development significantly.",
    serviceType: "3D Printing",
    date: "2024-01-20",
    verified: true,
  },
];

const stats = [
  { label: "Happy Customers", value: "2,500+", icon: Users },
  { label: "Projects Completed", value: "15,000+", icon: CheckCircle },
  { label: "Average Rating", value: "4.9/5", icon: Star },
  { label: "On-Time Delivery", value: "99.2%", icon: TrendingUp },
];

export default function ReviewsPage() {
  const averageRating = 4.9;
  const totalReviews = 2847;

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
              <Link href="/reviews" className="text-blue-600 font-medium">
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
              Customer Reviews
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              See what our customers say about their experience with
              NovaFab&apos;s manufacturing services.
            </p>

            {/* Rating Summary */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {averageRating}
              </span>
              <span className="text-gray-600">
                ({totalReviews.toLocaleString("en-US")} reviews)
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {stat.label}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{review.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="font-medium">{review.customerName}</span>
                    <span className="text-gray-400">•</span>
                    <span>{review.company}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <Quote className="h-6 w-6 text-blue-200 absolute -top-2 -left-1" />
                    <p className="text-gray-600 pl-6 italic">
                      {review.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline">{review.serviceType}</Badge>
                    <span className="text-gray-500">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From startups to Fortune 500 companies, businesses trust NovaFab
              for their manufacturing needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>ISO 9001 Certified</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our quality management system meets international standards
                  for consistent, high-quality manufacturing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>99.2% On-Time Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We pride ourselves on meeting deadlines and delivering
                  projects when promised, every time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our dedicated support team is available around the clock to
                  assist with your manufacturing needs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Satisfied Customers
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the NovaFab difference and see why thousands of customers
            trust us with their manufacturing projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Start Your Project
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
