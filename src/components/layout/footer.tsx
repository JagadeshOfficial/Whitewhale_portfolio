import Link from 'next/link';
import { Icons } from '@/components/icons';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">WhiteWhale</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Engineering Digital Excellence
            </p>
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Whitewhale Software Solutions. All rights reserved.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/software-development" className="text-sm text-muted-foreground hover:text-primary">Software Development</Link></li>
              <li><Link href="/services/it-outsourcing" className="text-sm text-muted-foreground hover:text-primary">IT Outsourcing</Link></li>
              <li><Link href="/services/cloud-devops-microservices" className="text-sm text-muted-foreground hover:text-primary">Cloud & DevOps</Link></li>
              <li><Link href="/services/ai-data-analytics-automation" className="text-sm text-muted-foreground hover:text-primary">AI & Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="/clients" className="text-sm text-muted-foreground hover:text-primary">Clients</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:business@whitewhalesoft.in" className="text-sm text-muted-foreground hover:text-primary">Business: business@whitewhalesoft.in</a></li>
              <li><a href="mailto:contact@whitewhalesoft.in" className="text-sm text-muted-foreground hover:text-primary">Careers: contact@whitewhalesoft.in</a></li>
              <li><p className="text-sm text-muted-foreground">India: Hyderabad, Telangana</p></li>
              <li><p className="text-sm text-muted-foreground">USA: Springfield, Missouri</p></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
