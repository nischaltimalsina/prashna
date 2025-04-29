import Link from "next/link";
import {
  BadgeCheck,
  ThumbsUp,
  MessageSquare,
  FileText,
  ArrowLeft,
  Share2,
  Flag,
  MapPin,
  Award,
  Link as LinkIcon,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RepresentativeProfile from "@/components/screens/representative/profile";

// Next.js page props type
type Props = {
  params: { id: string }
};

// Generate static paths for the representatives
export async function generateStaticParams() {
  // For a real app, these would come from an API or database
  // Here we're using the mock data to generate the paths
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}

export default function RepresentativeProfilePage({ params }: Props) {

  return (
    <RepresentativeProfile id={params.id}/>
  );
}
