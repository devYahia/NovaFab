"use client";

import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Factory,
  ArrowLeft,
  Download,
  MessageCircle,
  Calendar,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Image,
  MapPin,
  DollarSign,
  User,
  Phone,
  Mail,
} from "lucide-react";

// Mock data - in a real app, this would come from the database based on the ID
const mockOrder = {
  id: "ORD-001",
  title: "Prototype Housing",
  description:
    "Custom housing for electronic prototype with precise tolerances and mounting holes",
  serviceType: "3D Printing",
  status: "in_progress",
  urgency: "standard",
  createdAt: "2024-02-15T10:30:00Z",
  estimatedDelivery: "2024-02-20T17:00:00Z",
  actualDelivery: null,
  totalCost: 125.5,
  material: "PLA",
  quantity: 1,
  notes: "Please use high quality settings for smooth surface finish",
  specifications: {
    dimensions: "100mm x 75mm x 25mm",
    tolerance: "±0.2mm",
    finish: "Smooth",
    color: "Black",
  },
  files: [
    {
      id: 1,
      name: "housing_v2.stl",
      size: "2.4 MB",
      type: "STL",
      uploadedAt: "2024-02-15T10:30:00Z",
    },
    {
      id: 2,
      name: "assembly_drawing.pdf",
      size: "1.1 MB",
      type: "PDF",
      uploadedAt: "2024-02-15T10:32:00Z",
    },
  ],
  shipping: {
    address: "123 Innovation Drive",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
    trackingNumber: "TRK123456789",
  },
  timeline: [
    {
      date: "2024-02-15T10:30:00Z",
      status: "Order Placed",
      description: "Order received and payment confirmed",
      completed: true,
    },
    {
      date: "2024-02-15T14:20:00Z",
      status: "Files Reviewed",
      description: "Design files validated and approved",
      completed: true,
    },
    {
      date: "2024-02-16T09:15:00Z",
      status: "Production Started",
      description: "Manufacturing process initiated",
      completed: true,
    },
    {
      date: "2024-02-18T16:45:00Z",
      status: "Quality Check",
      description: "Parts inspected and approved",
      completed: false,
    },
    {
      date: "2024-02-19T12:00:00Z",
      status: "Packaging",
      description: "Order packaged for shipment",
      completed: false,
    },
    {
      date: "2024-02-20T17:00:00Z",
      status: "Shipped",
      description: "Package dispatched for delivery",
      completed: false,
    },
  ],
  messages: [
    {
      id: 1,
      from: "NovaFab Team",
      message:
        "Your order has been received and is being reviewed. We'll start production shortly.",
      timestamp: "2024-02-15T11:00:00Z",
      isFromCustomer: false,
    },
    {
      id: 2,
      from: "You",
      message:
        "Can you confirm the surface finish will be smooth as requested?",
      timestamp: "2024-02-15T15:30:00Z",
      isFromCustomer: true,
    },
    {
      id: 3,
      from: "NovaFab Team",
      message:
        "Yes, we'll use 0.1mm layer height for a smooth finish. Production started today.",
      timestamp: "2024-02-16T09:30:00Z",
      isFromCustomer: false,
    },
  ],
};

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [order, setOrder] = useState(mockOrder);
  const [newMessage, setNewMessage] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "standard":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "in_progress":
        return <Package className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-600" />;
      case "stl":
      case "step":
      case "dwg":
      case "dxf":
        return <Package className="h-4 w-4 text-blue-600" />;
      default:
        return <Image className="h-4 w-4 text-green-600" />;
    }
  };

  const calculateProgress = () => {
    const completedSteps = order.timeline.filter(
      (step) => step.completed,
    ).length;
    return (completedSteps / order.timeline.length) * 100;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // In a real app, this would send the message to your API
    const message = {
      id: order.messages.length + 1,
      from: "You",
      message: newMessage,
      timestamp: new Date().toISOString(),
      isFromCustomer: true,
    };

    setOrder((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Factory className="h-6 w-6 text-blue-600" />
                <span className="font-bold">NovaFab</span>
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/dashboard/orders"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Orders</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-xl font-bold text-gray-900">
                Order {order.id}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              {order.status === "completed" && (
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Files
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{order.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {order.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.replace("_", " ")}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getUrgencyColor(order.urgency)}
                    >
                      {order.urgency}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Order ID:</span>
                    <p className="text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Service Type:
                    </span>
                    <p className="text-gray-900">{order.serviceType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Material:</span>
                    <p className="text-gray-900">{order.material}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Quantity:</span>
                    <p className="text-gray-900">{order.quantity}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Order Date:
                    </span>
                    <p className="text-gray-900">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Estimated Delivery:
                    </span>
                    <p className="text-gray-900">
                      {formatDate(order.estimatedDelivery)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Production Progress</span>
                </CardTitle>
                <CardDescription>
                  Track your order through our manufacturing process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(calculateProgress())}% Complete</span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                </div>

                <div className="space-y-4">
                  {order.timeline.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                          step.completed
                            ? "bg-green-100 border-green-500 text-green-600"
                            : "bg-gray-100 border-gray-300 text-gray-400"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-600"}`}
                        >
                          {step.status}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {step.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(step.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Files */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Project Files</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file.type)}
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {file.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {file.size} • Uploaded {formatDate(file.uploadedAt)}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">
                      Dimensions:
                    </span>
                    <p className="text-gray-900">
                      {order.specifications.dimensions}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Tolerance:
                    </span>
                    <p className="text-gray-900">
                      {order.specifications.tolerance}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Surface Finish:
                    </span>
                    <p className="text-gray-900">
                      {order.specifications.finish}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Color:</span>
                    <p className="text-gray-900">
                      {order.specifications.color}
                    </p>
                  </div>
                </div>

                {order.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">
                      Additional Notes:
                    </span>
                    <p className="text-gray-900 mt-1">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${(order.totalCost * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span>${(order.totalCost * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${(order.totalCost * 0.05).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${order.totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Shipping Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">{order.shipping.address}</p>
                  <p>
                    {order.shipping.city}, {order.shipping.state}{" "}
                    {order.shipping.zipCode}
                  </p>
                  <p>{order.shipping.country}</p>

                  {order.shipping.trackingNumber && (
                    <div className="mt-3 p-2 bg-blue-50 rounded">
                      <span className="font-medium text-blue-900">
                        Tracking:
                      </span>
                      <p className="text-blue-700">
                        {order.shipping.trackingNumber}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Messages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {order.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${
                        message.isFromCustomer
                          ? "bg-blue-50 ml-4"
                          : "bg-gray-50 mr-4"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">
                          {message.from}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="mt-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button type="submit" size="sm">
                      Send
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>support@novafab.com</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
