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
              WhiteWhale Software Solutions
            </p>
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/it-outsourcing" className="text-sm text-muted-foreground hover:text-primary">IT Outsourcing</Link></li>
              <li><Link href="/services/software-development" className="text-sm text-muted-foreground hover:text-primary">Software Development</Link></li>
              <li><Link href="/services/venture-capital" className="text-sm text-muted-foreground hover:text-primary">Venture Capital</Link></li>
              <li><Link href="/services/secondaries" className="text-sm text-muted-foreground hover:text-primary">Secondaries</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="/resume-builder" className="text-sm text-muted-foreground hover:text-primary">Resume Builder</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
