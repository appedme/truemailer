"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TrueMailer
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-slate-300 hover:text-white transition-colors">
              Documentation
            </a>
            <a href="#support" className="text-slate-300 hover:text-white transition-colors">
              Support
            </a>
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LoginLink>
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Sign In
              </Button>
            </LoginLink>
            <RegisterLink>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </RegisterLink>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#docs" className="text-slate-300 hover:text-white transition-colors">
                Documentation
              </a>
              <a href="#support" className="text-slate-300 hover:text-white transition-colors">
                Support
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <LoginLink>
                  <Button variant="ghost" className="text-slate-300 hover:text-white w-full">
                    Sign In
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full">
                    Get Started
                  </Button>
                </RegisterLink>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}