"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Factory,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Package,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpDown,
  RefreshCw,
  Printer,
} from "lucide-react";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-156",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      company: "Tech Innovations Inc.",
    },
    title: "Prototype Housing",
    description: "Custom housing for electronic prototype",
    serviceType: "3D Printing",
    material: "PLA",
    quantity: 1,
    status: "in_progress",
    urgency: "urgent",
    totalCost: 125.5,
    createdAt: "2024-02-15T10:30:00Z",
    estimatedDelivery: "2024-02-18T17:00:00Z",
    assignedTo: "Mike Johnson",
    progress: 65,
  },
  {
    id: "ORD-155",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@designstudio.com",
      company: "Creative Design Studio",
    },
    title: "Custom Bracket Set",
    description: "Aluminum brackets for mounting system",
    serviceType: "CNC Machining",
    material: "Aluminum 6061",
    quantity: 5,
    status: "pending",
    urgency: "standard",
    totalCost: 450.0,
    createdAt: "2024-02-15T09:15:00Z",
    estimatedDelivery: "2024-02-22T17:00:00Z",
    assignedTo: null,
    progress: 0,
  },
  {
    id: "ORD-154",
    customer: {
      name: "Mike Chen",
      email: "mike.chen@techcorp.com",
      company: "Tech Corp",
    },
    title: "Injection Mold Prototype",
    description: "Prototype mold for plastic component",
    serviceType: "Injection Molding",
    material: "Steel P20",
    quantity: 1,
    status: "completed",
    urgency: "standard",
    totalCost: 1250.0,
    createdAt: "2024-02-14T14:20:00Z",
    estimatedDelivery: "2024-02-20T17:00:00Z",
    assignedTo: "Lisa Wang",
    progress: 100,
  },
  {
    id: "ORD-153",
    customer: {
      name: "Alex Rodriguez",
      email: "alex@innovationlabs.com",
      company: "Innovation Labs",
    },
    title: "PCB Enclosure",
    description: "Waterproof enclosure for PCB assembly",
    serviceType: "3D Printing",
    material: "PETG",
    quantity: 3,
    status: "quality_check",
    urgency: "urgent",
    totalCost: 89.99,
    createdAt: "2024-02-14T11:45:00Z",
    estimatedDelivery: "2024-02-17T17:00:00Z",
    assignedTo: "David Kim",
    progress: 85,
  },
  {
    id: "ORD-152",
    customer: {
      name: "Emma Wilson",
      email: "emma@designstudio.com",
      company: "Design Studio",
    },
    title: "Architectural Model",
    description: "Scale model for architectural presentation",
    serviceType: "3D Printing",
    material: "Resin",
    quantity: 1,
    status: "shipped",
    urgency: "standard",
    totalCost: 320.75,
    createdAt: "2024-02-13T16:30:00Z",
    estimatedDelivery: "2024-02-19T17:00:00Z",
    assignedTo: "Mike Johnson",
    progress: 100,
  },
  {
    id: "ORD-151",
    customer: {
      name: "Robert Taylor",
      email: "robert@startup.com",
      company: "Startup Inc.",
    },
    title: "Functional Prototype",
    description: "Working prototype for product testing",
    serviceType: "CNC Machining",
    material: "Aluminum 7075",
    quantity: 2,
    status: "cancelled",
    urgency: "standard",
    totalCost: 680.0,
    createdAt: "2024-02-12T13:20:00Z",
    estimatedDelivery: "2024-02-25T17:00:00Z",
    assignedTo: null,
    progress: 0,
  },
];

const serviceTypes = [
  "All",
  "3D Printing",
  "CNC Machining",
  "Injection Molding",
  "Laser Cutting",
];
const statuses = [
  "All",
  "pending",
  "in_progress",
  "quality_check",
  "completed",
  "shipped",
  "cancelled",
];
const urgencies = ["All", "standard", "urgent"];

