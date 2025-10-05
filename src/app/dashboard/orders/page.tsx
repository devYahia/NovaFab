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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Factory,
  Plus,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
  ArrowLeft,
  Calendar,
  DollarSign,
} from "lucide-react";

// Mock data - in a real app, this would come from the database
const mockOrders = [
  {
    id: "ORD-001",
    title: "Prototype Housing",
    description: "Custom housing for electronic prototype",
    serviceType: "3D Printing",
    status: "in_progress",
    urgency: "standard",
    createdAt: "2024-02-15T10:30:00Z",
    estimatedDelivery: "2024-02-20T17:00:00Z",
    totalCost: 125.5,
    files: 2,
    material: "PLA",
    quantity: 1,
    notes: "Please use high quality settings",
  },
  {
    id: "ORD-002",
    title: "Custom Bracket",
    description: "Aluminum bracket for mounting system",
    serviceType: "CNC Machining",
    status: "completed",
    urgency: "urgent",
    createdAt: "2024-02-10T14:20:00Z",
    estimatedDelivery: "2024-02-15T12:00:00Z",
    totalCost: 89.99,
    files: 1,
    material: "Aluminum 6061",
    quantity: 5,
    notes: "Anodized finish required",
  },
  {
    id: "ORD-003",
    title: "Acrylic Panel",
    description: "Clear acrylic display panel",
    serviceType: "Laser Cutting",
    status: "pending",
    urgency: "standard",
    createdAt: "2024-02-18T09:15:00Z",
    estimatedDelivery: "2024-02-25T16:30:00Z",
    totalCost: 45.0,
    files: 3,
    material: "Clear Acrylic 3mm",
    quantity: 2,
    notes: "Edge polishing needed",
  },
  {
    id: "ORD-004",
    title: "Gear Assembly",
    description: "Precision gear set for mechanical project",
    serviceType: "3D Printing",
    status: "completed",
    urgency: "standard",
    createdAt: "2024-02-05T11:45:00Z",
    estimatedDelivery: "2024-02-12T15:20:00Z",
    totalCost: 67.25,
    files: 4,
    material: "PETG",
    quantity: 1,
    notes: "High precision required",
  },
  {
    id: "ORD-005",
    title: "Metal Plate",
    description: "Steel plate with custom holes",
    serviceType: "CNC Machining",
    status: "cancelled",
    urgency: "urgent",
    createdAt: "2024-02-08T16:00:00Z",
    estimatedDelivery: "2024-02-14T10:00:00Z",
    totalCost: 156.8,
    files: 2,
    material: "Steel",
    quantity: 3,
    notes: "Cancelled due to design changes",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  useEffect(() => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Service filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.serviceType === serviceFilter,
      );
    }

    // Urgency filter
    if (urgencyFilter !== "all") {
      filtered = filtered.filter((order) => order.urgency === urgencyFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter, serviceFilter, urgencyFilter]);

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
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-xl font-bold text-gray-900">Orders</span>
            </div>

            <Link href="/dashboard/orders/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your manufacturing orders
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="3D Printing">3D Printing</SelectItem>
                  <SelectItem value="CNC Machining">CNC Machining</SelectItem>
                  <SelectItem value="Laser Cutting">Laser Cutting</SelectItem>
                </SelectContent>
              </Select>

              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ||
                  statusFilter !== "all" ||
                  serviceFilter !== "all" ||
                  urgencyFilter !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "You haven't placed any orders yet."}
                </p>
                <Link href="/dashboard/orders/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Order
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(order.status)}
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.title}
                        </h3>
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

                      <p className="text-gray-600 mb-3">{order.description}</p>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">
                            Order ID:
                          </span>
                          <p className="text-gray-600">{order.id}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Service:
                          </span>
                          <p className="text-gray-600">{order.serviceType}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Material:
                          </span>
                          <p className="text-gray-600">{order.material}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Quantity:
                          </span>
                          <p className="text-gray-600">{order.quantity}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Created:
                          </span>
                          <p className="text-gray-600">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Delivery:
                          </span>
                          <p className="text-gray-600">
                            {formatDate(order.estimatedDelivery)}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Files:
                          </span>
                          <p className="text-gray-600">{order.files} file(s)</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Total Cost:
                          </span>
                          <p className="text-gray-900 font-semibold">
                            ${order.totalCost.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {order.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">
                            Notes:
                          </span>
                          <p className="text-gray-600 mt-1">{order.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>

                      {order.status === "completed" && (
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary */}
        {filteredOrders.length > 0 && (
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {filteredOrders.length} of {orders.length} orders
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Total Value:</span>
                    <span className="font-semibold text-gray-900">
                      $
                      {filteredOrders
                        .reduce((sum, order) => sum + order.totalCost, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}