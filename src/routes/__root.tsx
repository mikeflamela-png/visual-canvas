import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="min-h-screen grid place-items-center bg-paper text-ink px-6">
      <div className="text-center max-w-md">
        <div className="font-display text-7xl mb-4">404</div>
        <p className="text-muted-foreground text-sm">This page hasn't been produced yet.</p>
        <a href="/" className="mt-8 inline-block text-sm underline underline-offset-4">Return home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="min-h-screen grid place-items-center bg-paper text-ink px-6">
      <div className="text-center max-w-md">
        <div className="font-display text-4xl mb-4">Something didn't load.</div>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-ink text-paper px-6 py-2.5 text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Preview / Reality — Design your campaign before you produce it" },
      { name: "description", content: "A commercial production studio that lets brands visualize their next campaign — real locations, real talent, producible concepts — before committing to production." },
      { property: "og:title", content: "Preview / Reality — Design your campaign before you produce it" },
      { property: "og:description", content: "A commercial production studio that lets brands visualize their next campaign — real locations, real talent, producible concepts — before committing to production." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Preview / Reality — Design your campaign before you produce it" },
      { name: "twitter:description", content: "A commercial production studio that lets brands visualize their next campaign — real locations, real talent, producible concepts — before committing to production." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/31170a43-d468-498c-b794-2054a2ae4cee/id-preview-dca0bab8--7dacacda-299a-4527-a02a-b2aef7b206bd.lovable.app-1784147086064.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/31170a43-d468-498c-b794-2054a2ae4cee/id-preview-dca0bab8--7dacacda-299a-4527-a02a-b2aef7b206bd.lovable.app-1784147086064.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
