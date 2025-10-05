"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Image as ImageIcon,
  Calendar,
  Grid,
  List,
  ArrowUpDown,
  RefreshCw,
  Upload,
  Star,
  Globe,
  Lock,
} from "lucide-react";

// Mock gallery items data
const mockGalleryItems = [
  {
    id: "GAL-001",
    title: "Precision Aerospace Component",
    description:
      "High-precision aluminum component for aerospace application with tight tolerances",
    imageUrl: "/api/placeholder/400/300",
    category: "3D Printing",
    material: "Aluminum 7075",
    serviceType: "CNC Machining",
    isPublic: true,
    isFeatured: true,
    views: 1250,
    likes: 89,
    createdAt: "2024-02-10T14:30:00Z",
    updatedAt: "2024-02-15T10:20:00Z",
    tags: ["aerospace", "precision", "aluminum"],
    dimensions: "150x75x25mm",
    complexity: "high",
    projectDuration: "5 days",
    client: "Aerospace Corp",
    status: "published",
  },
  {
    id: "GAL-002",
    title: "Custom Electronic Housing",
    description:
      "Waterproof housing for electronic components with custom mounting points",
    imageUrl: "/api/placeholder/400/300",
    category: "CNC Machining",
    material: "PETG",
    serviceType: "3D Printing",
    isPublic: true,
    isFeatured: false,
    views: 890,
    likes: 67,
    createdAt: "2024-02-08T11:15:00Z",
    updatedAt: "2024-02-12T16:45:00Z",
    tags: ["electronics", "waterproof", "custom"],
    dimensions: "100x60x30mm",
    complexity: "medium",
    projectDuration: "3 days",
    client: "Tech Innovations",
    status: "published",
  },
  {
    id: "GAL-003",
    title: "Architectural Scale Model",
    description:
      "Detailed architectural model for presentation with intricate details",
    imageUrl: "/api/placeholder/400/300",
    category: "Injection Molding",
    material: "Resin",
    serviceType: "3D Printing",
    isPublic: false,
    isFeatured: false,
    views: 456,
    likes: 34,
    createdAt: "2024-02-05T09:20:00Z",
    updatedAt: "2024-02-10T14:30:00Z",
    tags: ["architecture", "model", "detailed"],
    dimensions: "300x200x150mm",
    complexity: "high",
    projectDuration: "7 days",
    client: "Design Studio",
    status: "draft",
  },
  {
    id: "GAL-004",
    title: "Functional Prototype",
    description: "Working prototype with moving parts for product testing",
    imageUrl: "/api/placeholder/400/300",
    category: "Laser Cutting",
    material: "PLA",
    serviceType: "3D Printing",
    isPublic: true,
    isFeatured: true,
    views: 1100,
    likes: 78,
    createdAt: "2024-02-03T16:45:00Z",
    updatedAt: "2024-02-08T11:20:00Z",
    tags: ["prototype", "functional", "testing"],
    dimensions: "120x80x40mm",
    complexity: "medium",
    projectDuration: "4 days",
    client: "Innovation Labs",
    status: "published",
  },
  {
    id: "GAL-005",
    title: "Medical Device Component",
    description: "Biocompatible component for medical device application",
    imageUrl: "/api/placeholder/400/300",
    category: "3D Printing",
    material: "Medical Grade Resin",
    serviceType: "3D Printing",
    isPublic: false,
    isFeatured: false,
    views: 234,
    likes: 12,
    createdAt: "2024-01-30T13:10:00Z",
    updatedAt: "2024-02-05T09:15:00Z",
    tags: ["medical", "biocompatible", "device"],
    dimensions: "50x30x15mm",
    complexity: "high",
    projectDuration: "6 days",
    client: "MedTech Solutions",
    status: "review",
  },
  {
    id: "GAL-006",
    title: "Automotive Bracket",
    description: "High-strength bracket for automotive application",
    imageUrl: "/api/placeholder/400/300",
    category: "CNC Machining",
    material: "Steel",
    serviceType: "CNC Machining",
    isPublic: true,
    isFeatured: false,
    views: 678,
    likes: 45,
    createdAt: "2024-01-28T10:30:00Z",
    updatedAt: "2024-02-02T15:20:00Z",
    tags: ["automotive", "bracket", "steel"],
    dimensions: "200x100x50mm",
    complexity: "medium",
    projectDuration: "3 days",
    client: "Auto Parts Inc",
    status: "published",
  },
];

