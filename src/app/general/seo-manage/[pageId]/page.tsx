"use client";

import { useParams, useRouter } from "next/navigation";
import { usePage } from "@/features/seo-manage/page";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useChangeStatusSeo, useSeos, SeoAddDialog, SeoEditDialog, SeoDeleteDialog, SeoCoverDialog } from "@/features/seo-manage/seo";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { CheckCircle, MoreVertical, XCircle } from "lucide-react";
import { toast } from "sonner";
import { SkeletonDetailCard } from "@/components/shared/skeleton-card-detail";
import { EmptyState } from "@/components/shared/empty-state";
import { IconCircleArrowLeft, IconWorldSearch } from "@tabler/icons-react";
import { useSetBreadcrumbLabel } from "@/providers";
import { cn } from "@/shared/lib/cn";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function SeoManageDetailPage() {
  const params = useParams();
  const pageId = params.pageId as string;

  const { data } = usePage(pageId);
  const { data: seos, isLoading } = useSeos(pageId);
  const { mutateAsync } = useChangeStatusSeo();
  const router = useRouter();

  useSetBreadcrumbLabel(`/general/seo-manage/${pageId}`, data?.page_title);

  const handleChangeStatus = async (pageId: string, seoId: string) => {
    toast.promise(mutateAsync({ pageId, seoId }), {
      loading: "Mengubah status SEO...",
      success: "Mengubah Status SEO berhasil",
      error: "Gagal Mengubah status SEO",
    });
  };

  if (isLoading) {
    return <SkeletonDetailCard />;
  }

  if (!data) {
    return <EmptyState title="No Seo" description="No SEO added yet" icon={<IconWorldSearch />} />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="p-4 lg:px-6 flex flex-col gap-4">
        <div className=" flex items-start gap-3">
          <Button variant="outline" size="icon-sm" onClick={() => router.push(`/general/seo-manage`)}>
            <IconCircleArrowLeft className="size-5" />
          </Button>
          <div className="flex flex-col items-start gap-1">
            <h6 className="text-lg font-medium">{data.page_title}</h6>
            <p className="text-xs text-muted-foreground">{data.page_slug}</p>
          </div>
        </div>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
            <CardDescription>
              Dibawah merupakan daftar SEO yang pernah ditambahkan pada halaman <strong>{data.page_title}</strong>
            </CardDescription>
            <CardAction>
              <SeoAddDialog />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            {seos?.length === 0 ? (
              <EmptyState title="No SEO" description="No SEO added yet" icon={<IconWorldSearch />} />
            ) : (
              seos?.map((seo) => (
                <Item key={seo.seo_id} className={cn("py-2 transition-all hover:bg-muted/40", seo.is_active && "border-green-500 bg-green-50")} variant="outline">
                  <ItemContent className="flex flex-row gap-2 items-center">
                    <ItemMedia variant="icon">{seo.is_active ? <CheckCircle className="text-green-600" /> : <XCircle className="text-red-500" />}</ItemMedia>
                    <div className="w-full max-w-3xs">
                      <AspectRatio ratio={4 / 2}>
                        <Image src={seo.seo_reference_image} alt={seo.meta_title} fill className="object-contain" />
                      </AspectRatio>
                    </div>
                    <div>
                      <ItemTitle className="text-sm leading-tight">
                        {seo.meta_title} - {seo.seo_type}
                      </ItemTitle>
                      <ItemDescription className="text-xs text-muted-foreground leading-tight">{seo.meta_description}</ItemDescription>
                      <div className="flex gap-2 mt-2">
                        {seo.seo_keyword.map((keyword) => (
                          <Badge variant="outline" key={keyword}>
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </ItemContent>
                  <ItemActions>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon-sm" variant="outline">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <div
                          className="w-full relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent"
                          onClick={() => handleChangeStatus(data.page_id, seo.seo_id)}
                        >
                          {seo.is_active ? <XCircle className="size-4 shrink-0" /> : <CheckCircle className="size-4 shrink-0" />}
                          <span>{seo.is_active ? "Non Aktifkan" : "Aktifkan"}</span>
                        </div>
                        <SeoEditDialog seo={seo} />
                        <SeoCoverDialog seo={seo} />
                        {/* <div className="px-2 py-1.5"> */}
                        <SeoDeleteDialog pageId={pageId} seoId={seo.seo_id} />
                        {/* </div> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ItemActions>
                </Item>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
