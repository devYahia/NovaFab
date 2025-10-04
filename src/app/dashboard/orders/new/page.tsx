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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Factory,
  ArrowLeft,
  Upload,
  Calculator,
  Info,
  CheckCircle,
  Clock,
  Zap,
  FileText,
  Settings,
  Truck,
  CreditCard,
  Check,
  X,
  Plus,
  Minus,
} from "lucide-react";

// File Upload Component
interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

function FileUpload({
  onFilesChange,
  maxFiles = 5,
  acceptedTypes = [".stl", ".obj", ".3mf"],
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      const extension = "." + file.name.split(".").pop()?.toLowerCase();
      return acceptedTypes.includes(extension);
    });

    const updatedFiles = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-gray-600 mb-2">
          Drag and drop files here, or click to browse
        </p>
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={(e) => handleFiles(Array.from(e.target.files || []))}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Button type="button" variant="outline" className="mt-2">
            Choose Files
          </Button>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span className="text-sm">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface OrderForm {
  title: string;
  description: string;
  serviceType: string;
  material: string;
  quantity: number;
  urgency: string;
  notes: string;
  files: any[];
  specifications: {
    dimensions: string;
    tolerance: string;
    finish: string;
    color: string;
  };
  shipping: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const serviceTypes = [
  {
    id: "3d-printing",
    name: "3D Printing",
    description: "Additive manufacturing for prototypes and small parts",
    materials: ["PLA", "ABS", "PETG", "TPU", "Resin"],
    basePrice: 0.15,
    icon: "🖨️",
  },
  {
    id: "cnc-machining",
    name: "CNC Machining",
    description: "Precision machining for metal and plastic parts",
    materials: [
      "Aluminum 6061",
      "Steel",
      "Brass",
      "Plastic (ABS)",
      "Plastic (Delrin)",
    ],
    basePrice: 0.5,
    icon: "⚙️",
  },
  {
    id: "laser-cutting",
    name: "Laser Cutting",
    description: "Precise cutting for flat materials",
    materials: ["Acrylic", "Wood", "MDF", "Cardboard", "Fabric"],
    basePrice: 0.25,
    icon: "🔥",
  },
];

export default function NewOrderPage() {
  const [formData, setFormData] = useState<OrderForm>({
    title: "",
    description: "",
    serviceType: "",
    material: "",
    quantity: 1,
    urgency: "standard",
    notes: "",
    files: [],
    specifications: {
      dimensions: "",
      tolerance: "",
      finish: "",
      color: "",
    },
    shipping: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const selectedService = serviceTypes.find(
    (service) => service.id === formData.serviceType,
  );

  const calculateEstimate = () => {
    if (!selectedService) return 0;

    const baseCost = selectedService.basePrice * 100; // Base cost per unit
    let totalCost = baseCost * formData.quantity;

    // Urgency multiplier
    if (formData.urgency === "urgent") {
      totalCost *= 1.5;
    }

    // Minimum order
    totalCost = Math.max(totalCost, 25);

    return totalCost;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecificationChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value,
      },
    }));
  };

  const handleShippingChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [field]: value,
      },
    }));
  };

  const handleFileUpload = (files: any[]) => {
    setFormData((prev) => ({
      ...prev,
      files: files,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would submit the order to your API
    console.log("Submitting order:", formData);

    // For now, just show success and redirect
    alert("Order submitted successfully!");
    // In a real app: router.push('/dashboard/orders')
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.serviceType;
      case 2:
        return (
          formData.material &&
          formData.quantity > 0 &&
          formData.files.length > 0
        );
      case 3:
        return true; // Specifications are optional
      case 4:
        return (
          formData.shipping.address &&
          formData.shipping.city &&
          formData.shipping.state &&
          formData.shipping.zipCode
        );
      default:
        return false;
    }
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
              <span className="text-xl font-bold text-gray-900">New Order</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step <= currentStep
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step}</span>
                  )}
                </div>
                {step < 4 && (
                  <div
                    className={`w-24 h-1 mx-4 ${
                      step < currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Project Details</span>
            <span>Files & Materials</span>
            <span>Specifications</span>
            <span>Shipping & Review</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Project Details */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Tell us about your manufacturing project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Custom Bracket for Mounting System"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe your project, its purpose, and any specific requirements..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label>Service Type *</Label>
                  <RadioGroup
                    value={formData.serviceType}
                    onValueChange={(value) =>
                      handleInputChange("serviceType", value)
                    }
                    className="mt-2"
                  >
                    {serviceTypes.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <RadioGroupItem value={service.id} id={service.id} />
                        <div className="flex-1">
                          <Label
                            htmlFor={service.id}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <span className="text-2xl">{service.icon}</span>
                            <div>
                              <div className="font-medium">{service.name}</div>
                              <div className="text-sm text-gray-600">
                                {service.description}
                              </div>
                              <div className="text-sm text-blue-600">
                                Starting at ${service.basePrice}/gram
                              </div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label>Urgency</Label>
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) =>
                      handleInputChange("urgency", value)
                    }
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label
                        htmlFor="standard"
                        className="flex items-center space-x-2 cursor-pointer flex-1"
                      >
                        <Clock className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="font-medium">Standard (5-7 days)</div>
                          <div className="text-sm text-gray-600">
                            Regular processing time
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label
                        htmlFor="urgent"
                        className="flex items-center space-x-2 cursor-pointer flex-1"
                      >
                        <Zap className="h-4 w-4 text-orange-600" />
                        <div>
                          <div className="font-medium">Urgent (2-3 days)</div>
                          <div className="text-sm text-gray-600">
                            +50% rush fee
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Files & Materials */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Files & Materials</CardTitle>
                <CardDescription>
                  Upload your design files and select materials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Design Files *</Label>
                  <div className="mt-2">
                    <FileUpload
                      onFilesChange={handleFileUpload}
                      maxFiles={5}
                      acceptedTypes={[
                        "image/*",
                        ".pdf",
                        ".stl",
                        ".step",
                        ".dwg",
                        ".dxf",
                      ]}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Accepted formats: STL, STEP, DWG, DXF, PDF, Images. Max 10MB
                    per file.
                  </p>
                </div>

                {selectedService && (
                  <div>
                    <Label htmlFor="material">Material *</Label>
                    <Select
                      value={formData.material}
                      onValueChange={(value) =>
                        handleInputChange("material", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedService.materials.map((material) => (
                          <SelectItem key={material} value={material}>
                            {material}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="1000"
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange(
                        "quantity",
                        parseInt(e.target.value) || 1,
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Any special instructions, requirements, or questions..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Specifications */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
                <CardDescription>
                  Optional specifications for your project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      value={formData.specifications.dimensions}
                      onChange={(e) =>
                        handleSpecificationChange("dimensions", e.target.value)
                      }
                      placeholder="e.g., 100mm x 50mm x 25mm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tolerance">Tolerance</Label>
                    <Input
                      id="tolerance"
                      value={formData.specifications.tolerance}
                      onChange={(e) =>
                        handleSpecificationChange("tolerance", e.target.value)
                      }
                      placeholder="e.g., ±0.1mm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="finish">Surface Finish</Label>
                    <Input
                      id="finish"
                      value={formData.specifications.finish}
                      onChange={(e) =>
                        handleSpecificationChange("finish", e.target.value)
                      }
                      placeholder="e.g., Smooth, Textured, Polished"
                    />
                  </div>

                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={formData.specifications.color}
                      onChange={(e) =>
                        handleSpecificationChange("color", e.target.value)
                      }
                      placeholder="e.g., Natural, Black, White"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">
                        Specification Guidelines
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        These specifications are optional but help us provide
                        more accurate quotes and better results. If you&apos;re
                        unsure about any specifications, our team will contact
                        you to discuss the best options for your project.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Shipping & Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                  <CardDescription>
                    Where should we send your completed order?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.shipping.address}
                      onChange={(e) =>
                        handleShippingChange("address", e.target.value)
                      }
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.shipping.city}
                        onChange={(e) =>
                          handleShippingChange("city", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.shipping.state}
                        onChange={(e) =>
                          handleShippingChange("state", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.shipping.zipCode}
                        onChange={(e) =>
                          handleShippingChange("zipCode", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.shipping.country}
                        onValueChange={(value) =>
                          handleShippingChange("country", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Mexico">Mexico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5" />
                    <span>Order Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Project:</span>
                      <span className="font-medium">{formData.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span>{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Material:</span>
                      <span>{formData.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span>{formData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Urgency:</span>
                      <span className="capitalize">{formData.urgency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Files:</span>
                      <span>{formData.files.length} file(s)</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Estimated Total:</span>
                        <span>${calculateEstimate().toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Final price will be confirmed after file review
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex space-x-4">
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isStepValid(currentStep)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Submit Order
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
