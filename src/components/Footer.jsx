import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="relative   overflow-hidden">
      {/* 🔮 Glowing Background Circle */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#6526B7] blur-[200px] opacity-60 rounded-full z-0 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row justify-between gap-10 sm:gap-0">
        {/* Brand & About */}
        <div>
          <h2 className="text-3xl font-bold text-[#b88cff] drop-shadow-[0_0_20px_#6526B7]">
            CodeCrack
          </h2>
          <p className="/70 mt-2 max-w-xs text-sm">
            Crack coding interviews with AI-powered prep. Smart practice, real results.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-10 text-sm">
          <div className=" space-y-2">
            <h3 className=" font-semibold mb-1">Platform</h3>
            <Link to="/practice" className="hover:text-[#b88cff] transition-all block">
              Practice
            </Link>
            <Link to="/mock-interviews" className="hover:text-[#b88cff] transition-all block">
              Mock Interviews
            </Link>
            <Link to="/resume-review" className="hover:text-[#b88cff] transition-all block">
              Resume Review
            </Link>
          </div>

          <div className="/80 space-y-2">
            <h3 className=" font-semibold mb-1">Resources</h3>
            <Link to="/blog" className="hover:text-[#b88cff] transition-all block">
              Blog
            </Link>
            <Link to="/help" className="hover:text-[#b88cff] transition-all block">
              Help Center
            </Link>
            <Link to="/contact" className="hover:text-[#b88cff] transition-all block">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Social Icons */}
        <div className="/70">
          <h3 className=" font-semibold mb-2 text-sm">Follow Us</h3>
          <div className="flex gap-4">
            <Link to="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 hover:text-[#b88cff]" />
            </Link>
            <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 hover:text-[#b88cff]" />
            </Link>
            <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 hover:text-[#b88cff]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="relative z-10 border-t border-white/10 text-center /40 text-xs py-4 px-6">
        © {new Date().getFullYear()} CodeCrack. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
