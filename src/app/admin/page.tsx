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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Factory,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  FileText,
  Settings,
  Bell,
  Search,
  Filter,
} from "lucide-react";

// Mock data for admin dashboard
const mockStats = {
  totalOrders: 156,
  activeOrders: 42,
  completedOrders: 98,
  cancelledOrders: 16,
  totalRevenue: 45250.75,
  monthlyRevenue: 12850.5,
  totalCustomers: 89,
  newCustomers: 12,
  averageOrderValue: 290.07,
  productionCapacity: 85, // percentage
  pendingQuotes: 8,
  urgentOrders: 5,
};

const recentOrders = [
  {
    id: "ORD-156",
    customer: "John Doe",
    title: "Prototype Housing",
    serviceType: "3D Printing",
    status: "in_progress",
    urgency: "urgent",
    value: 125.5,
    createdAt: "2024-02-15T10:30:00Z",
    estimatedDelivery: "2024-02-18T17:00:00Z",
  },
  {
    id: "ORD-155",
    customer: "Sarah Johnson",
    title: "Custom Bracket Set",
    serviceType: "CNC Machining",
    status: "pending",
    urgency: "standard",
    value: 450.0,
    createdAt: "2024-02-15T09:15:00Z",
    estimatedDelivery: "2024-02-22T17:00:00Z",
  },
  {
    id: "ORD-154",
    customer: "Tech Corp",
    title: "Injection Mold Prototype",
    serviceType: "Injection Molding",
    status: "completed",
    urgency: "standard",
    value: 1250.0,
    createdAt: "2024-02-14T14:20:00Z",
    estimatedDelivery: "2024-02-20T17:00:00Z",
  },
  {
    id: "ORD-153",
    customer: "Innovation Labs",
    title: "PCB Enclosure",
    serviceType: "3D Printing",
    status: "quality_check",
    urgency: "urgent",
    value: 89.99,
    createdAt: "2024-02-14T11:45:00Z",
    estimatedDelivery: "2024-02-17T17:00:00Z",
  },
  {
    id: "ORD-152",
    customer: "Design Studio",
    title: "Architectural Model",
    serviceType: "3D Printing",
    status: "shipped",
    urgency: "standard",
    value: 320.75,
    createdAt: "2024-02-13T16:30:00Z",
    estimatedDelivery: "2024-02-19T17:00:00Z",
  },
];

const recentCustomers = [
  {
    id: "CUST-089",
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Tech Innovations Inc.",
    totalOrders: 8,
    totalSpent: 2450.75,
    joinedAt: "2024-01-15T10:30:00Z",
    lastOrder: "2024-02-15T10:30:00Z",
  },
  {
    id: "CUST-088",
    name: "Sarah Johnson",
    email: "sarah@designstudio.com",
    company: "Creative Design Studio",
    totalOrders: 12,
    totalSpent: 3890.5,
    joinedAt: "2023-11-20T14:20:00Z",
    lastOrder: "2024-02-15T09:15:00Z",
  },
  {
    id: "CUST-087",
    name: "Mike Chen",
    email: "mike.chen@techcorp.com",
    company: "Tech Corp",
    totalOrders: 15,
    totalSpent: 5670.25,
    joinedAt: "2023-09-10T09:45:00Z",
    lastOrder: "2024-02-14T14:20:00Z",
  },
];

const alerts = [
  {
    id: 1,
    type: "urgent",
    title: "Urgent Order Deadline",
    message: "Order ORD-156 has a delivery deadline in 2 days",
    timestamp: "2024-02-15T15:30:00Z",
  },
  {
    id: 2,
    type: "warning",
    title: "Low Material Stock",
    message: "PLA filament stock is running low (15% remaining)",
    timestamp: "2024-02-15T14:20:00Z",
  },
  {
    id: 3,
    type: "info",
    title: "New Customer Registration",
    message: "3 new customers registered today",
    timestamp: "2024-02-15T12:45:00Z",
  },
];

export default function AdminDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "info":
        return <Bell className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Factory className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">
                  NovaFab Admin
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, customers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor your manufacturing operations and business metrics
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {["24h", "7d", "30d", "90d"].map((range) => (
              <Button
                key={range}
                variant={selectedTimeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mockStats.totalOrders}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    +12% from last month
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Monthly Revenue
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(mockStats.monthlyRevenue)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    +8% from last month
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Orders
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mockStats.activeOrders}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    {mockStats.urgentOrders} urgent
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Customers
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mockStats.totalCustomers}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    +{mockStats.newCustomers} new this month
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Production Capacity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Production Capacity</span>
                </CardTitle>
                <CardDescription>
                  Current utilization of manufacturing resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Capacity</span>
                      <span>{mockStats.productionCapacity}%</span>
                    </div>
                    <Progress
                      value={mockStats.productionCapacity}
                      className="h-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">8</p>
                      <p className="text-sm text-blue-800">
                        3D Printers Active
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">3</p>
                      <p className="text-sm text-green-800">
                        CNC Machines Active
                      </p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">2</p>
                      <p className="text-sm text-purple-800">
                        Injection Molders Active
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Latest orders requiring attention
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Link href="/admin/orders">
                      <Button size="sm">View All</Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">
                            {order.id}
                          </h4>
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
                        <p className="text-sm text-gray-600">
                          {order.title} • {order.customer}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.serviceType} • {formatCurrency(order.value)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Created: {formatDate(order.createdAt)} • Due:{" "}
                          {formatDate(order.estimatedDelivery)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Customers */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Customers</CardTitle>
                    <CardDescription>
                      New and active customer accounts
                    </CardDescription>
                  </div>
                  <Link href="/admin/customers">
                    <Button size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {customer.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {customer.company}
                          </p>
                          <p className="text-xs text-gray-500">
                            {customer.totalOrders} orders •{" "}
                            {formatCurrency(customer.totalSpent)} total
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/admin/customers/${customer.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/admin/orders/new">
                    <Button className="w-full justify-start">
                      <Package className="h-4 w-4 mr-2" />
                      Create Order
                    </Button>
                  </Link>
                  <Link href="/admin/customers/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Add Customer
                    </Button>
                  </Link>
                  <Link href="/admin/inventory">
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="h-4 w-4 mr-2" />
                      Manage Inventory
                    </Button>
                  </Link>
                  <Link href="/admin/reports">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Alerts & Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-3 border rounded-lg">
                      <div className="flex items-start space-x-2">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(alert.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">File Storage</span>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Gateway</span>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Service</span>
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-600">Degraded</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