// Receipt printing function
const printReceipt = (order: any) => {
  const receiptWindow = window.open("", "_blank", "width=800,height=600");
  if (!receiptWindow) return;

  const receiptHTML = `
    <!DOCTYPE html>
    <html dir="ltr" lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Receipt - ${order.id}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 20px;
          background: white;
          color: #333;
          line-height: 1.6;
        }
        .receipt {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border: 2px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 2.5em;
          font-weight: bold;
        }
        .header p {
          margin: 10px 0 0 0;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
        }
        .order-info {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e2e8f0;
        }
        .info-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .label {
          font-weight: bold;
          color: #475569;
        }
        .value {
          color: #1e293b;
        }
        .total {
          background: #3b82f6;
          color: white;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          font-size: 1.2em;
          font-weight: bold;
          margin-top: 20px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e2e8f0;
          color: #64748b;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8em;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-in_progress { background: #dbeafe; color: #1e40af; }
        .status-completed { background: #d1fae5; color: #065f46; }
        .status-shipped { background: #e0e7ff; color: #3730a3; }
        .status-cancelled { background: #fee2e2; color: #991b1b; }
        @media print {
          body { margin: 0; }
          .receipt { border: none; box-shadow: none; }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <h1>NovaFab</h1>
          <p>Order Receipt</p>
        </div>
        <div class="content">
          <div class="order-info">
            <div class="info-row">
              <span class="label">Order Number:</span>
              <span class="value">${order.id}</span>
            </div>
            <div class="info-row">
              <span class="label">Customer Name:</span>
              <span class="value">${order.customer.name}</span>
            </div>
            <div class="info-row">
              <span class="label">Company:</span>
              <span class="value">${order.customer.company}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">${order.customer.email}</span>
            </div>
            <div class="info-row">
              <span class="label">Order Title:</span>
              <span class="value">${order.title}</span>
            </div>
            <div class="info-row">
              <span class="label">Description:</span>
              <span class="value">${order.description}</span>
            </div>
            <div class="info-row">
              <span class="label">Service Type:</span>
              <span class="value">${order.serviceType}</span>
            </div>
            <div class="info-row">
              <span class="label">Material:</span>
              <span class="value">${order.material}</span>
            </div>
            <div class="info-row">
              <span class="label">Quantity:</span>
              <span class="value">${order.quantity}</span>
            </div>
            <div class="info-row">
              <span class="label">Status:</span>
              <span class="value">
                <span class="status-badge status-${order.status}">
                  ${getStatusText(order.status)}
                </span>
              </span>
            </div>
            <div class="info-row">
              <span class="label">Order Date:</span>
              <span class="value">${new Date(order.createdAt).toLocaleDateString("en-US")}</span>
            </div>
            <div class="info-row">
              <span class="label">Expected Delivery:</span>
              <span class="value">${new Date(order.estimatedDelivery).toLocaleDateString("en-US")}</span>
            </div>
            ${
              order.assignedTo
                ? `
            <div class="info-row">
              <span class="label">Assigned To:</span>
              <span class="value">${order.assignedTo}</span>
            </div>
            `
                : ""
            }
          </div>
          
          <div class="total">
            Total Cost: $${order.totalCost.toFixed(2)}
          </div>
          
          <div class="footer">
            <p>Thank you for choosing NovaFab</p>
            <p>Print Date: ${new Date().toLocaleDateString("en-US")} - ${new Date().toLocaleTimeString("en-US")}</p>
          </div>
        </div>
      </div>
      
      <script>
        window.onload = function() {
          window.print();
          window.onafterprint = function() {
            window.close();
          };
        };
      </script>
    </body>
    </html>
  `;

  receiptWindow.document.write(receiptHTML);
  receiptWindow.document.close();
};

// Helper function to get status text in English
const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "in_progress":
      return "In Progress";
    case "quality_check":
      return "Quality Check";
    case "completed":
      return "Completed";
    case "shipped":
      return "Shipped";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedUrgency, setSelectedUrgency] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "quality_check":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
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
      case "quality_check":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "shipped":
        return <Package className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesServiceType =
      selectedServiceType === "All" ||
      order.serviceType === selectedServiceType;
    const matchesStatus =
      selectedStatus === "All" || order.status === selectedStatus;
    const matchesUrgency =
      selectedUrgency === "All" || order.urgency === selectedUrgency;

    return (
      matchesSearch && matchesServiceType && matchesStatus && matchesUrgency
    );
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue: any = a[sortBy as keyof typeof a];
    let bValue: any = b[sortBy as keyof typeof b];

    if (sortBy === "customer") {
      aValue = a.customer.name;
      bValue = b.customer.name;
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const handleAssignOrder = (orderId: string, assignee: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, assignedTo: assignee } : order,
      ),
    );
  };

  const getOrderStats = () => {
    const total = filteredOrders.length;
    const pending = filteredOrders.filter((o) => o.status === "pending").length;
    const inProgress = filteredOrders.filter(
      (o) => o.status === "in_progress",
    ).length;
    const completed = filteredOrders.filter(
      (o) => o.status === "completed",
    ).length;
    const totalValue = filteredOrders.reduce((sum, o) => sum + o.totalCost, 0);

    return { total, pending, inProgress, completed, totalValue };
  };

  const stats = getOrderStats();

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
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <span>Admin</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-xl font-bold text-gray-900">
                Order Management
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Link href="/admin/orders/new">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">
            Manage and track all manufacturing orders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {stats.inProgress}
                </p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.completed}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalValue)}
                </p>
                <p className="text-sm text-gray-600">Total Value</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "All" ? "All" : status.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency
                </label>
                <select
                  value={selectedUrgency}
                  onChange={(e) => setSelectedUrgency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {urgencies.map((urgency) => (
                    <option key={urgency} value={urgency}>
                      {urgency === "All" ? "All" : urgency}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({sortedOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("id")}
                      >
                        Order ID
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("customer")}
                      >
                        Customer
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("title")}
                      >
                        Project
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("serviceType")}
                      >
                        Service
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("status")}
                      >
                        Status
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("totalCost")}
                      >
                        Value
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("createdAt")}
                      >
                        Created
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">Assigned To</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-blue-600">
                            {order.id}
                          </p>
                          <Badge
                            variant="outline"
                            className={getUrgencyColor(order.urgency)}
                          >
                            {order.urgency}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-sm text-gray-600">
                            {order.customer.company}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{order.title}</p>
                          <p className="text-sm text-gray-600">
                            {order.material} • Qty: {order.quantity}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{order.serviceType}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace("_", " ")}
                          </Badge>
                        </div>
                        {order.status === "in_progress" && (
                          <div className="mt-1">
                            <div className="w-20 bg-gray-200 rounded-full h-1">
                              <div
                                className="bg-blue-600 h-1 rounded-full"
                                style={{ width: `${order.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {order.progress}%
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">
                          {formatCurrency(order.totalCost)}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">{formatDate(order.createdAt)}</p>
                        <p className="text-xs text-gray-500">
                          Due: {formatDate(order.estimatedDelivery)}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        {order.assignedTo ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-sm">{order.assignedTo}</span>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm">
                            Assign
                          </Button>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-1">
                          <Link href={`/admin/orders/${order.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => printReceipt(order)}
                            title="Print Receipt"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="More">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {sortedOrders.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No orders found matching your criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
