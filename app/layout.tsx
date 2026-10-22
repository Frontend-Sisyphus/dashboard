import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gramatika = localFont({
  src: [
    {
      path: "./fonts/Gramatika-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Gramatika-Slanted.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Gramatika-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Gramatika-BoldSlanted.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-gramatika",
  display: "swap",
});

const gramatikaShifted = localFont({
  src: [
    {
      path: "./fonts/Gramatika-Shifted.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Gramatika-BoldShifted.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gramatika-shifted",
  display: "swap",
});

const ptRoot = localFont({
  src: [
    {
      path: "./fonts/pt-root/PTRootUI-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/pt-root/PTRootUI-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/pt-root/PTRootUI-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/pt-root/PTRootUI-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pt-root",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bifröst · Heimdall · ИТС",
  description:
    "Bifröst — информационный стенд для студентов; Heimdall — экран наблюдения и сводок ИТС",
  icons: {
    icon: "/brand/heimdall-logo.jpg",
    apple: "/brand/heimdall-logo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f7" },
    { media: "(prefers-color-scheme: dark)", color: "#090a0b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${ptRoot.variable} ${gramatika.variable} ${gramatikaShifted.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('itc-theme');
                  if (saved === 'light' || saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', saved);
                  } else {
                    var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${ptRoot.className} min-h-full font-sans`}>{children}</body>
    </html>
  );
}
