import MUFAGalleryPage from "@/components/MUFA/Gallery/MUFAGalleryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gallery | Madura United Football Academy",
    description: "Galeri aktivitas dan momen terbaik Madura United Football Academy.",
};

export default function Page() {
    return <MUFAGalleryPage />;
}
