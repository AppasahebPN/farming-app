import { Sprout, Phone, Mail, MapPin, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-primary-foreground/10 rounded-xl">
                <Sprout className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg">CropSmart Advisory</h1>
                <p className="text-sm text-primary-foreground/80">Karnataka's Smart Farming Solution</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4 max-w-md">
              Empowering small and marginal farmers in Karnataka with AI-driven crop guidance, 
              weather insights, and market intelligence for better yields and sustainable farming.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span>Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <span>+91 80-2345-6789</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <span>support@cropsmart.gov.in</span>
              </div>
              <div className="text-sm text-primary-foreground/80">
                <p>Karnataka Department of Agriculture</p>
                <p>Bangalore, Karnataka 560001</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/market" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Market Prices
              </Link>
              <Link to="/crops" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Crop Advisory
              </Link>
              <Link to="/weather" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Weather Forecast
              </Link>
              <a href="#" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Help & Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-primary-foreground/80">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Privacy Policy</span>
            </div>
            <span>|</span>
            <span>Terms of Service</span>
            <span>|</span>
            <span>© 2024 Karnataka Agriculture Department</span>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-primary-foreground/60">
              Made with ❤️ for Karnataka Farmers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;