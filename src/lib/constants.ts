import type { ImagePlaceholder } from './placeholder-images';

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { 
    name: 'Services', 
    dropdown: [
      { name: 'IT Outsourcing', href: '/services/it-outsourcing' },
      { name: 'Software Development', href: '/services/software-development' },
      { name: 'Venture Capital', href: '/services/venture-capital' },
      { name: 'Secondaries', href: '/services/secondaries' },
    ]
  },
  { name: 'Careers', href: '/careers' },
];

export const SERVICES = [
  {
    slug: 'it-outsourcing',
    title: 'IT Outsourcing',
    description: 'Leverage our global talent pool to build and scale your engineering teams. We provide dedicated developers, QA engineers, and project managers to augment your existing team or build a new one from scratch.',
    image: 'service-it-outsourcing',
    features: [
      { title: 'Access to Top Talent', description: 'Hire from a pool of pre-vetted, highly skilled professionals across various technology stacks.' },
      { title: 'Cost-Effective Solutions', description: 'Reduce recruitment and operational costs significantly compared to hiring locally.' },
      { title: 'Seamless Integration', description: 'Our teams integrate smoothly with your existing workflows, tools, and company culture.' },
      { title: 'Scalability & Flexibility', description: 'Quickly scale your team up or down based on project requirements without long-term commitments.' },
    ],
  },
  {
    slug: 'software-development',
    title: 'Software Development',
    description: 'From concept to launch, we offer end-to-end software development services. Our expertise spans web, mobile, and enterprise applications, ensuring robust, scalable, and high-performance solutions.',
    image: 'service-software-development',
    features: [
      { title: 'Custom Solutions', description: 'Tailor-made software that aligns perfectly with your business objectives and processes.' },
      { title: 'Agile Methodology', description: 'We follow agile principles to ensure iterative development, transparency, and faster delivery.' },
      { title: 'Modern Tech Stack', description: 'Utilizing the latest technologies like Next.js, TypeScript, and cloud-native architectures.' },
      { title: 'Quality Assurance', description: 'Rigorous testing at every stage of the development lifecycle to deliver a bug-free product.' },
    ],
  },
  {
    slug: 'venture-capital',
    title: 'Venture Capital',
    description: 'We invest in early-stage technology companies with high growth potential. Beyond capital, we provide strategic guidance, mentorship, and access to our extensive network to help our portfolio companies succeed.',
    image: 'service-venture-capital',
    features: [
      { title: 'Strategic Investment', description: 'We are long-term partners, not just investors. We provide hands-on support to navigate challenges.' },
      { title: 'Network Access', description: 'Leverage our network of industry experts, potential customers, and follow-on investors.' },
      { title: 'Operational Expertise', description: 'Gain insights from our experience in building and scaling technology businesses.' },
      { title: 'Founder-Friendly Terms', description: 'We believe in fair and transparent terms that align incentives for long-term success.' },
    ],
  },
  {
    slug: 'secondaries',
    title: 'Secondaries',
    description: 'We provide liquidity solutions for stakeholders in private companies. Our secondaries practice allows founders, employees, and early investors to realize value from their equity before a traditional exit.',
    image: 'service-secondaries',
    advantages: {
      lps: {
        title: 'For LPs',
        points: [
          'Portfolio rebalancing and management.',
          'Early liquidity for fund distributions.',
          'Opportunity to exit non-strategic assets.',
        ],
      },
      founders: {
        title: 'For Founders',
        points: [
          'Personal liquidity without selling control.',
          'Clean up cap table and consolidate investors.',
          'Offer liquidity to early employees and angel investors.',
        ],
      },
      gps: {
        title: 'For GPs',
        points: [
          'Generate liquidity for investors in older funds.',
          'Restructure funds and create continuation vehicles.',
          'Provide a liquidity option for LPs seeking an early exit.',
        ],
      },
    },
  },
];

export const CLIENT_LOGOS: { name: string; image: ImagePlaceholder['id'] }[] = [
    { name: 'Innovate Corp', image: 'client-innovate-corp' },
    { name: 'QuantumLeap', image: 'client-quantum-leap' },
    { name: 'Synergy Tech', image: 'client-synergy-tech' },
    { name: 'Apex Solutions', image: 'client-apex-solutions' },
    { name: 'FutureWorks', image: 'client-future-works' },
    { name: 'Nexus Group', image: 'client-nexus-group' },
];

export const JOB_OPENINGS = [
  {
    title: 'Senior Frontend Engineer (Next.js)',
    location: 'Remote',
    description: 'We are looking for an experienced Frontend Engineer to lead the development of our client-facing applications using Next.js and TypeScript.'
  },
  {
    title: 'Investment Analyst',
    location: 'New York, NY',
    description: 'Join our venture capital team to identify, analyze, and support the next generation of technology startups.'
  },
  {
    title: 'Full-Stack Developer (Python/React)',
    location: 'Remote',
    description: 'Build and maintain our internal software solutions. Proficiency in Python (Django/Flask) and React is required.'
  }
];
