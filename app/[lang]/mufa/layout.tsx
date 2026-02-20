import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MUFA - Madura United Football Academy",
    description: "Official website of Madura United Football Academy",
    icons: {
        icon: "/logoMUFA.jpg",
    },
};

export default function MufaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
