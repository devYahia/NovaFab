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
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  Package,
  Users,
  ArrowUpDown,
  RefreshCw,
  MoreHorizontal,
  Star,
  TrendingUp,
  Clock,
} from "lucide-react";

// Mock customers data
const mockCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Innovations Inc.",
    role: "Engineering Manager",
    status: "active",
    tier: "premium",
    totalOrders: 15,
    totalSpent: 3250.75,
    averageOrderValue: 216.72,
    lastOrderDate: "2024-02-15T10:30:00Z",
    joinDate: "2023-08-15T09:00:00Z",
    address: {
      street: "123 Tech Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "USA",
    },
    preferences: {
      communicationMethod: "email",
      notifications: true,
      newsletter: true,
    },
    rating: 4.8,
    notes: "Frequent customer, prefers rush orders",
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    email: "sarah@designstudio.com",
    phone: "+1 (555) 234-5678",
    company: "Creative Design Studio",
    role: "Creative Director",
    status: "active",
    tier: "standard",
    totalOrders: 8,
    totalSpent: 1450.5,
    averageOrderValue: 181.31,
    lastOrderDate: "2024-02-14T15:20:00Z",
    joinDate: "2023-11-20T14:30:00Z",
    address: {
      street: "456 Design Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA",
    },
    preferences: {
      communicationMethod: "phone",
      notifications: true,
      newsletter: false,
    },
    rating: 4.5,
    notes: "Focuses on architectural models",
  },
  {
    id: "CUST-003",
    name: "Mike Chen",
    email: "mike.chen@techcorp.com",
    phone: "+1 (555) 345-6789",
    company: "Tech Corp",
    role: "Product Manager",
    status: "active",
    tier: "enterprise",
    totalOrders: 32,
    totalSpent: 8750.25,
    averageOrderValue: 273.44,
    lastOrderDate: "2024-02-13T11:45:00Z",
    joinDate: "2023-05-10T10:15:00Z",
    address: {
      street: "789 Innovation Blvd",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      country: "USA",
    },
    preferences: {
      communicationMethod: "email",
      notifications: true,
      newsletter: true,
    },
    rating: 4.9,
    notes: "Enterprise client, bulk orders",
  },
  {
    id: "CUST-004",
    name: "Alex Rodriguez",
    email: "alex@innovationlabs.com",
    phone: "+1 (555) 456-7890",
    company: "Innovation Labs",
    role: "R&D Engineer",
    status: "inactive",
    tier: "standard",
    totalOrders: 3,
    totalSpent: 425.0,
    averageOrderValue: 141.67,
    lastOrderDate: "2024-01-20T09:30:00Z",
    joinDate: "2024-01-05T16:45:00Z",
    address: {
      street: "321 Lab Street",
      city: "Boston",
      state: "MA",
      zipCode: "02101",
      country: "USA",
    },
    preferences: {
      communicationMethod: "email",
      notifications: false,
      newsletter: false,
    },
    rating: 4.2,
    notes: "New customer, prototype focus",
  },
  {
    id: "CUST-005",
    name: "Emma Wilson",
    email: "emma@designstudio.com",
    phone: "+1 (555) 567-8901",
    company: "Design Studio",
    role: "Senior Designer",
    status: "active",
    tier: "premium",
    totalOrders: 22,
    totalSpent: 5680.9,
    averageOrderValue: 258.22,
    lastOrderDate: "2024-02-12T14:15:00Z",
    joinDate: "2023-07-22T11:20:00Z",
    address: {
      street: "654 Creative Way",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA",
    },
    preferences: {
      communicationMethod: "email",
      notifications: true,
      newsletter: true,
    },
    rating: 4.7,
    notes: "Architectural and product design",
  },
  {
    id: "CUST-006",
    name: "Robert Taylor",
    email: "robert@startup.com",
    phone: "+1 (555) 678-9012",
    company: "Startup Inc.",
    role: "Founder",
    status: "suspended",
    tier: "standard",
    totalOrders: 5,
    totalSpent: 890.5,
    averageOrderValue: 178.1,
    lastOrderDate: "2024-01-15T13:00:00Z",
    joinDate: "2023-12-01T09:45:00Z",
    address: {
      street: "987 Startup Lane",
      city: "Denver",
      state: "CO",
      zipCode: "80201",
      country: "USA",
    },
    preferences: {
      communicationMethod: "phone",
      notifications: false,
      newsletter: false,
    },
    rating: 3.8,
    notes: "Payment issues, account suspended",
  },
];

const tiers = ["All", "standard", "premium", "enterprise"];
const statuses = ["All", "active", "inactive", "suspended"];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("joinDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "standard":
        return "bg-blue-100 text-blue-800";
      case "premium":
        return "bg-purple-100 text-purple-800";
      case "enterprise":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTier =
      selectedTier === "All" || customer.tier === selectedTier;
    const matchesStatus =
      selectedStatus === "All" || customer.status === selectedStatus;

    return matchesSearch && matchesTier && matchesStatus;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let aValue: any = a[sortBy as keyof typeof a];
    let bValue: any = b[sortBy as keyof typeof b];

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

  const getCustomerStats = () => {
    const total = filteredCustomers.length;
    const active = filteredCustomers.filter(
      (c) => c.status === "active",
    ).length;
    const premium = filteredCustomers.filter(
      (c) => c.tier === "premium" || c.tier === "enterprise",
    ).length;
    const totalRevenue = filteredCustomers.reduce(
      (sum, c) => sum + c.totalSpent,
      0,
    );
    const avgOrderValue =
      filteredCustomers.reduce((sum, c) => sum + c.averageOrderValue, 0) /
        total || 0;

    return { total, active, premium, totalRevenue, avgOrderValue };
  };

  const stats = getCustomerStats();

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
                Customer Management
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
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Customer Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage customer relationships and analytics
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
                <p className="text-sm text-gray-600">Total Customers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.active}
                </p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {stats.premium}
                </p>
                <p className="text-sm text-gray-600">Premium+</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalRevenue)}
                </p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.avgOrderValue)}
                </p>
                <p className="text-sm text-gray-600">Avg Order Value</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tier
                </label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {tiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier === "All" ? "All" : tier}
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
                      {status === "All" ? "All" : status}
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

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customers ({sortedCustomers.length})</CardTitle>
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
                        Customer ID
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("name")}
                      >
                        Customer
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("company")}
                      >
                        Company
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("tier")}
                      >
                        Tier
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
                        onClick={() => handleSort("totalOrders")}
                      >
                        Orders
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("totalSpent")}
                      >
                        Total Spent
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort("lastOrderDate")}
                      >
                        Last Order
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4">Rating</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <p className="font-medium text-blue-600">
                          {customer.id}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-600">
                            {customer.email}
                          </p>
                          <p className="text-sm text-gray-600">
                            {customer.phone}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{customer.company}</p>
                          <p className="text-sm text-gray-600">
                            {customer.role}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getTierColor(customer.tier)}>
                          {customer.tier}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{customer.totalOrders}</p>
                          <p className="text-sm text-gray-600">
                            Avg: {formatCurrency(customer.averageOrderValue)}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">
                          {formatCurrency(customer.totalSpent)}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">
                          {formatDate(customer.lastOrderDate)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Joined: {formatDate(customer.joinDate)}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">
                            {customer.rating}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-1">
                          <Link href={`/admin/customers/${customer.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {sortedCustomers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No customers found matching your criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