const categories = [
  "All",
  "3D Printing",
  "CNC Machining",
  "Injection Molding",
  "Laser Cutting",
];
const statuses = ["All", "draft", "review", "published", "archived"];
const complexities = ["All", "low", "medium", "high"];

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState(mockGalleryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedComplexity, setSelectedComplexity] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "published":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
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

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      item.client.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;
    const matchesComplexity =
      selectedComplexity === "All" || item.complexity === selectedComplexity;

    return (
      matchesSearch && matchesCategory && matchesStatus && matchesComplexity
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
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

  const togglePublic = (itemId: string) => {
    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isPublic: !item.isPublic } : item,
      ),
    );
  };

  const toggleFeatured = (itemId: string) => {
    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isFeatured: !item.isFeatured } : item,
      ),
    );
  };

  const getGalleryStats = () => {
    const total = filteredItems.length;
    const published = filteredItems.filter(
      (i) => i.status === "published",
    ).length;
    const featured = filteredItems.filter((i) => i.isFeatured).length;
    const totalViews = filteredItems.reduce((sum, i) => sum + i.views, 0);
    const totalLikes = filteredItems.reduce((sum, i) => sum + i.likes, 0);

    return { total, published, featured, totalViews, totalLikes };
  };

  const stats = getGalleryStats();

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
                Gallery Management
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
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
                Add Item
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gallery Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage portfolio items and showcase projects
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
                <p className="text-sm text-gray-600">Total Items</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.published}
                </p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.featured}
                </p>
                <p className="text-sm text-gray-600">Featured</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalViews.toLocaleString("en-US")}
                </p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {stats.totalLikes}
                </p>
                <p className="text-sm text-gray-600">Total Likes</p>
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
                    placeholder="Search gallery..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complexity
                </label>
                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {complexities.map((complexity) => (
                    <option key={complexity} value={complexity}>
                      {complexity === "All" ? "All" : complexity}
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

        {/* Gallery Items */}
        <Card>
          <CardHeader>
            <CardTitle>Gallery Items ({sortedItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        {item.isFeatured && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge
                          className={
                            item.isPublic
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {item.isPublic ? (
                            <Globe className="h-3 w-3" />
                          ) : (
                            <Lock className="h-3 w-3" />
                          )}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <div>Category: {item.category}</div>
                        <div>Material: {item.material}</div>
                        <div>Views: {item.views}</div>
                        <div>Likes: {item.likes}</div>
                      </div>

                      <div className="flex justify-between items-center">
                        <Badge className={getComplexityColor(item.complexity)}>
                          {item.complexity}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSort("title")}
                        >
                          Title
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        </Button>
                      </th>
                      <th className="text-left py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSort("category")}
                        >
                          Category
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
                          onClick={() => handleSort("complexity")}
                        >
                          Complexity
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        </Button>
                      </th>
                      <th className="text-left py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSort("views")}
                        >
                          Engagement
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
                      <th className="text-left py-3 px-4">Visibility</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              width={60}
                              height={45}
                              className="rounded object-cover"
                            />
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-gray-600">
                                {item.client}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{item.category}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={getComplexityColor(item.complexity)}
                          >
                            {item.complexity}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div>{item.views} views</div>
                            <div>{item.likes} likes</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm">
                            {formatDate(item.createdAt)}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col space-y-1">
                            <Badge
                              className={
                                item.isPublic
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {item.isPublic ? "Public" : "Private"}
                            </Badge>
                            {item.isFeatured && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
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
            )}

            {sortedItems.length === 0 && (
              <div className="text-center py-8">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No gallery items found matching your criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}