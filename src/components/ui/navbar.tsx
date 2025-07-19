"use client";

import { Shield, CheckCircle, Mail, Zap, BarChart3, Settings, Menu } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: JSX.Element;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
}

const TrueMailerNavbar = ({
  logo = {
    url: "/",
    title: "TrueMailer",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Features",
      url: "#features",
      items: [
        {
          title: "Email Validation",
          description: "Comprehensive email syntax and format validation",
          icon: <CheckCircle className="size-5 shrink-0" />,
          url: "#features",
        },
        {
          title: "Temp Email Detection",
          description: "Block temporary and disposable email addresses",
          icon: <Shield className="size-5 shrink-0" />,
          url: "#features",
        },
        {
          title: "Mailbox Verification",
          description: "Verify if email addresses can receive emails",
          icon: <Mail className="size-5 shrink-0" />,
          url: "#features",
        },
        {
          title: "Analytics Dashboard",
          description: "Track usage and monitor validation results",
          icon: <BarChart3 className="size-5 shrink-0" />,
          url: "#features",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "API Documentation",
          description: "Complete guide to our validation API",
          icon: <Settings className="size-5 shrink-0" />,
          url: "/docs",
        },
        {
          title: "Status Page",
          description: "Check the current status of our services",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/status",
        },
        {
          title: "Support Center",
          description: "Get help and find answers to common questions",
          icon: <Mail className="size-5 shrink-0" />,
          url: "/support",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#pricing",
    },
  ],
  mobileExtraLinks = [
    { name: "Documentation", url: "/docs" },
    { name: "Support", url: "/support" },
    { name: "Status", url: "/status" },
  ],
}: NavbarProps) => {
  return (
    <section className="py-4 bg-background/95 backdrop-blur-sm border-b border-border fixed top-0 left-0 right-0 z-50">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <LoginLink>
              <Button variant="ghost">
                Sign In
              </Button>
            </LoginLink>
            <RegisterLink>
              <Button>
                Get Started
              </Button>
            </RegisterLink>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {logo.title}
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-slate-900 border-slate-800">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {logo.title}
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="border-t border-slate-800 py-4">
                    <div className="grid grid-cols-1 justify-start gap-2">
                      {mobileExtraLinks.map((link, idx) => (
                        <a
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                          href={link.url}
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <LoginLink>
                      <Button variant="outline" className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
                        Sign In
                      </Button>
                    </LoginLink>
                    <RegisterLink>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Get Started
                      </Button>
                    </RegisterLink>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-slate-300">
        <NavigationMenuTrigger className="bg-transparent text-slate-300 hover:text-white hover:bg-slate-800">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3 bg-slate-800 border-slate-700">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <a
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 text-slate-300 hover:text-white"
                    href={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-slate-400">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <a
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
      href={item.url}
    >
      {item.title}
    </a>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-slate-800">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline text-white">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-slate-800 text-slate-300 hover:text-white"
              href={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold text-white">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-slate-400">
                    {subItem.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="font-semibold text-white hover:text-blue-400 transition-colors">
      {item.title}
    </a>
  );
};

export { TrueMailerNavbar };