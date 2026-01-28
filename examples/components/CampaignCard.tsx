// examples/components/CampaignCard.tsx
// Example campaign card component for the creator discovery page

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DollarSign, Eye, Users, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Campaign {
  id: string;
  title: string;
  short_description: string;
  content_type: string;
  target_platforms: string[];
  rate_per_1k_views_cents: number;
  total_views: number;
  active_creators: number;
  brand: {
    company_name: string;
    company_logo_url: string;
  };
}

interface CampaignCardProps {
  campaign: Campaign;
  onJoin?: (campaignId: string) => void;
}

const platformColors: Record<string, string> = {
  tiktok: "bg-black text-white",
  youtube: "bg-red-600 text-white",
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  twitter: "bg-sky-500 text-white",
};

const contentTypeLabels: Record<string, string> = {
  testimonial: "Testimonial",
  demo: "Demo",
  slideshow: "Slideshow",
  talking_head: "Talking Head",
  text_over_video: "Text Over Video",
  hook_demo: "Hook + Demo",
  screen_recording: "Screen Recording",
  voiceover: "Voiceover",
  faceless: "Faceless",
  custom: "Custom",
};

export function CampaignCard({ campaign, onJoin }: CampaignCardProps) {
  const ratePerKViews = (campaign.rate_per_1k_views_cents / 100).toFixed(2);
  
  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-600 transition-all duration-200 group">
      <CardContent className="pt-6">
        {/* Brand Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
            {campaign.brand.company_logo_url ? (
              <Image
                src={campaign.brand.company_logo_url}
                alt={campaign.brand.company_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-lg font-bold">
                {campaign.brand.company_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-400 truncate">
              {campaign.brand.company_name}
            </p>
            <h3 className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
              {campaign.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
          {campaign.short_description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span className="text-white font-medium">${ratePerKViews}</span>
            <span className="text-zinc-500">/1K</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Eye className="h-4 w-4 text-blue-400" />
            <span className="text-zinc-300">{formatNumber(campaign.total_views)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-purple-400" />
            <span className="text-zinc-300">{campaign.active_creators}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {/* Content Type */}
          <Badge variant="outline" className="border-zinc-700 text-zinc-300">
            <Video className="h-3 w-3 mr-1" />
            {contentTypeLabels[campaign.content_type] || campaign.content_type}
          </Badge>
          
          {/* Platforms */}
          {campaign.target_platforms.slice(0, 3).map((platform) => (
            <Badge
              key={platform}
              className={platformColors[platform] || "bg-zinc-700 text-white"}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </Badge>
          ))}
          {campaign.target_platforms.length > 3 && (
            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
              +{campaign.target_platforms.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Button
          variant="outline"
          className="flex-1 border-zinc-700 hover:bg-zinc-800"
          asChild
        >
          <Link href={`/campaigns/${campaign.id}`}>View Details</Link>
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          onClick={() => onJoin?.(campaign.id)}
        >
          Join Campaign
        </Button>
      </CardFooter>
    </Card>
  );
}

// Example usage:
// 
// const campaigns = await fetchCampaigns();
// 
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {campaigns.map((campaign) => (
//     <CampaignCard
//       key={campaign.id}
//       campaign={campaign}
//       onJoin={handleJoinCampaign}
//     />
//   ))}
// </div>
