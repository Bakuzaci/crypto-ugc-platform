// examples/campaign-builder/CampaignWizard.tsx
// Multi-step campaign creation wizard

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Video, 
  MessageSquare, 
  Layout,
  Mic,
  Monitor,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// Step definitions
const STEPS = [
  { id: 1, title: "Basic Info", description: "Campaign name and description" },
  { id: 2, title: "Content Type", description: "Choose content format" },
  { id: 3, title: "Platforms", description: "Select target platforms" },
  { id: 4, title: "Budget", description: "Set rates and budget" },
  { id: 5, title: "Review", description: "Review and publish" },
];

// Content types
const CONTENT_TYPES = [
  { id: "testimonial", label: "Testimonial", icon: MessageSquare, description: "Creator talks about your product" },
  { id: "demo", label: "Hook + Demo", icon: Video, description: "Problem → Solution format" },
  { id: "slideshow", label: "Slideshow", icon: Layout, description: "Image carousel with text" },
  { id: "talking_head", label: "Talking Head", icon: Video, description: "Direct to camera review" },
  { id: "voiceover", label: "Voiceover", icon: Mic, description: "Voice + B-roll footage" },
  { id: "screen_recording", label: "Screen Recording", icon: Monitor, description: "App/product walkthrough" },
];

// Platforms
const PLATFORMS = [
  { id: "tiktok", label: "TikTok", color: "bg-black" },
  { id: "youtube", label: "YouTube Shorts", color: "bg-red-600" },
  { id: "instagram", label: "Instagram Reels", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "twitter", label: "Twitter/X", color: "bg-sky-500" },
];

interface CampaignData {
  title: string;
  description: string;
  shortDescription: string;
  contentType: string;
  platforms: string[];
  ratePerKViews: number;
  totalBudget: number;
  dailyBudget: number | null;
}

export function CampaignWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    title: "",
    description: "",
    shortDescription: "",
    contentType: "",
    platforms: [],
    ratePerKViews: 1.5,
    totalBudget: 1000,
    dailyBudget: null,
  });

  const updateData = (updates: Partial<CampaignData>) => {
    setCampaignData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return campaignData.title.length > 0 && campaignData.shortDescription.length > 0;
      case 2:
        return campaignData.contentType.length > 0;
      case 3:
        return campaignData.platforms.length > 0;
      case 4:
        return campaignData.ratePerKViews > 0 && campaignData.totalBudget > 0;
      default:
        return true;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    currentStep > step.id
                      ? "bg-emerald-500 text-white"
                      : currentStep === step.id
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-800 text-zinc-400"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="text-xs text-zinc-400 mt-2 hidden md:block">
                  {step.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-full h-1 mx-2",
                    currentStep > step.id ? "bg-emerald-500" : "bg-zinc-800"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-xl text-white">
            {STEPS[currentStep - 1].title}
          </CardTitle>
          <p className="text-zinc-400">{STEPS[currentStep - 1].description}</p>
        </CardHeader>
        <CardContent>
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Promote Our DeFi Protocol"
                  value={campaignData.title}
                  onChange={(e) => updateData({ title: e.target.value })}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  placeholder="Brief tagline for campaign cards"
                  value={campaignData.shortDescription}
                  onChange={(e) => updateData({ shortDescription: e.target.value })}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed campaign description..."
                  value={campaignData.description}
                  onChange={(e) => updateData({ description: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 min-h-32"
                />
              </div>
            </div>
          )}

          {/* Step 2: Content Type */}
          {currentStep === 2 && (
            <RadioGroup
              value={campaignData.contentType}
              onValueChange={(value) => updateData({ contentType: value })}
              className="grid grid-cols-2 gap-4"
            >
              {CONTENT_TYPES.map((type) => (
                <Label
                  key={type.id}
                  htmlFor={type.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all",
                    campaignData.contentType === type.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50"
                  )}
                >
                  <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <type.icon className="h-4 w-4 text-zinc-400" />
                      <span className="font-medium text-white">{type.label}</span>
                    </div>
                    <p className="text-sm text-zinc-400">{type.description}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          )}

          {/* Step 3: Platforms */}
          {currentStep === 3 && (
            <div className="grid grid-cols-2 gap-4">
              {PLATFORMS.map((platform) => (
                <Label
                  key={platform.id}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                    campaignData.platforms.includes(platform.id)
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50"
                  )}
                >
                  <Checkbox
                    checked={campaignData.platforms.includes(platform.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateData({ platforms: [...campaignData.platforms, platform.id] });
                      } else {
                        updateData({
                          platforms: campaignData.platforms.filter((p) => p !== platform.id),
                        });
                      }
                    }}
                  />
                  <div className={cn("w-6 h-6 rounded", platform.color)} />
                  <span className="font-medium text-white">{platform.label}</span>
                </Label>
              ))}
            </div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ratePerKViews">Rate per 1,000 views</Label>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">$</span>
                  <Input
                    id="ratePerKViews"
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={campaignData.ratePerKViews}
                    onChange={(e) => updateData({ ratePerKViews: parseFloat(e.target.value) || 0 })}
                    className="bg-zinc-800 border-zinc-700 w-32"
                  />
                </div>
                <p className="text-sm text-zinc-500">
                  Creators earn ${((campaignData.ratePerKViews || 0) * 0.75).toFixed(2)} per 1K views (75%)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalBudget">Total Budget</Label>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">$</span>
                  <Input
                    id="totalBudget"
                    type="number"
                    min="100"
                    step="100"
                    value={campaignData.totalBudget}
                    onChange={(e) => updateData({ totalBudget: parseInt(e.target.value) || 0 })}
                    className="bg-zinc-800 border-zinc-700 w-40"
                  />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium text-white">Estimated Reach</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {((campaignData.totalBudget / campaignData.ratePerKViews) * 1000).toLocaleString()} views
                </p>
                <p className="text-sm text-zinc-400">Based on your budget and rate</p>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-400">Campaign Title</Label>
                  <p className="text-white font-medium">{campaignData.title}</p>
                </div>
                <div>
                  <Label className="text-zinc-400">Content Type</Label>
                  <p className="text-white font-medium">
                    {CONTENT_TYPES.find((t) => t.id === campaignData.contentType)?.label}
                  </p>
                </div>
                <div>
                  <Label className="text-zinc-400">Platforms</Label>
                  <p className="text-white font-medium">
                    {campaignData.platforms
                      .map((p) => PLATFORMS.find((pl) => pl.id === p)?.label)
                      .join(", ")}
                  </p>
                </div>
                <div>
                  <Label className="text-zinc-400">Rate</Label>
                  <p className="text-white font-medium">${campaignData.ratePerKViews} per 1K views</p>
                </div>
                <div>
                  <Label className="text-zinc-400">Total Budget</Label>
                  <p className="text-white font-medium">${campaignData.totalBudget}</p>
                </div>
                <div>
                  <Label className="text-zinc-400">Estimated Reach</Label>
                  <p className="text-white font-medium">
                    {((campaignData.totalBudget / campaignData.ratePerKViews) * 1000).toLocaleString()} views
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-zinc-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {currentStep < STEPS.length ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Publish Campaign
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
